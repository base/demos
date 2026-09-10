import { performance } from 'node:perf_hooks'

import {
  allPhasesSucceeded,
  canonicalAuthenticators,
  createPublicClient,
  decodeAbiParameters,
  encodeFunctionData,
  encodeWalletCalls,
  estimateGas,
  generatePrivateKey,
  getTransactionCount,
  getTransactionReceipt,
  http,
  key,
  keccak256,
  newSmartAccount,
  nonceFreeCost,
  nonceKeyExistingCost,
  nonceKeyMax,
  privateKeyToAccount,
  toHex,
  vibenetDevnetDeployment,
} from '../vendor/aa/index.js'

const CHAIN_ID = 84_538_453
const API_URL = 'https://api.vibes.base.org'
const RPC_URL = 'https://rpc.vibes.base.org'
const TRANSFER_COUNT = Number(process.env.SPIKE_TRANSFERS ?? 50)
const TRANSFER_AMOUNT = BigInt(process.env.SPIKE_AMOUNT_UNITS ?? 16_666)
const AUTO_TOP_UP = process.env.SPIKE_AUTO_TOPUP === '1'
const PRIORITY_FEE = 1_000_000n
const REQUEST_TIMEOUT_MS = 15_000
const RECEIPT_TIMEOUT_MS = 90_000

const chain = {
  id: CHAIN_ID,
  name: 'Base Vibenet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: [RPC_URL] } },
}

const client = createPublicClient({ chain, transport: http(RPC_URL) })

const erc20Abi = [
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const short = (value) => `${value.slice(0, 8)}…${value.slice(-6)}`
const formatUnits = (value, decimals = 6) => {
  const negative = value < 0n
  const absolute = negative ? -value : value
  const base = 10n ** BigInt(decimals)
  const whole = absolute / base
  const fraction = (absolute % base).toString().padStart(decimals, '0').replace(/0+$/, '')
  return `${negative ? '-' : ''}${whole}${fraction ? `.${fraction}` : ''}`
}

async function request(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    const body = await response.json().catch(() => null)
    if (!response.ok) {
      throw new Error(body?.error ?? body?.message ?? `${response.status} ${response.statusText}`)
    }
    return body
  } finally {
    clearTimeout(timer)
  }
}

let rpcId = 0
async function rpc(method, params = []) {
  const body = await request(RPC_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++rpcId, method, params }),
  })
  if (body?.error) {
    const error = new Error(body.error.message ?? `${method} failed`)
    error.code = body.error.code
    error.data = body.error.data
    throw error
  }
  return body?.result
}

async function post(path, body) {
  return request(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

async function waitFor(name, read, predicate, timeoutMs = 60_000, intervalMs = 350) {
  const started = performance.now()
  let last
  while (performance.now() - started < timeoutMs) {
    try {
      last = await read()
      if (predicate(last)) return last
    } catch (error) {
      last = error
    }
    await sleep(intervalMs)
  }
  throw new Error(`Timed out waiting for ${name}${last instanceof Error ? `: ${last.message}` : ''}`)
}

async function readCode(address) {
  return rpc('eth_getCode', [address, 'latest'])
}

async function readEthBalance(address) {
  return BigInt(await rpc('eth_getBalance', [address, 'latest']))
}

async function readTokenBalance(token, address, blockTag = 'latest') {
  const data = encodeFunctionData({ abi: erc20Abi, functionName: 'balanceOf', args: [address] })
  const raw = await rpc('eth_call', [{ to: token, data }, blockTag])
  return decodeAbiParameters([{ type: 'uint256' }], raw)[0]
}

async function waitForReceipt(hash, timeoutMs = RECEIPT_TIMEOUT_MS) {
  return waitFor(
    `receipt ${hash}`,
    () => getTransactionReceipt(client, { hash }).catch(() => null),
    Boolean,
    timeoutMs,
    250,
  )
}

async function waitForReceipts(items, timeoutMs = RECEIPT_TIMEOUT_MS) {
  const pending = new Map(items.map((item) => [item.hash.toLowerCase(), {
    ...item,
    lastRebroadcastAt: item.sentAt,
  }]))
  const receipts = new Map()
  const started = performance.now()

  while (pending.size > 0 && performance.now() - started < timeoutMs) {
    const batch = [...pending.values()]
      .sort((left, right) => left.sentAt - right.sentAt)
      .slice(0, 10)

    await Promise.all(batch.map(async (item) => {
      const receipt = await getTransactionReceipt(client, { hash: item.hash }).catch(() => null)
      if (receipt) {
        assertReceiptSucceeded(item.hash, receipt)
        receipts.set(item.hash.toLowerCase(), receipt)
        pending.delete(item.hash.toLowerCase())
        return
      }

      const now = performance.now()
      if (now - item.lastRebroadcastAt < 1_250) return
      item.lastRebroadcastAt = now
      try {
        await rpc('eth_sendRawTransaction', [item.raw])
        console.log(`  rebroadcast sequence ${item.sequence} (${short(item.hash)})`)
      } catch (error) {
        const known = await rpc('eth_getTransactionByHash', [item.hash]).catch(() => null)
        if (!known && !/already known|nonce too low/i.test(error.message)) {
          console.warn(`  rebroadcast sequence ${item.sequence} returned: ${error.message}`)
        }
      }
    }))

    if (pending.size > 0) await sleep(250)
  }

  if (pending.size > 0) {
    const missing = [...pending.values()].map((item) => `${item.sequence}:${item.hash}`).join(', ')
    throw new Error(`Timed out waiting for ${pending.size} receipt(s): ${missing}`)
  }

  return items.map((item) => receipts.get(item.hash.toLowerCase()))
}

async function reconcileInFlight(pending, receipts, { rebroadcastAfterMs = 900 } = {}) {
  const batch = [...pending.values()]
    .sort((left, right) => left.sentAt - right.sentAt)
    .slice(0, 10)

  await Promise.all(batch.map(async (item) => {
    const receipt = await getTransactionReceipt(client, { hash: item.hash }).catch(() => null)
    if (receipt) {
      assertReceiptSucceeded(item.hash, receipt)
      receipts.set(item.hash.toLowerCase(), receipt)
      pending.delete(item.hash.toLowerCase())
      return
    }

    const now = performance.now()
    const known = await rpc('eth_getTransactionByHash', [item.hash]).catch(() => null)
    if (known) {
      item.lastSeenAt = now
      return
    }
    if (now - item.lastRebroadcastAt < rebroadcastAfterMs) return
    item.lastRebroadcastAt = now
    try {
      await rpc('eth_sendRawTransaction', [item.raw])
      console.log(`  rebroadcast sequence ${item.sequence} (${short(item.hash)})`)
    } catch (error) {
      const foundAfterError = await rpc('eth_getTransactionByHash', [item.hash]).catch(() => null)
      if (!foundAfterError && !/already known|nonce too low/i.test(error.message)) {
        console.warn(`  rebroadcast sequence ${item.sequence} returned: ${error.message}`)
      }
    }
  }))
}

async function broadcastAccepted(raw, expectedHash, { timeoutMs = 30_000 } = {}) {
  const deadline = performance.now() + timeoutMs
  let attempt = 0
  let lastError

  while (performance.now() < deadline) {
    attempt += 1
    try {
      const returnedHash = await rpc('eth_sendRawTransaction', [raw])
      if (returnedHash.toLowerCase() !== expectedHash.toLowerCase()) {
        throw new Error(`RPC returned unexpected hash ${returnedHash}; expected ${expectedHash}`)
      }
    } catch (error) {
      lastError = error
      if (!/already known|nonce too low|signature limit reached|nonce too high|nonce mismatch/i.test(error.message) && attempt >= 3) {
        throw error
      }
    }

    return expectedHash
  }

  throw new Error(`Timed out broadcasting ${expectedHash}${lastError ? `: ${lastError.message}` : ''}`)
}

function assertReceiptSucceeded(hash, receipt) {
  const topLevelFailed = receipt.status === '0x0' || receipt.status === 0n || receipt.status === 0
  const fields = receipt.eip8130 ?? receipt
  if (topLevelFailed || !allPhasesSucceeded(fields)) {
    throw new Error(`Transaction ${hash} reverted: ${JSON.stringify(fields.phaseStatuses ?? [])}`)
  }
}

async function currentFees() {
  const block = await rpc('eth_getBlockByNumber', ['latest', false])
  const baseFee = BigInt(block?.baseFeePerGas ?? 1_000_000_000n)
  return {
    baseFee,
    priorityFee: PRIORITY_FEE,
    maxFeePerGas: baseFee * 2n + PRIORITY_FEE,
  }
}

async function faucetDrip(path, address, balanceReader, before, cooldownSeconds) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await post(path, { address })
      const after = await waitFor(
        `${path} balance increase`,
        balanceReader,
        (balance) => balance > before,
      )
      return { response, after }
    } catch (error) {
      if (attempt === 4) throw error
      const retryMs = (cooldownSeconds + 1) * 1000
      console.warn(`  ${path} attempt ${attempt} failed (${error.message}); retrying in ${retryMs / 1000}s`)
      await sleep(retryMs)
    }
  }
}

async function main() {
  if (!Number.isInteger(TRANSFER_COUNT) || TRANSFER_COUNT < 1) {
    throw new Error('SPIKE_TRANSFERS must be a positive integer')
  }

  console.log('Vibenet money-stream Phase 1 spike')
  console.log('====================================')

  const [health, contracts, faucetStatus, chainIdHex, genesis] = await Promise.all([
    request(`${API_URL}/api/vibenet/chain-health`),
    request(`${API_URL}/api/vibenet/contracts`),
    request(`${API_URL}/api/vibenet/faucet/status`),
    rpc('eth_chainId'),
    rpc('eth_getBlockByNumber', ['0x0', false]),
  ])

  if (!health.healthy) throw new Error(`Vibenet is unhealthy: ${health.reason ?? health.detail ?? 'unknown reason'}`)
  if (Number(BigInt(chainIdHex)) !== CHAIN_ID) throw new Error(`Unexpected chain id ${chainIdHex}`)

  const candidates = [
    contracts?.eip8130?.CanonicalHighRatePayerAccount,
    vibenetDevnetDeployment?.accounts?.defaultHighRate,
  ]
    .filter((value, index, values) => typeof value === 'string' && values.indexOf(value) === index)

  let implementation
  for (const candidate of candidates) {
    if ((await readCode(candidate)) !== '0x') {
      implementation = candidate
      break
    }
  }
  if (!implementation) throw new Error('No live EIP-8130 high-rate account implementation found')

  const usdv = contracts.usdv ?? faucetStatus.usdv_address
  if (!usdv || (await readCode(usdv)) === '0x') throw new Error('No live USDV contract found')

  const signer = privateKeyToAccount(generatePrivateKey())
  const account = newSmartAccount({ signer, implementation, salt: generatePrivateKey() })
  const recipient = privateKeyToAccount(generatePrivateKey()).address

  console.log(`chain:          ${Number(BigInt(chainIdHex))}`)
  console.log(`head:           ${health.head}`)
  console.log(`genesis:        ${short(genesis.hash)}`)
  console.log(`implementation: ${implementation} (high-rate)`)
  console.log(`USDV:           ${usdv}`)
  console.log(`sender:         ${account.address}`)
  console.log(`recipient:      ${recipient}`)

  const ethBefore = await readEthBalance(account.address)
  console.log(`\nFunding sender with ETH (before ${formatUnits(ethBefore, 18)} ETH)…`)
  const ethDrip = await faucetDrip(
    '/api/vibenet/faucet/drip',
    account.address,
    () => readEthBalance(account.address),
    ethBefore,
    faucetStatus.ip_cooldown_secs ?? 10,
  )
  console.log(`  landed ${ethDrip.response.tx_hash ?? '(hash unavailable)'}; balance ${formatUnits(ethDrip.after, 18)} ETH`)

  const cooldownMs = (Number(faucetStatus.ip_cooldown_secs ?? 10) + 1) * 1000
  console.log(`Waiting ${cooldownMs / 1000}s for the shared faucet cooldown…`)
  await sleep(cooldownMs)

  const usdvBefore = await readTokenBalance(usdv, account.address)
  console.log(`Funding sender with USDV (before ${formatUnits(usdvBefore)} USDV)…`)
  const usdvDrip = await faucetDrip(
    '/api/vibenet/faucet/drip-usdv',
    account.address,
    () => readTokenBalance(usdv, account.address),
    usdvBefore,
    faucetStatus.ip_cooldown_secs ?? 10,
  )
  console.log(`  landed ${usdvDrip.response.tx_hash ?? '(hash unavailable)'}; balance ${formatUnits(usdvDrip.after)} USDV`)

  const transferData = (amount) => encodeFunctionData({
    abi: erc20Abi,
    functionName: 'transfer',
    args: [recipient, amount],
  })
  const phases = (amount) => [[{ to: usdv, value: 0n, data: transferData(amount) }]]
  const actor = key.k1(signer.address)
  const fees = await currentFees()
  let sequence = await getTransactionCount(client, { address: account.address, nonceKey: 0n })

  console.log(`\nDeploying account with a 1-unit USDV proof transfer at sequence ${sequence}…`)
  const createEstimate = await estimateGas(client, {
    sender: account.address,
    senderActorId: actor.actorId,
    senderAuthAuthenticator: canonicalAuthenticators.k1,
    accountChanges: [account.createChange],
    calls: phases(1n),
    nonceKey: 0n,
    nonceSequence: Number(sequence),
  })
  const createGas = (createEstimate * 13n + 9n) / 10n
  const createRaw = await account.signTransaction({
    chainId: CHAIN_ID,
    accountChanges: [account.createChange],
    calls: encodeWalletCalls({ account: account.address, calls: phases(1n) }),
    nonceKey: 0n,
    nonceSequence: sequence,
    maxFeePerGas: fees.maxFeePerGas,
    maxPriorityFeePerGas: fees.priorityFee,
    gas: createGas,
  })
  const expectedCreateHash = keccak256(createRaw)
  const createHash = await rpc('eth_sendRawTransaction', [createRaw])
  if (createHash.toLowerCase() !== expectedCreateHash.toLowerCase()) {
    throw new Error(`RPC returned unexpected create hash ${createHash}; expected ${expectedCreateHash}`)
  }
  const createReceipt = await waitForReceipt(createHash)
  assertReceiptSucceeded(createHash, createReceipt)
  await waitFor('account bytecode', () => readCode(account.address), (code) => code !== '0x', 15_000, 250)
  console.log(`  deployed in block ${Number(BigInt(createReceipt.blockNumber))}; gas ${Number(BigInt(createReceipt.gasUsed))}`)
  sequence += 1n

  const recipientBaseline = await readTokenBalance(usdv, recipient)
  const plainEstimate = await estimateGas(client, {
    sender: account.address,
    senderActorId: actor.actorId,
    senderAuthAuthenticator: canonicalAuthenticators.k1,
    accountChanges: [],
    calls: phases(TRANSFER_AMOUNT),
    nonceKey: 0n,
    nonceSequence: Number(sequence),
  })
  const nonceFreeEstimate = plainEstimate + nonceFreeCost - nonceKeyExistingCost
  const gasLimit = (nonceFreeEstimate * 13n + 9n) / 10n
  console.log(`\nSequenced transfer estimate: ${plainEstimate} gas`)
  console.log(`Nonce-free adjusted estimate: ${nonceFreeEstimate} gas; session limit: ${gasLimit}`)
  console.log(`Broadcasting ${TRANSFER_COUNT} nonce-free transfers of ${formatUnits(TRANSFER_AMOUNT)} USDV…`)

  const sent = []
  const pending = new Map()
  const earlyReceipts = new Map()
  let sendingComplete = false
  let topUpCount = 0
  const watcher = (async () => {
    while (!sendingComplete || pending.size > 0) {
      await reconcileInFlight(pending, earlyReceipts, { rebroadcastAfterMs: 700 })
      await sleep(180)
    }
  })()
  const fundingWatcher = AUTO_TOP_UP ? (async () => {
    while (!sendingComplete || pending.size > 0) {
      const before = await readEthBalance(account.address)
      if (before < 30_000_000_000_000_000n) {
        const response = await post('/api/vibenet/faucet/drip', { address: account.address })
        await waitFor('automatic ETH top-up', () => readEthBalance(account.address), (balance) => balance > before)
        topUpCount += 1
        console.log(`  automatic ETH top-up ${topUpCount} landed (${short(response.tx_hash)})`)
      }
      await sleep(5_000)
    }
  })() : Promise.resolve()
  const broadcastStarted = performance.now()
  try {
    for (let index = 0; index < TRANSFER_COUNT; index += 1) {
      const scheduledAt = broadcastStarted + index * 200
      const beforeSendDelay = scheduledAt - performance.now()
      if (beforeSendDelay > 0) await sleep(beforeSendDelay)
      while (pending.size > 12) await sleep(80)

      const raw = await account.signTransaction({
        chainId: CHAIN_ID,
        accountChanges: [],
        calls: encodeWalletCalls({ account: account.address, calls: phases(TRANSFER_AMOUNT) }),
        metadata: toHex(`money-stream-spike:${index}:${Date.now()}`),
        nonceKey: nonceKeyMax,
        validBefore: BigInt(Date.now() + 15_000 + index),
        maxFeePerGas: fees.maxFeePerGas,
        maxPriorityFeePerGas: fees.priorityFee,
        gas: gasLimit,
      })
      const expectedHash = keccak256(raw)
      const sentAt = performance.now()
      const hash = await broadcastAccepted(raw, expectedHash)
      const item = { hash, raw, sequence: BigInt(index), sentAt, lastRebroadcastAt: sentAt }
      sent.push(item)
      pending.set(hash.toLowerCase(), item)
      if ((index + 1) % 10 === 0 || index === TRANSFER_COUNT - 1) {
        console.log(`  accepted ${index + 1}/${TRANSFER_COUNT}`)
      }
    }
  } finally {
    sendingComplete = true
  }
  const broadcastEnded = performance.now()

  console.log('Waiting for all receipts…')
  await Promise.race([
    Promise.all([watcher, fundingWatcher]),
    sleep(RECEIPT_TIMEOUT_MS).then(() => { throw new Error('Receipt watcher timed out') }),
  ])
  if (pending.size > 0) {
    const missing = [...pending.values()].map((item) => `${item.sequence}:${item.hash}`).join(', ')
    throw new Error(`Timed out waiting for ${pending.size} receipt(s): ${missing}`)
  }
  const receipts = sent.map((item) => earlyReceipts.get(item.hash.toLowerCase()))
  const confirmedAt = performance.now()

  const recipientAfter = await waitFor(
    'recipient USDV delta',
    () => readTokenBalance(usdv, recipient),
    (balance) => balance - recipientBaseline === BigInt(TRANSFER_COUNT) * TRANSFER_AMOUNT,
    30_000,
    300,
  )
  const actualDelta = recipientAfter - recipientBaseline
  const expectedDelta = BigInt(TRANSFER_COUNT) * TRANSFER_AMOUNT
  if (actualDelta !== expectedDelta) {
    throw new Error(`Recipient delta mismatch: expected ${expectedDelta}, received ${actualDelta}`)
  }

  const gasUsed = receipts.map((receipt) => BigInt(receipt.gasUsed))
  const totalGas = gasUsed.reduce((sum, value) => sum + value, 0n)
  const meanGas = totalGas / BigInt(gasUsed.length)
  const broadcastSeconds = (broadcastEnded - broadcastStarted) / 1000
  const confirmationSeconds = (confirmedAt - broadcastStarted) / 1000
  const acceptedTps = TRANSFER_COUNT / broadcastSeconds
  const confirmedTps = TRANSFER_COUNT / confirmationSeconds
  const costPerTransfer = meanGas * fees.baseFee
  const transfersPerDrip = BigInt(faucetStatus.drip_wei) / costPerTransfer
  const runwaySecondsAtFiveTps = Number(transfersPerDrip) / 5

  console.log('\nPHASE 1 REPORT')
  console.log('==============')
  console.log(`transfers:             ${TRANSFER_COUNT}`)
  console.log(`recipient delta:       ${formatUnits(actualDelta)} USDV`)
  console.log(`broadcast duration:    ${broadcastSeconds.toFixed(3)}s`)
  console.log(`accepted throughput:   ${acceptedTps.toFixed(2)} tx/s`)
  console.log(`confirmation duration: ${confirmationSeconds.toFixed(3)}s`)
  console.log(`confirmed throughput:  ${confirmedTps.toFixed(2)} tx/s`)
  console.log(`mean gas/transfer:     ${meanGas}`)
  console.log(`base fee sampled:      ${fees.baseFee} wei`)
  console.log(`cost/transfer:         ${formatUnits(costPerTransfer, 18)} ETH`)
  console.log(`0.1 ETH runway:        ${transfersPerDrip} transfers`)
  console.log(`runway at 5 tx/s:      ${(runwaySecondsAtFiveTps / 60).toFixed(2)} minutes`)
  console.log(`automatic ETH top-ups: ${topUpCount}`)

  if (acceptedTps < 3) {
    throw new Error(`Phase 1 gate failed: accepted throughput ${acceptedTps.toFixed(2)} tx/s is below 3 tx/s`)
  }
  if (AUTO_TOP_UP && TRANSFER_COUNT >= 1_400 && topUpCount < 1) {
    throw new Error('Soak gate failed: expected at least one automatic ETH top-up')
  }
  console.log('\nPASS: high-rate nonce-free broadcasting clears the Phase 1 throughput gate.')
}

main().catch((error) => {
  console.error(`\nFAIL: ${error.stack ?? error.message ?? error}`)
  process.exitCode = 1
})
