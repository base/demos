import {
  allPhasesSucceeded,
  canonicalAuthenticators,
  encodeFunctionData,
  encodeWalletCalls,
  estimateGas,
  getTransactionCount,
  key,
  keccak256,
  nonceFreeCost,
  nonceKeyExistingCost,
  type Address,
  type Hex,
} from '@vibenet/aa'

import { getOrCreateAccount, resolveHighRateImplementation, resolveUsdv, saveStoredHead, type StreamAccount } from './account'
import {
  CHAIN_ID,
  erc20Abi,
  MIN_ETH_BOOTSTRAP,
  PRIORITY_FEE,
  type ChainHealth,
  type FaucetStatus,
  type LiveContracts,
} from './config'
import { FaucetQueue } from './faucet'
import {
  getChainHealth,
  getContracts,
  getFaucetStatus,
  isRecoverableBroadcastError,
  publicClient,
  readCode,
  readFreshBalances,
  readGenesisHash,
  readLatestBlock,
  readReceipt,
  readTokenBalance,
  readTransaction,
  sendRaw,
} from './rpc'

export type BootstrapStage = 'health' | 'account' | 'eth' | 'usdv' | 'deploy' | 'gas' | 'ready'

export type BootstrapProgress = {
  stage: BootstrapStage
  label: string
  detail?: string
}

export type StreamRuntime = {
  identity: StreamAccount
  token: Address
  gasLimit: bigint
  maxFeePerGas: bigint
  maxPriorityFeePerGas: bigint
  recipientBaseline: bigint
  faucet: FaucetQueue
  faucetStatus: FaucetStatus
  contracts: LiveContracts
  health: ChainHealth
  senderEthBalance: bigint
  senderTokenBalance: bigint
  recipientTokenBalance: bigint
}

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

function transferData(recipient: Address, amount: bigint): Hex {
  return encodeFunctionData({ abi: erc20Abi, functionName: 'transfer', args: [recipient, amount] })
}

function transferPhases(token: Address, recipient: Address, amount: bigint) {
  return [[{ to: token, value: 0n, data: transferData(recipient, amount) }]] as const
}

function assertReceiptSucceeded(hash: Hex, receipt: Record<string, any>) {
  const fields = receipt.eip8130 ?? receipt
  if (receipt.status === '0x0' || !allPhasesSucceeded(fields)) {
    const error = new Error(`Bootstrap transaction reverted (${hash})`)
    Object.assign(error, { hash, receipt })
    throw error
  }
}

async function submitAndWait(raw: Hex, timeoutMs = 60_000) {
  const hash = keccak256(raw)
  const started = performance.now()
  let lastBroadcastAt = 0

  while (performance.now() - started < timeoutMs) {
    const receipt = await readReceipt(hash)
    if (receipt) {
      assertReceiptSucceeded(hash, receipt)
      return { hash, receipt }
    }

    const transaction = await readTransaction(hash).catch(() => null)
    const now = performance.now()
    if (!transaction && now - lastBroadcastAt > 800) {
      lastBroadcastAt = now
      try {
        const returnedHash = await sendRaw(raw)
        if (returnedHash.toLowerCase() !== hash.toLowerCase()) {
          throw new Error(`RPC returned ${returnedHash}; expected ${hash}`)
        }
      } catch (error) {
        if (!isRecoverableBroadcastError(error)) throw error
      }
    }
    await sleep(250)
  }
  throw new Error(`Timed out waiting for bootstrap transaction ${hash}`)
}

async function waitForCode(address: Address) {
  const deadline = Date.now() + 15_000
  while (Date.now() < deadline) {
    if ((await readCode(address)) !== '0x') return
    await sleep(250)
  }
  throw new Error('The account transaction confirmed, but account bytecode did not become readable')
}

async function runBootstrap(
  onProgress: (progress: BootstrapProgress) => void,
  forceRotate: boolean,
): Promise<StreamRuntime> {
  onProgress({ stage: 'health', label: 'Checking Vibenet health…' })
  const [health, contracts, faucetStatus, genesisHash] = await Promise.all([
    getChainHealth(),
    getContracts(),
    getFaucetStatus(),
    readGenesisHash(),
  ])
  if (!health.healthy) {
    throw new Error(`Vibenet is unavailable: ${health.reason ?? health.detail ?? 'chain health check failed'}`)
  }
  if (faucetStatus.chain_id !== CHAIN_ID) throw new Error(`Unexpected faucet chain ${faucetStatus.chain_id}`)

  const implementation = await resolveHighRateImplementation(contracts)
  if (!implementation) throw new Error('Vibenet has no live high-rate EIP-8130 account implementation')
  const token = resolveUsdv(contracts, faucetStatus.usdv_address)
  if ((await readCode(token)) === '0x') throw new Error('Vibenet has no live USDV contract')

  onProgress({ stage: 'account', label: 'Creating a local account…', detail: 'No wallet or extension' })
  const identity = getOrCreateAccount({
    genesisHash,
    implementation,
    token,
    head: health.head,
    forceRotate,
  })
  const faucet = new FaucetQueue(faucetStatus, token)

  onProgress({ stage: 'eth', label: 'Funding transaction gas…', detail: '0.1 test ETH from the Vibenet faucet' })
  await faucet.ensureEth(identity.account.address, MIN_ETH_BOOTSTRAP)

  onProgress({ stage: 'usdv', label: 'Funding the stream…', detail: '1,000 Vibenet USDV' })
  await faucet.ensureUsdv(identity.account.address, 1n)

  const latestBlock = await readLatestBlock()
  const baseFee = BigInt(latestBlock.baseFeePerGas ?? 1_000_000_000n)
  const maxFeePerGas = baseFee * 2n + PRIORITY_FEE
  let sequence = await getTransactionCount(publicClient, { address: identity.account.address, nonceKey: 0n })
  const deployed = (await readCode(identity.account.address)) !== '0x'
  let recipientBaseline = await readTokenBalance(token, identity.recipient)

  if (!deployed) {
    onProgress({ stage: 'deploy', label: 'Deploying the native account…', detail: 'First transfer proves the full path' })
    const phases = transferPhases(token, identity.recipient, 1n)
    const actor = key.k1(identity.signer.address)
    const createEstimate = await estimateGas(publicClient, {
      sender: identity.account.address,
      senderActorId: actor.actorId,
      senderAuthAuthenticator: canonicalAuthenticators.k1,
      accountChanges: [identity.account.createChange],
      calls: phases,
      nonceKey: 0n,
      nonceSequence: Number(sequence),
    })
    const createGas = (createEstimate * 13n + 9n) / 10n
    const raw = await identity.account.signTransaction({
      chainId: CHAIN_ID,
      accountChanges: [identity.account.createChange],
      calls: encodeWalletCalls({ account: identity.account.address, calls: phases }),
      nonceKey: 0n,
      nonceSequence: sequence,
      maxFeePerGas,
      maxPriorityFeePerGas: PRIORITY_FEE,
      gas: createGas,
    })
    await submitAndWait(raw)
    await waitForCode(identity.account.address)
    const expectedRecipientBalance = recipientBaseline + 1n
    const deadline = Date.now() + 15_000
    while (Date.now() < deadline) {
      const balance = await readTokenBalance(token, identity.recipient).catch(() => recipientBaseline)
      if (balance >= expectedRecipientBalance) {
        recipientBaseline = balance
        break
      }
      await sleep(250)
    }
    sequence += 1n
  }

  onProgress({ stage: 'gas', label: 'Measuring the stream path…', detail: 'Calibrating gas once for this chain epoch' })
  const actor = key.k1(identity.signer.address)
  const samplePhases = transferPhases(token, identity.recipient, 16_666n)
  const sequencedEstimate = await estimateGas(publicClient, {
    sender: identity.account.address,
    senderActorId: actor.actorId,
    senderAuthAuthenticator: canonicalAuthenticators.k1,
    accountChanges: [],
    calls: samplePhases,
    nonceKey: 0n,
    nonceSequence: Number(sequence),
  })
  const nonceFreeEstimate = sequencedEstimate + nonceFreeCost - nonceKeyExistingCost
  const gasLimit = (nonceFreeEstimate * 13n + 9n) / 10n
  const balances = await readFreshBalances(token, identity.account.address, identity.recipient)
  recipientBaseline = balances.recipientToken > recipientBaseline ? balances.recipientToken : recipientBaseline
  saveStoredHead(identity.stored, balances.blockNumber)

  onProgress({ stage: 'ready', label: 'Ready to stream', detail: 'Real transfers, no wallet prompts' })
  return {
    identity,
    token,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas: PRIORITY_FEE,
    recipientBaseline,
    faucet,
    faucetStatus,
    contracts,
    health,
    senderEthBalance: balances.eth,
    senderTokenBalance: balances.senderToken,
    recipientTokenBalance: balances.recipientToken,
  }
}

export async function bootstrap(
  onProgress: (progress: BootstrapProgress) => void,
  options: { forceRotate?: boolean } = {},
): Promise<StreamRuntime> {
  if (navigator.locks?.request) {
    return navigator.locks.request('base-money-stream-bootstrap', () => runBootstrap(onProgress, Boolean(options.forceRotate)))
  }
  return runBootstrap(onProgress, Boolean(options.forceRotate))
}
