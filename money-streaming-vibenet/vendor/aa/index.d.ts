// Hand-written types for the self-contained AA vendor bundle (index.js).
// Covers the surface the vibenet account demo uses. Generated artifact pairing:
// `bun run vendor/aa/build.mjs` rebuilds index.js from the sibling viem branch.

export type Hex = `0x${string}`
export type Address = `0x${string}`

// ---------------------------------------------------------------------------
// Core viem (subset)
// ---------------------------------------------------------------------------

export type LocalAccount = {
  address: Address
  publicKey: Hex
  sign?: (parameters: { hash: Hex }) => Promise<Hex>
  signMessage: (parameters: { message: string | { raw: Hex } }) => Promise<Hex>
  signTypedData: (parameters: any) => Promise<Hex>
  type: string
}

export type Client = {
  chain?: { id: number; name?: string } | undefined
  request: (args: any) => Promise<any>
  [key: string]: any
}

export function http(url?: string, config?: any): any
export function custom(provider: any, config?: any): any
export function createPublicClient(parameters: any): Client
export function createWalletClient(parameters: any): Client
export function createBundlerClient(parameters: any): Client

export function encodeAbiParameters(params: readonly any[], values: readonly any[]): Hex
export function decodeAbiParameters(params: readonly any[], data: Hex): readonly any[]
export function encodeFunctionData(parameters: any): Hex
export function parseAbi(signatures: readonly string[]): any
export function keccak256(value: Hex | Uint8Array): Hex
export function slice(value: Hex, start?: number, end?: number): Hex
export function toHex(value: string | number | bigint | boolean | Uint8Array, opts?: any): Hex
export function hexToBigInt(hex: Hex, opts?: any): bigint
export function concatHex(values: readonly Hex[]): Hex
export function parseEther(ether: string): bigint
export function parseUnits(value: string, decimals: number): bigint
export function formatEther(wei: bigint): string
export const zeroAddress: Address

// ---------------------------------------------------------------------------
// Accounts
// ---------------------------------------------------------------------------

export function generatePrivateKey(): Hex
export function privateKeyToAccount(privateKey: Hex): LocalAccount

// ---------------------------------------------------------------------------
// WebAuthn (ERC-4337 / passkeys)
// ---------------------------------------------------------------------------

export type P256Credential = { id: string; publicKey: Hex; raw: unknown }
export function createWebAuthnCredential(parameters: {
  name?: string
  [key: string]: any
}): Promise<P256Credential>

export type WebAuthnAccount = {
  id: string
  publicKey: Hex
  sign: (parameters: { hash: Hex }) => Promise<{
    signature: Hex
    webauthn: {
      authenticatorData: Hex
      clientDataJSON: string
      challengeIndex: number
      typeIndex: number
    }
    raw: unknown
  }>
}
export function toWebAuthnAccount(parameters: {
  credential: { id: string; publicKey: Hex }
  getFn?: any
  rpId?: string
}): WebAuthnAccount

export const entryPoint07Address: Address
export const entryPoint07Abi: readonly any[]

// ---------------------------------------------------------------------------
// EIP-8130
// ---------------------------------------------------------------------------

export type AaActor = {
  actorId: Hex
  authenticator: Address
  /** `uint16` scope bitmask committed at creation. `0`/omitted = admin. */
  scope?: number
  /** `manager || commitment` — required iff `scope & SCOPE_POLICY`. */
  policyData?: Hex
}
/** `authorizeActor` op (`ChangeType` 0x00) within a `SignedAccountChanges` batch. */
export type AaAuthorizeActor = {
  changeType: 0x00
  actorId: Hex
  authenticator: Address
  scope?: number
  /** Actor expiry (unix SECONDS, `uint48`). `0`/omitted = no expiry. */
  expiry?: bigint
  policyData?: Hex
}
/** `revokeActor` op (`ChangeType` 0x01). */
export type AaRevokeActor = { changeType: 0x01; actorId: Hex }
/** `incrementLocalEpoch` op (`ChangeType` 0x02): invalidates unlanded local-channel sigs. */
export type AaIncrementLocalEpoch = { changeType: 0x02 }
/** `lock` op (`ChangeType` 0x03): local channel only, sole op in the batch. */
export type AaLock = { changeType: 0x03; unlockDelay: number }
/** `unlock` op (`ChangeType` 0x04): local channel only, sole op in the batch. */
export type AaUnlock = { changeType: 0x04 }
/** A single op within a `SignedAccountChanges` batch. */
export type AaChange =
  | AaAuthorizeActor
  | AaRevokeActor
  | AaIncrementLocalEpoch
  | AaLock
  | AaUnlock
/** @deprecated retained alias; use {@link AaChange}. */
export type AaActorChange = AaAuthorizeActor | AaRevokeActor
/** Replay domain a `SignedAccountChanges` batch binds to. */
export type AaChangeChannel = 'local' | 'multichain'
export type AaAccountChangeCreate = {
  type: 'create'
  userSalt: Hex
  code: Hex
  initialActors: readonly AaActor[]
}
/** A signed `SignedAccountChanges` batch (`applySignedAccountChanges`). */
export type AaAccountChangeConfig = {
  type: 'config'
  /** `'local'` binds `block.chainid` + epoch/sequence; `'multichain'` binds chain id 0. */
  channel: AaChangeChannel
  /** `uint64` channel sequence. Local: `localEpoch(hi 32) || localSequence(lo 32)`. */
  sequence: bigint
  /** Ordered ops applied all-or-nothing. */
  changes: readonly AaChange[]
  /** Authorization signature over the batch digest (`authenticator || data`). */
  signature: Hex
}
export type AaAccountChangeDelegation = { type: 'delegation'; target: Address }
export type AaAccountChange =
  | AaAccountChangeCreate
  | AaAccountChangeConfig
  | AaAccountChangeDelegation
export type AaCall = { to: Address; data?: Hex; value?: bigint }
export type AaCalls = readonly (readonly AaCall[])[]

export type Signer = {
  address: Address
  sign?: (parameters: { hash: Hex }) => Promise<Hex>
  authenticator?: Address
}

export type Policy = { type: number; manager: Address; commitment: Hex }
export type AuthorizeActorOptions = {
  scope?: number
  expiry?: bigint
  policy?: Policy
}

export const key: {
  k1(address: Address): AaActor
  p256(publicKey: { x: Hex; y: Hex } | Hex, options?: { authenticator?: Address }): AaActor
  passkey(publicKey: { x: Hex; y: Hex } | Hex, options?: { authenticator?: Address }): AaActor
  delegate(delegatedAccount: Address, options?: { authenticator?: Address }): AaActor
  trustedExecutor(caller: Address): AaActor
  /** No-code external-pull policy actor (uses `externalPolicyAuthenticator`). */
  externalPull(caller: Address): AaActor
}
export const externalPolicyAuthenticator: Address
export function authorizeActor(actor: AaActor, options?: AuthorizeActorOptions): AaAuthorizeActor
export function revokeActor(actor: AaActor | Hex): AaRevokeActor
export function incrementLocalEpoch(): AaIncrementLocalEpoch
export function toScope(...flags: number[]): number
export function encodePolicyData(policy: Policy): Hex

export const actorScope: {
  /** `OPERATOR` — ungated initiation (may originate to any `call.to`). Formerly `sender`. */
  operator: number
  /** `SELF_PAYER` — may pay for its own transactions (`payer == sender`). */
  selfPayer: number
  /** `SPONSOR_PAYER` — may sponsor others (`payer != sender`). */
  sponsorPayer: number
  /** `POLICY` — gated initiation: actor is gated to its policy manager. */
  policy: number
  /** `NONCE` — may use sequenced nonce keys; without it, nonce-free only. */
  nonce: number
}
export const scopeUnrestricted: number
export const accountStateFlags: {
  revokeDefaultEoa: number
  locked: number
  unlockInitiated: number
}
/** `SignedAccountChanges` op discriminants. */
export const changeType: {
  authorizeActor: 0x00
  revokeActor: 0x01
  incrementLocalEpoch: 0x02
  lock: 0x03
  unlock: 0x04
}
/** Top-level account-change entry discriminants (create / config / delegation). */
export const accountChangeType: {
  create: 0x00
  config: 0x01
  delegation: 0x02
}
/** Whether an actor with `scope` may use sequenced (counter-backed) nonce keys. */
export function canUseSequencedNonce(scope: number | undefined): boolean
/** Whether an actor with `scope` is restricted to nonce-free (expiring) txs. */
export function isNoncelessOnly(scope: number | undefined): boolean
export const policyDataLength: number
export const replayIdType: Hex
export const nonceFreeExpiryWindow: bigint
export const nonceFreeMaxExpiryWindow: bigint
/** Nonce-free mode selector: `nonceKey === nonceKeyMax` (2**256 - 1). */
export const nonceKeyMax: bigint
export const replayBufferCapacity: bigint
export const nonceFreeCost: bigint
export const nonceKeyFirstUseCost: bigint
export const nonceKeyExistingCost: bigint
export const ecrecoverAuthenticator: Address
export const trustedExecutorAuthenticator: Address
export const canonicalAuthenticators: {
  k1: Address
  p256: Address
  passkey: Address
  delegate: Address
}
/**
 * Representative auth-payload byte length (bytes after a prefixed blob's
 * 20-byte selector) for each canonical authenticator, keyed by *lowercased*
 * address. Used by `estimateGas8130`'s `senderAuthVerifier`/`payerAuthVerifier`
 * hint to synthesize a stub blob without the caller specifying an exact size.
 */
export const canonicalAuthDataLength: Record<string, number>
/**
 * The EIP-8130 keystore (`AccountConfiguration`) system contract address.
 * Enshrined in the execution client — identical on every supported chain and
 * not configurable (using any other address derives a different account
 * address and fails the create tx).
 */
export const keystoreAddress: Address
export const defaultAccountAddress: Address
export const nonceManagerAddress: Address
export const nonceManagerAbi: readonly any[]

// --- EIP-8130 RPC extensions (base eip8130 RPC support) --------------------

/**
 * Reads the current config-change sequences for an EIP-8130 account.
 * Use `local` as the `sequence` parameter when building the next AccountChange.
 */
export function getConfigSequence(
  client: Client,
  parameters: {
    account: Address
  },
): Promise<{ local: bigint; multichain: bigint }>

// --- EIP-8130 account locking (SignedAccountChanges ops) -------------------
//
// NOTE: lock/unlock are `ChangeType` ops inside a `SignedAccountChanges` batch
// (build via {@link lockChange}/{@link unlockChange}, sign via `account.change`
// / `signAccountChanges` on the `'local'` channel, apply via
// `encodeApplySignedAccountChangesData`). The enshrined node currently DEFERS
// them — a batch carrying one is rejected on the native path.

/** Maximum `unlockDelay` (`uint16`). */
export const maxUnlockDelay: number
export type LockChangeParameters = { unlockDelay: number }
/** Builds a `lock` op ({@link AaLock}); local channel only, sole op in the batch. */
export function lockChange(parameters: LockChangeParameters): AaLock
/** Builds an `unlock` op ({@link AaUnlock}); local channel only, sole op in the batch. */
export function unlockChange(): AaUnlock

/** Reads whether an EIP-8130 account is currently locked. */
export function isLocked(
  client: Client,
  parameters: { account: Address },
): Promise<boolean>

/** Reads the full lock status of an EIP-8130 account. */
export function getLockStatus(
  client: Client,
  parameters: { account: Address },
): Promise<{
  locked: boolean
  hasInitiatedUnlock: boolean
  unlocksAt: number
  unlockDelay: number
}>

/** Live SessionPolicy spend for one token limit (getCurrentSpend). */
export function getSessionSpend(
  client: Client,
  parameters: {
    commitment: Hex
    tokenLimit: SessionPolicyTokenLimit
    sessionPolicy?: Address
  },
): Promise<{
  allowance: bigint
  period: number
  spent: bigint
  remaining: bigint
  periodStart: number | bigint
  periodEnd: number | bigint
}>

/** Read the EIP-8130 nonce via `eth_getTransactionCount` (2D channel-nonce). */
export function getTransactionCount(
  client: Client,
  parameters: {
    address: Address
    nonceKey?: bigint
    blockNumber?: bigint
    blockTag?: string
  },
): Promise<bigint>

/**
 * Estimate gas for an `AA_TX_TYPE` call via the EIP-8130 `eth_estimateGas`.
 *
 * The node prices authentication gas from the auth blob's *shape*, never a
 * real signature. Provide at most one of, in priority order:
 * `senderAuth` (raw blob, priced verbatim) > `senderAuthAuthenticator`
 * (+ optional `senderAuthSize`, synthesizes `authenticator || filler`) > nothing (node
 * default: configured k1 stub if `sender`/`from` names a configured account,
 * else the default-EOA bare k1 stub). Same for payer authentication.
 */
export function estimateGas(
  client: Client,
  parameters: {
    /** Sender account. Interchangeable with `sender` (must agree if both set). */
    from?: Address
    /** The EIP-8130 sender account. Interchangeable with `from`. */
    sender?: Address
    // Simplified mode (no accountChanges/calls)
    to?: Address
    data?: Hex
    value?: bigint
    // Full-body mode
    accountChanges?: readonly AaAccountChange[]
    calls?: readonly (readonly { to: Address; value?: bigint; data?: Hex }[])[]
    nonceKey?: bigint
    nonceSequence?: number
    // Sender authentication
    /** Raw `senderAuth` blob, priced verbatim. Takes priority over `senderAuthAuthenticator`. */
    senderAuth?: Hex
    /** Authenticator address hint; see `canonicalAuthenticators`. */
    senderAuthAuthenticator?: Address
    /** Overrides the verifier's default auth-payload length, or (alone) prices a bare filler blob of this length. */
    senderAuthSize?: number
    /**
     * Acting actor id. Names the actor the node resolves for simulation so
     * policy-gated session keys and owner authorization bundles price
     * correctly instead of falling back to the account's self actor.
     */
    senderActorId?: Hex
    // Common
    payer?: Address
    /** Raw `payerAuth` blob, priced verbatim. Takes priority over `payerAuthAuthenticator`. */
    payerAuth?: Hex
    /** Payer authenticator address hint. */
    payerAuthAuthenticator?: Address
    /** Payer auth-payload byte length override. See `senderAuthSize`. */
    payerAuthSize?: number
    dataSuffix?: Hex
    blockNumber?: bigint
    blockTag?: string
  },
): Promise<bigint>

export type ReceiptFields = {
  payer?: Address
  phaseStatuses?: readonly Hex[]
  metadata?: Hex
}
/** @deprecated alias of {@link ReceiptFields}. */
export type Eip8130ReceiptFields = ReceiptFields
/** Parse the EIP-8130 fields off a raw JSON-RPC receipt (graceful if absent). */
export function parseReceiptFields(receipt: any): ReceiptFields
/** Returns `true` when every reported call phase succeeded. */
export function allPhasesSucceeded(fields: {
  phaseStatuses?: readonly Hex[]
}): boolean
/** Fetch a receipt and surface the EIP-8130 AA fields under `.eip8130`. */
export function getTransactionReceipt(
  client: Client,
  parameters: { hash: Hex },
): Promise<(Record<string, any> & { eip8130: ReceiptFields }) | null>

/**
 * Poll `eth_getTransactionReceipt` until an EIP-8130 tx is mined.
 * Skips replacement-detection (which breaks on 2D nonces) and surfaces the
 * EIP-8130 fields under `.eip8130`.
 */
export function waitForTransactionReceipt(
  client: Client,
  parameters: {
    hash: Hex
    pollingInterval?: number
    timeout?: number
    /** Upper validity bound (unix ms) to stop polling an expired nonce-free tx. */
    validBefore?: bigint
  },
): Promise<Record<string, any> & { eip8130: ReceiptFields }>

/** Fetch an EIP-8130 transaction by hash with strong typing. */
export type Transaction = {
  type: '0x79'
  hash: Hex
  from: Address
  chainId: number
  nonceKey: Hex
  nonceSequence: number
  /** Lower validity bound (unix ms). `0` = none. */
  validAfter: bigint
  /** Upper validity bound (unix ms). `0` = none. */
  validBefore: bigint
  maxFeePerGas: bigint
  maxPriorityFeePerGas: bigint
  gas: bigint
  calls: readonly (readonly any[])[]
  accountChanges: readonly any[]
  metadata: Hex
  payer: Address | null
  senderAuth: Hex
  payerAuth: Hex
  gasPrice: bigint | null
  blockHash: Hex | null
  blockNumber: bigint | null
  transactionIndex: number | null
}
/** @deprecated alias of {@link Transaction}. */
export type Transaction8130 = Transaction
export function getTransaction(
  client: Client,
  parameters: { hash: Hex },
): Promise<Transaction>

// --- Actor policies (EIP-8130 restricted actors) ---------------------------
export type PolicyBinding = {
  account: Address
  policy: Address
  policyConfig: Hex
  validAfter: bigint
  validUntil: bigint
  salt: bigint
}
export type SessionPolicy = {
  manager: Address
  policy: Address
  binding: PolicyBinding
  commitment: Hex
  actorPolicy: Policy
  /** Wraps an action as `PolicyManager.execute` (session key dispatches as the account). */
  executeCall(executionData: Hex | SessionPolicyAction): AaCall
  /** Wraps an action as `PolicyManager.executeFor` (external pull actor drives the account). */
  executeForCall(executionData: Hex | SessionPolicyAction): AaCall
}
export function commitmentOf(binding: PolicyBinding): Hex
export function defineSessionPolicy(parameters: {
  account: Address
  policyConfig: Hex
  policy?: Address
  manager?: Address
  validAfter?: bigint
  validUntil?: bigint
  salt?: bigint
  policyType?: number
}): SessionPolicy

export type SessionPolicyTokenLimit = {
  token: Address
  limit: bigint
  period?: bigint
}
export type SessionPolicySelectorRule = {
  selector: Hex
  recipients?: readonly Address[]
}
export type SessionPolicyCallScope = {
  target: Address
  selectorRules?: readonly SessionPolicySelectorRule[]
}
export type SessionPolicyConfig = {
  tokenLimits?: readonly SessionPolicyTokenLimit[]
  callScopes?: readonly SessionPolicyCallScope[]
}
export type SessionPolicyAction = {
  target: Address
  value?: bigint
  data?: Hex
}
export const sessionPolicyAddress: Address
export function encodeSessionPolicyConfig(config: SessionPolicyConfig): Hex
export function encodeSessionPolicyAction(action: SessionPolicyAction): Hex
export const policyManagerAbi: readonly unknown[]
export const sessionPolicyAbi: readonly unknown[]

// ---------------------------------------------------------------------------
// ERC-7715 grants / ERC-7895 sub-accounts / ERC-5792 capabilities (high level)
// ---------------------------------------------------------------------------

/** ERC-7715 policy attached to a requested permission. */
export type GrantedPolicy =
  | { type: 'token-allowance'; data: { allowance: bigint } }
  | { type: 'gas-limit'; data: { limit: bigint } }
  | { type: 'rate-limit'; data: { count: number; interval: number } }
  | { type: string; data?: unknown }
/** ERC-7715 permission requested by a dApp. */
export type Permission = {
  type:
    | 'native-token-transfer'
    | 'erc20-token-transfer'
    | 'contract-call'
    | string
  data?: any
  policies?: readonly GrantedPolicy[]
}

export type GrantRole = 'session' | 'pull'

export function toSessionPolicyConfig(
  permissions: readonly Permission[],
): SessionPolicyConfig

export function toSessionPolicy(parameters: {
  account: Address
  permissions: readonly Permission[]
  expiry?: number | bigint
  policy?: Address
  manager?: Address
  validAfter?: bigint
  salt?: bigint
}): SessionPolicy

export type FulfillGrantPermissionsParameters = {
  account: Address
  grantee: Address
  permissions: readonly Permission[]
  role?: GrantRole
  expiry?: number | bigint
  assumeManagerRegistered?: boolean
  policy?: Address
  manager?: Address
  validAfter?: bigint
  salt?: bigint
}
export type FulfillGrantPermissionsReturnType = {
  actor: AaActor
  change: AaAuthorizeActor
  managerChange?: AaAuthorizeActor
  changes: readonly AaChange[]
  session: SessionPolicy
  /** Opaque, self-describing ERC-7715 permissionsContext for this grant. */
  permissionsContext: Hex
}
export function fulfillGrantPermissions(
  client: Client,
  parameters: FulfillGrantPermissionsParameters,
): Promise<FulfillGrantPermissionsReturnType>

export type ParsePermissionsContextReturnType = {
  account: Address
  role: GrantRole
  actor: AaActor
  session: SessionPolicy
}
export function toPermissionsContext(parameters: {
  role: GrantRole
  actor: AaActor
  session: SessionPolicy
}): Hex
export function parsePermissionsContext(
  context: Hex,
): ParsePermissionsContextReturnType
export type RoutePermissionedCallsReturnType =
  ParsePermissionsContextReturnType & { calls: readonly AaCall[] }
export function routePermissionedCalls(parameters: {
  context: Hex
  calls: readonly SessionPolicyAction[]
}): RoutePermissionedCallsReturnType

export type SubAccountKey = {
  publicKey: Hex | { x: Hex; y: Hex }
  type: 'address' | 'p256' | 'webauthn-p256' | 'secp256k1'
}
export type FulfillAddSubAccountParameters = {
  parent: Address
  signer: Signer
  keys?: readonly SubAccountKey[]
  keyScope?: number
  keyPolicy?: Policy
  proxy?: 'erc1167' | 'upgradeable'
  implementation?: Address
  salt?: Hex
  code?: Hex
}
export type FulfillAddSubAccountReturnType = ToAccountReturnType & {
  createChange: AaAccountChangeCreate
  parentActor: AaActor
  initialActors: readonly AaActor[]
  response: { address: Address }
}
export function fulfillAddSubAccount(
  parameters: FulfillAddSubAccountParameters,
): FulfillAddSubAccountReturnType

export type Eip8130Capabilities = Record<string, unknown>
export function eip8130Capabilities(parameters?: {
  paymasterService?: boolean
  signerTypes?: readonly string[]
  permissionTypes?: readonly string[]
  policyTypes?: readonly string[]
  subAccountKeyTypes?: readonly string[]
}): Eip8130Capabilities
export function eip8130CapabilitiesByChain(
  chainIds: readonly number[],
  parameters?: Parameters<typeof eip8130Capabilities>[0],
): Record<Hex, Eip8130Capabilities>

export function erc1167Bytecode(implementation: Address): Hex
export function upgradeableProxyBytecode(implementation: Address): Hex

export function computeAddress(parameters: {
  userSalt: Hex
  code: Hex
  initialActors: readonly AaActor[]
}): Address
/** The 32-byte deployment header committed into the CREATE2 salt. */
export function deploymentHeader(parameters: {
  code: Hex
  initialActors: readonly AaActor[]
}): Hex

export type ChangeOptions = {
  channel?: AaChangeChannel
  chainId?: number
  sequence?: bigint
}
export type ToAccountReturnType = {
  readonly address: Address
  readonly signer: Signer
  readonly initialActors: readonly AaActor[]
  readonly scope?: number
  readonly actorId?: Hex
  create(): AaAccountChangeCreate
  /** Signs a `SignedAccountChanges` batch into a `config` entry. */
  change(
    changes: readonly AaChange[],
    options?: ChangeOptions,
  ): Promise<AaAccountChangeConfig>
  delegate(target: Address): AaAccountChangeDelegation
  signTransaction(transaction: any, options?: any): Promise<Hex>
}
/** @deprecated alias of {@link ToAccountReturnType}. */
export type To8130AccountReturnType = ToAccountReturnType
/**
 * Two shapes:
 * - Smart account: supply userSalt + code + initialActors (address derived via CREATE2)
 * - Delegated EOA: supply address only (no salt/code/actors; use delegate(impl) in first tx)
 */
export function toAccount(parameters: (
  | {
      signer: Signer
      userSalt: Hex
      code: Hex
      initialActors: readonly AaActor[]
      authenticator?: Address
      scope?: number
      actorId?: Hex
      address?: Address
    }
  | {
      signer: Signer
      address: Address
      authenticator?: Address
      scope?: number
      actorId?: Hex
      userSalt?: undefined
      code?: undefined
      initialActors?: undefined
    }
)): ToAccountReturnType

export type NewSmartAccountReturnType = ToAccountReturnType & {
  /** The `create` account-change — include in `accountChanges` for the first tx. */
  readonly createChange: AaAccountChangeCreate
}

/**
 * Creates a new EIP-8130 smart account from a signer. Automatically derives the
 * actor, bytecode, and counterfactual address. Include `account.createChange` in
 * the first transaction's `accountChanges` to deploy the account.
 *
 * Supports K1 (secp256k1), P-256, and WebAuthn signers (detected automatically).
 */
export function newSmartAccount(parameters: {
  signer: Signer & { publicKey?: Hex | { x: Hex; y: Hex } }
  salt?: Hex
  /** @default 'upgradeable' — requires an `implementation` until one is enshrined. */
  proxy?: 'erc1167' | 'upgradeable'
  implementation?: Address
  code?: Hex
  admins?: readonly AaActor[]
  extraActors?: readonly AaActor[]
}): NewSmartAccountReturnType

/**
 * Wraps a parent ADMIN signer into a `Signer` that authenticates a sub-account
 * through the DelegateAuthenticator (one hop). Its `sign` returns the delegate
 * `data` payload (`delegate(20) || nestedAuthenticator(20) || nestedSignature`),
 * so `to8130Account`'s configured-actor path serializes the full delegate
 * `senderAuth` (`DELEGATE_AUTHENTICATOR || data`) automatically. Pass the result
 * as `signer` (and its `authenticator`) to `to8130Account` for an account whose
 * only owner is `key.delegate(parent)`. The parent must be deployed.
 */
export function toDelegateSigner(parameters: {
  delegateAccount: Address
  nestedSigner: Signer
  nestedAuthenticator?: Address
  authenticator?: Address
}): Signer & { authenticator: Address }

/**
 * Byte length of a delegate `senderAuth`/`auth` blob for a given nested-auth
 * payload length (default 65-byte K1 sig). Use as `senderAuthSize` when
 * estimating gas for a delegate-signed tx (the delegate authenticator has no
 * fixed default length). Layout: DELEGATE(20) || delegate(20) || nested(20) || data.
 */
export function delegateAuthSize(nestedDataLength?: number): number

/**
 * Wraps a secp256k1 EOA for EIP-8130 transactions using the implicit self-actor
 * path. `senderAuth` is a raw 65-byte ECDSA sig (no authenticator prefix); the
 * node recovers the sender via ecrecover. Use when the EOA address IS the account
 * and no smart-contract deployment is needed.
 */
export function toEoaAccount(signer: Signer, parameters?: { scope?: number }): {
  readonly address: Address
  readonly signer: Signer
  readonly scope?: number
  /** EIP-7702 delegation change — include in first tx's accountChanges. */
  delegate(target: Address): AaAccountChangeDelegation
  /** Sign a `SignedAccountChanges` batch (e.g. add P256 key alongside K1). */
  change(
    changes: readonly AaChange[],
    options?: ChangeOptions,
  ): Promise<AaAccountChangeConfig>
  /** Raw 65-byte K1 sig — no authenticator prefix, no `from` field. */
  signTransaction(
    transaction: TransactionSerializable8130,
    options?: { payer?: { account: Signer; address?: Address } },
  ): Promise<Hex>
}

export type TransactionSerializable8130 = {
  chainId: number
  from?: Address
  nonceKey?: bigint
  nonceSequence?: bigint
  /** Lower validity bound (unix MILLISECONDS). `0`/omitted = none. */
  validAfter?: bigint
  /** Upper validity bound (unix MILLISECONDS). Required non-zero in nonce-free mode. */
  validBefore?: bigint
  maxPriorityFeePerGas?: bigint
  maxFeePerGas?: bigint
  gas?: bigint
  accountChanges?: readonly AaAccountChange[]
  calls?: readonly (readonly AaCall[])[]
  metadata?: Hex
  payer?: Address
  senderAuth?: Hex
  payerAuth?: Hex
}

export function parseTransaction(serialized: Hex): TransactionSerializable8130

export function serializeTransaction(
  transaction: TransactionSerializable8130,
): Hex
/** Serialize just the ordered call phases (wire form). */
export function toCallsList(calls: AaCalls): readonly any[]
/** Serialize the account-change entries (wire form). */
export function toAccountChangesList(
  changes: readonly AaAccountChange[],
): readonly any[]
/** Build the RLP transaction body array. */
export function toTransactionBody(transaction: TransactionSerializable8130): readonly any[]

/** Sender signature hash — fields through `payer`. */
export function getSenderSignatureHash(
  transaction: TransactionSerializable8130 & { to?: "hex" | "bytes" },
): Hex

/**
 * Resolves the sender (`from`) of an EIP-8130 tx. Returns `transaction.from`
 * when set; otherwise (EOA path) recovers it via ecrecover over the sender hash.
 */
export function recoverSenderAddress(parameters: {
  transaction: TransactionSerializable8130;
}): Promise<Address>

/** Payer signature hash — fields through `calls`/`metadata`, excluding `payer`. */
export function getPayerSignatureHash(
  transaction: TransactionSerializable8130 & { to?: "hex" | "bytes" },
): Hex

export function encodeWalletCalls(parameters: {
  account: Address
  calls: readonly (readonly AaCall[])[]
  encodeExecute?: (parameters: {
    account: Address
    calls: readonly { to: Address; data: Hex; value: bigint }[]
  }) => AaCall
}): readonly (readonly AaCall[])[]

export type SendCallsParameters = {
  account: ToAccountReturnType
  calls: readonly AaCall[] | readonly (readonly AaCall[])[]
  accountChanges?: readonly AaAccountChange[]
  payer?: { account: Signer; address?: Address }
  gas: bigint
  nonceKey?: bigint
  nonceSequence?: bigint
  /** Lower validity bound (unix ms; 0/omitted = none). */
  validAfter?: bigint
  /** Upper validity bound (unix ms; required non-zero in nonce-free mode). */
  validBefore?: bigint
  dataSuffix?: Hex
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
  encodeExecute?: (parameters: any) => AaCall
  /** Fires with the fully-resolved tx just before signing (thread `validBefore`). */
  onTransaction?: (transaction: TransactionSerializable8130) => void
}
export function sendCalls(
  client: Client,
  parameters: SendCallsParameters,
): Promise<Hex>
/** Builds a fully-populated transaction body (nonce, fees, validBefore) without sending. */
export function prepareTransaction(
  client: Client,
  parameters: Omit<SendCallsParameters, 'calls' | 'encodeExecute' | 'onTransaction'> & {
    calls: readonly (readonly AaCall[])[]
  },
): Promise<TransactionSerializable8130>

export function toSmartAccount(parameters: {
  owner: Address | LocalAccount
  client: Client
  authenticator?: Address
  sign?: (hash: Hex) => Promise<Hex>
  stubData?: Hex
  userSalt?: Hex
  initialActors?: readonly AaActor[]
  implementation?: Address
  code?: Hex
  address?: Address
  [key: string]: any
}): Promise<any>

// --- Account-change signing / encoding -------------------------------------

/** 32-byte actor id derived from an address (`bytes32(bytes20(address))`). */
export function actorIdFromAddress(address: Address): Hex
/** 32-byte actor id derived from a public key (`{ x, y }` or 64-byte hex). */
export function actorIdFromPublicKey(publicKey: { x: Hex; y: Hex } | Hex): Hex

export const accountChangeTypehash: Hex
export const signedAccountChangesTypehash: Hex
export const signedActorChangesMagic: Hex

/** Digest an admin actor signs to authorize a `SignedAccountChanges` batch. */
export function hashAccountChanges(parameters: {
  account: Address
  channel?: AaChangeChannel
  chainId?: number
  sequence?: bigint
  changes: readonly AaChange[]
}): Hex

/** Signs a `SignedAccountChanges` batch into an `AaAccountChangeConfig` entry. */
export function signAccountChanges(parameters: {
  signer: Signer
  account: Address
  channel?: AaChangeChannel
  chainId?: number
  sequence?: bigint
  changes: readonly AaChange[]
  authenticator?: Address
}): Promise<AaAccountChangeConfig>

/** ABI-encodes a single change op's payload (by `changeType`). */
export function encodeChangePayload(change: AaChange): Hex
/** Decodes an `authorizeActor` payload back into its fields. */
export function decodeAuthorizeActorPayload(payload: Hex): {
  actorId: Hex
  authenticator: Address
  expiry: bigint
  scope: number
  policyData: Hex
}
/** `authenticator || data` wire form for a signed change set. */
export function encodeSignedActorChangesSignature(parameters: any): Hex

/** Calldata for `AccountConfiguration.createAccount(...)`. */
export function encodeCreateAccountData(parameters: {
  userSalt: Hex
  code: Hex
  initialActors: readonly AaActor[]
}): Hex
/** Calldata for `AccountConfiguration.applySignedAccountChanges(...)`. */
export function encodeApplySignedAccountChangesData(
  parameters: { account: Address } & Omit<AaAccountChangeConfig, 'type'>,
): Hex
/** ERC-4337 factory args (`factory`, `factoryData`) for a create entry. */
export function toFactoryArgs(parameters: {
  userSalt: Hex
  code: Hex
  initialActors: readonly AaActor[]
}): { factory: Address; factoryData: Hex }

export type Eip8130Deployment = {
  accounts: {
    upgradeable?: Address
    default: Address
    defaultHighRate: Address
    erc4337?: Address
  }
  authenticators: {
    k1: Address
    p256: Address
    webAuthn: Address
    delegate: Address
    alwaysValid: Address
  }
  policies?: {
    manager: Address
    sessionPolicy: Address
  }
}
export const canonicalEip8130Deployment: Eip8130Deployment & {
  policies: { manager: Address; sessionPolicy: Address }
}
export const baseSepoliaDeployment: Eip8130Deployment & {
  policies: { manager: Address; sessionPolicy: Address }
}
export const vibenetDevnetDeployment: Eip8130Deployment & {
  policies: { manager: Address; sessionPolicy: Address }
}
export const eip8130Deployments: Record<number, Eip8130Deployment>
export function getEip8130Deployment(chainId: number): Eip8130Deployment | undefined

export const eip8130ChainIds: Set<number>
export function register8130Chains(...chainIds: number[]): void
export function is8130Enabled(chain: number | { id: number }, parameters?: { chainIds?: Iterable<number> }): boolean

export function toP256Signer(parameters: {
  privateKey: Hex
  authenticator?: Address
  address?: Address
}): Signer & { publicKey: { x: Hex; y: Hex } }

export type WebAuthnSignSource = {
  publicKey: Hex | { x: Hex; y: Hex }
  sign: (parameters: { hash: Hex }) => Promise<{
    signature: Hex
    webauthn: {
      authenticatorData: Hex
      clientDataJSON: string
      challengeIndex: number
      typeIndex: number
    }
  }>
}
export function toWebAuthnSigner(
  source: WebAuthnSignSource,
  parameters?: { authenticator?: Address; address?: Address },
): Signer & { publicKey: { x: Hex; y: Hex } }

// ---------------------------------------------------------------------------
// ERC-8168 (payer / sponsorship)
// ---------------------------------------------------------------------------

export type PayerClient = {
  getTerms(parameters: any): Promise<any>
  sendTransaction(parameters: any): Promise<any>
  signTransaction(parameters: any): Promise<any>
  getSponsorshipBalance(parameters: any): Promise<any>
}
export function createPayerClient(parameters: { url?: string; transport?: any }): PayerClient
export function sendSponsoredCalls(client: Client, parameters: any): Promise<any>
export function buildSponsoredCalls(parameters: any): any
export function selectPaymentOption(terms: any, parameters?: any): any
export function isTokenOffer(option: any): boolean
export function isSponsoredOffer(option: any): boolean
export function isDeclinedOffer(option: any): boolean
export function isSelectableOffer(option: any): boolean
export function encodeTokenTransfer(parameters: { token: Address; to: Address; amount: bigint }): any

export type PayerRequote = {
  token: Address
  paymentAmount: Hex
  feeRecipient?: Address
  rate?: { numerator: Hex; denominator: Hex }
  ttl?: number
}
export type PayerRejectedData = {
  code: string
  reason?: string
  balance?: any
  gas?: { estimatedCost: Hex; maxCost: Hex }
  minGasLimit?: Hex
  requote?: PayerRequote
}
/** Extracts the `PAYER_REJECTED` `data` payload from a thrown payer error (or `undefined`). */
export function parsePayerError(error: unknown): PayerRejectedData | undefined
export const payerErrorCode: Record<string, string>
export const payerRejectedCode: -32000
export const sponsorshipDeclineCode: Record<string, string>
