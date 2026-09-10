import {
  generatePrivateKey,
  newSmartAccount,
  privateKeyToAccount,
  type Address,
  type Hex,
  type LocalAccount,
  type NewSmartAccountReturnType,
  vibenetDevnetDeployment,
} from '@vibenet/aa'

import type { LiveContracts } from './config'
import { readCode } from './rpc'

const ACCOUNT_STORAGE_KEY = 'base.money-stream.account.v2'
const LEASE_STORAGE_KEY = 'base.money-stream.lease.v1'

type StoredAccount = {
  version: 2
  genesisHash: Hex
  implementation: Address
  token: Address
  privateKey: Hex
  salt: Hex
  address: Address
  recipient: Address
  lastHead: number
}

export type StreamAccount = {
  account: NewSmartAccountReturnType
  signer: LocalAccount
  recipient: Address
  genesisHash: Hex
  implementation: Address
  rotated: boolean
  stored: StoredAccount
}

function loadStored(): StoredAccount | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNT_STORAGE_KEY) ?? 'null') as StoredAccount | null
    return parsed?.version === 2 ? parsed : null
  } catch {
    return null
  }
}

export function saveStoredHead(stored: StoredAccount, head: number) {
  stored.lastHead = head
  try {
    localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(stored))
  } catch {
    // The in-memory account remains usable when storage is unavailable.
  }
}

function persist(stored: StoredAccount) {
  try {
    localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(stored))
  } catch {
    // Private browsing can deny storage; this page session still works.
  }
}

export async function resolveHighRateImplementation(contracts: LiveContracts): Promise<Address | null> {
  const candidates = [
    contracts.eip8130?.CanonicalHighRatePayerAccount,
    vibenetDevnetDeployment.accounts.defaultHighRate,
  ].filter((candidate): candidate is Address => typeof candidate === 'string' && /^0x[0-9a-fA-F]{40}$/.test(candidate))

  for (const candidate of candidates) {
    if ((await readCode(candidate)) !== '0x') return candidate
  }
  return null
}

export function resolveUsdv(contracts: LiveContracts, faucetToken: Address): Address {
  return (contracts.usdv ?? faucetToken) as Address
}

export function getOrCreateAccount(parameters: {
  genesisHash: Hex
  implementation: Address
  token: Address
  head: number
  forceRotate?: boolean
}): StreamAccount {
  const { genesisHash, implementation, token, head, forceRotate = false } = parameters
  let stored = loadStored()
  const mismatch = !stored
    || stored.genesisHash.toLowerCase() !== genesisHash.toLowerCase()
    || stored.implementation.toLowerCase() !== implementation.toLowerCase()
    || stored.token.toLowerCase() !== token.toLowerCase()
    || stored.lastHead > head + 8

  const rotated = forceRotate || mismatch
  if (rotated || !stored) {
    const privateKey = generatePrivateKey()
    const salt = generatePrivateKey()
    const signer = privateKeyToAccount(privateKey)
    const account = newSmartAccount({ signer, implementation, salt })
    stored = {
      version: 2,
      genesisHash,
      implementation,
      token,
      privateKey,
      salt,
      address: account.address,
      recipient: privateKeyToAccount(generatePrivateKey()).address,
      lastHead: head,
    }
    persist(stored)
    return { account, signer, recipient: stored.recipient, genesisHash, implementation, rotated, stored }
  }

  const signer = privateKeyToAccount(stored.privateKey)
  let account = newSmartAccount({ signer, implementation, salt: stored.salt })
  if (account.address.toLowerCase() !== stored.address.toLowerCase()) {
    stored.privateKey = generatePrivateKey()
    stored.salt = generatePrivateKey()
    const replacementSigner = privateKeyToAccount(stored.privateKey)
    account = newSmartAccount({ signer: replacementSigner, implementation, salt: stored.salt })
    stored.address = account.address
    stored.recipient = privateKeyToAccount(generatePrivateKey()).address
    stored.lastHead = head
    persist(stored)
    return {
      account,
      signer: replacementSigner,
      recipient: stored.recipient,
      genesisHash,
      implementation,
      rotated: true,
      stored,
    }
  }

  stored.lastHead = head
  persist(stored)
  return { account, signer, recipient: stored.recipient, genesisHash, implementation, rotated, stored }
}

export class StreamLease {
  private readonly owner = crypto.randomUUID()
  private timer: number | null = null

  acquire(): boolean {
    const now = Date.now()
    try {
      const current = JSON.parse(localStorage.getItem(LEASE_STORAGE_KEY) ?? 'null') as { owner: string; expiresAt: number } | null
      if (current && current.owner !== this.owner && current.expiresAt > now) return false
      this.write(now + 5_000)
      this.timer = window.setInterval(() => this.write(Date.now() + 5_000), 2_000)
      return true
    } catch {
      return true
    }
  }

  release() {
    if (this.timer !== null) window.clearInterval(this.timer)
    this.timer = null
    try {
      const current = JSON.parse(localStorage.getItem(LEASE_STORAGE_KEY) ?? 'null') as { owner: string } | null
      if (current?.owner === this.owner) localStorage.removeItem(LEASE_STORAGE_KEY)
    } catch {
      // Nothing to release.
    }
  }

  private write(expiresAt: number) {
    localStorage.setItem(LEASE_STORAGE_KEY, JSON.stringify({ owner: this.owner, expiresAt }))
  }
}
