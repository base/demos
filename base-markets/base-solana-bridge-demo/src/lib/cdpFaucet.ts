/**
 * CDP Faucet Service for Base Sepolia USDC
 * Uses the official Coinbase Developer Platform Faucet API
 */
export class CdpFaucetService {
  private cdp: any = null;
  private initialized = false;

  constructor() {
    // CDP client will be initialized lazily when first used
  }

  /**
   * Initialize the CDP client with environment variables
   */
  private async initialize(): Promise<void> {
    if (this.initialized) return;

    // Check if required environment variables are set
    if (!process.env.CDP_API_KEY_ID || !process.env.CDP_API_KEY_SECRET) {
      throw new Error(
        'CDP API credentials not found. Please set CDP_API_KEY_ID and CDP_API_KEY_SECRET in your .env.local file'
      );
    }

    try {
      // Dynamically import CDP SDK only when needed (at runtime)
      const { CdpClient } = await import("@coinbase/cdp-sdk");
      this.cdp = new CdpClient();
      
      await this.cdp.configure({
        apiKeyId: process.env.CDP_API_KEY_ID || '',
        apiKeySecret: process.env.CDP_API_KEY_SECRET || '',
        walletSecret: process.env.CDP_WALLET_SECRET || ''
      });
    } catch (error) {
      console.error('Failed to initialize CDP client:', error);
      throw new Error('CDP client initialization failed. Please check your API credentials.');
    }

    this.initialized = true;
  }

  /**
   * Request SOL from CDP Faucet for Solana Devnet
   * @param address - The Solana address to send SOL to
   * @returns Promise with transaction hash
   */
  async requestSol(address: string): Promise<{ transactionHash: string; amount: number }> {
    try {
      await this.initialize();

      // Validate Solana address format (base58, typically 32-44 characters)
      if (!address.match(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)) {
        throw new Error('Invalid Solana address format');
      }

      console.log(`Requesting SOL from CDP faucet for Solana address: ${address}`);

      // Request SOL from CDP faucet for Solana Devnet
      const faucetResponse = await this.cdp.solana.requestFaucet({
        address: address,
        network: "solana-devnet",
        token: "sol"
      });

      console.log(`CDP Faucet response:`, faucetResponse);

      // Handle the response structure - CDP returns the signature field for Solana
      const txHash = faucetResponse.signature || 
                     faucetResponse.transactionHash || 
                     faucetResponse.txHash || 
                     faucetResponse.transaction_hash ||
                     faucetResponse.hash ||
                     `cdp_faucet_${Date.now()}`;

      console.log(`CDP Faucet successful: ${txHash}`);

      return {
        transactionHash: txHash,
        amount: 0.00125 // CDP faucet gives 0.00125 SOL according to docs
      };

    } catch (error) {
      console.error('CDP Faucet request failed:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
          throw new Error('Faucet rate limit exceeded. Please try again later (24 hour limit).');
        } else if (error.message.includes('invalid address')) {
          throw new Error('Invalid address provided. Please check the address format.');
        } else if (error.message.includes('network')) {
          throw new Error('Network error. Please check your connection and try again.');
        } else if (error.message.includes('credentials')) {
          throw new Error('CDP API credentials not configured. Please check your environment variables.');
        }
        throw new Error(`Faucet request failed: ${error.message}`);
      }
      
      throw new Error('Faucet request failed. Please try again later.');
    }
  }

  /**
   * Check if the CDP faucet service is properly configured
   */
  async isConfigured(): Promise<boolean> {
    try {
      await this.initialize();
      return true;
    } catch (error) {
      console.warn('CDP Faucet not configured:', error);
      return false;
    }
  }

  /**
   * Get faucet information
   */
  getFaucetInfo() {
    return {
      network: 'Solana Devnet',
      token: 'SOL',
      amount: 0.00125,
      dailyLimit: '10 claims per 24 hours',
      description: 'Official CDP Faucet for Solana Devnet SOL (Native Token)'
    };
  }
}

// Export singleton instance
export const cdpFaucet = new CdpFaucetService();
