import { createPublicClient, http } from 'viem'
import { base } from 'viem/chains'

const client = createPublicClient({ 
  chain: base, 
  transport: http() 
})

// Nonce store is managed in the API route to avoid client/server mismatch
// This utility is for signature verification only

export async function verifySignature(
  address: string, 
  message: string, 
  signature: string
): Promise<boolean> {
  try {
    // Extract nonce from message
    const nonce = message.match(/at (\w{32})$/)?.[1]
    if (!nonce || !nonces.delete(nonce)) {
      console.error('Invalid or reused nonce')
      return false
    }

    // Verify signature
    const valid = await client.verifyMessage({ 
      address: address as `0x${string}`, 
      message, 
      signature: signature as `0x${string}` 
    })
    
    return valid
  } catch (error) {
    console.error('Signature verification failed:', error)
    return false
  }
}