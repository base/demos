import {
  requestSpendPermission,
  prepareSpendCallData,
  fetchPermissions,
  getPermissionStatus,
} from '@base-org/account/spend-permission'
import { createBaseAccountSDK } from '@base-org/account'

export interface SpendPermission {
  account: string
  spender: string
  token: string
  chainId: number
  allowance: bigint
  periodInDays: number
  signature?: string
}

export const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'

export async function requestUserSpendPermission(
  userAccount: string,
  spenderAccount: string,
  dailyLimitUSD: number = 0.2
): Promise<SpendPermission> {
  try {
    // Convert USD to USDC (6 decimals)
    const allowanceUSDC = BigInt(dailyLimitUSD * 1_000_000)

    const permission = await requestSpendPermission({
      account: userAccount as `0x${string}`,
      spender: spenderAccount as `0x${string}`,
      token: USDC_BASE_ADDRESS as `0x${string}`,
      chainId: 8453, // Base mainnet
      allowance: allowanceUSDC,
      periodInDays: 1, // Daily limit
      provider: createBaseAccountSDK({
        appName: "Agent Spend Permissions",
      }).getProvider(),
    })

    return {
      account: userAccount,
      spender: spenderAccount,
      token: USDC_BASE_ADDRESS,
      chainId: 8453,
      allowance: allowanceUSDC,
      periodInDays: 1,
      ...permission
    }
  } catch (error) {
    console.error('Failed to request spend permission:', error)
    throw new Error('Failed to request spend permission')
  }
}

export async function getUserSpendPermissions(
  userAccount: string,
  spenderAccount: string
) {
  try {
    const permissions = await fetchPermissions({
      account: userAccount as `0x${string}`,
      chainId: 8453,
      spender: spenderAccount as `0x${string}`,
      provider: createBaseAccountSDK({
        appName: "Agent Spend Permissions",
      }).getProvider(),
    })

    return permissions.filter(p => p.permission?.token === USDC_BASE_ADDRESS)
  } catch (error) {
    console.error('Failed to fetch spend permissions:', error)
    return []
  }
}

export async function checkSpendPermissionStatus(permission: any) {
  try {
    const status = await getPermissionStatus(permission)
    return status
  } catch (error) {
    console.error('Failed to check permission status:', error)
    return { isActive: false, remainingSpend: BigInt(0) }
  }
}

export async function prepareSpendTransaction(
  permission: any,
  amountUSD: number
) {
  try {
    // Convert USD to USDC (6 decimals)
    const amountUSDC = BigInt(Math.floor(amountUSD * 1_000_000))

    const spendCalls = await prepareSpendCallData(permission, amountUSDC)

    return spendCalls
  } catch (error) {
    console.error('Failed to prepare spend transaction:', error)
    throw new Error('Failed to prepare spend transaction')
  }
}