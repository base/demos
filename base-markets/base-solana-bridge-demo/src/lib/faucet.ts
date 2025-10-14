import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { SOLANA_DEVNET_CONFIG } from './constants';

/**
 * Mock faucet service for Solana Devnet USDC
 * In a real implementation, this would be a backend service with proper faucet authority
 */
export class MockFaucetService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(SOLANA_DEVNET_CONFIG.rpcUrl, 'confirmed');
  }

  /**
   * Request test USDC tokens from the faucet
   * This is a mock implementation - in reality, you'd call a faucet API
   */
  async requestTokens(walletAddress: PublicKey, amount: number): Promise<string> {
    try {
      // In a real implementation, you would:
      // 1. Call a faucet API endpoint
      // 2. The faucet service would mint tokens to the user's account
      // 3. Return the transaction hash
      
      // For demo purposes, add tokens to mock balance service
      // Mock balance service removed for cleanup
      
      // For now, we'll simulate a successful faucet request
      const mockTxHash = this.generateMockTxHash();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real faucet, you might have rate limiting, captcha, etc.
      console.log(`Mock faucet: Added ${amount} USDC to ${walletAddress.toString()}`);
      
      return mockTxHash;
    } catch (error) {
      console.error('Faucet request failed:', error);
      throw new Error('Faucet request failed. Please try again later.');
    }
  }

  /**
   * Check if a wallet is eligible for faucet tokens
   */
  async checkEligibility(walletAddress: PublicKey): Promise<{ eligible: boolean; reason?: string }> {
    try {
      // Check current token balance
      const tokenBalance = await this.getTokenBalance(walletAddress);
      
      // Mock rate limiting - max 1000 USDC per wallet
      if (tokenBalance >= 1000) {
        return {
          eligible: false,
          reason: 'Maximum faucet limit reached (1000 USDC)'
        };
      }

      // Check SOL balance for transaction fees
      const solBalance = await this.connection.getBalance(walletAddress);
      if (solBalance < 0.001 * 1e9) { // Less than 0.001 SOL
        return {
          eligible: false,
          reason: 'Insufficient SOL for transaction fees. Please get some SOL first.'
        };
      }

      return { eligible: true };
    } catch (error) {
      console.error('Error checking eligibility:', error);
      return {
        eligible: false,
        reason: 'Unable to check eligibility. Please try again.'
      };
    }
  }

  /**
   * Get current token balance for a wallet
   */
  private async getTokenBalance(walletAddress: PublicKey): Promise<number> {
    try {
      const tokenAccount = await getAssociatedTokenAddress(
        SOLANA_DEVNET_CONFIG.spl,
        walletAddress
      );
      const account = await getAccount(this.connection, tokenAccount);
      return Number(account.amount) / Math.pow(10, 6); // Assuming 6 decimals
    } catch (error) {
      // Account doesn't exist or other error
      return 0;
    }
  }

  /**
   * Generate a mock transaction hash for demonstration
   */
  private generateMockTxHash(): string {
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 88; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Get faucet information and limits
   */
  getFaucetInfo() {
    return {
      maxAmount: 250,
      dailyLimit: 1000,
      minInterval: 60 * 60 * 1000, // 1 hour in milliseconds
      supportedTokens: ['USDC'],
      network: 'Solana Devnet'
    };
  }
}

// Singleton instance
export const mockFaucet = new MockFaucetService();

/**
 * Real faucet integration would look something like this:
 */
export class RealFaucetService {
  private apiEndpoint: string;

  constructor(apiEndpoint: string = 'https://faucet.solana.com/api') {
    this.apiEndpoint = apiEndpoint;
  }

  async requestTokens(walletAddress: PublicKey, amount: number): Promise<string> {
    try {
      const response = await fetch(`${this.apiEndpoint}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: walletAddress.toString(),
          amount,
          token: 'USDC'
        }),
      });

      if (!response.ok) {
        throw new Error(`Faucet request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.txHash;
    } catch (error) {
      console.error('Real faucet request failed:', error);
      throw error;
    }
  }
}

// Export the appropriate faucet service
export const faucetService = mockFaucet; // Use mockFaucet for development
