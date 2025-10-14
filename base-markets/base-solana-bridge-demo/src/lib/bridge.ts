import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { SOLANA_DEVNET_CONFIG, BASE_SEPOLIA_CONFIG, BRIDGE_CONFIG } from './constants';

export interface BridgeTransfer {
  amount: number;
  destinationAddress: string;
  tokenAddress: string;
  txHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
}

export class SolanaBridge {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(SOLANA_DEVNET_CONFIG.rpcUrl, 'confirmed');
  }

  /**
   * Get the balance of a specific SPL token for a wallet
   */
  async getTokenBalance(walletAddress: PublicKey, tokenMint: PublicKey): Promise<number> {
    try {
      const tokenAccount = await getAssociatedTokenAddress(tokenMint, walletAddress);
      const account = await getAccount(this.connection, tokenAccount);
      return Number(account.amount) / Math.pow(10, 6); // USDC has 6 decimals
    } catch (error) {
      console.log('Token account not found or error getting balance:', error);
      return 0;
    }
  }

  /**
   * Get SOL balance for a wallet
   */
  async getSolBalance(walletAddress: PublicKey): Promise<number> {
    try {
      const balance = await this.connection.getBalance(walletAddress);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Error getting SOL balance:', error);
      return 0;
    }
  }

  /**
   * Request faucet tokens (uses mock faucet service)
   */
  async requestFaucetTokens(
    walletAddress: PublicKey,
    amount: number = 100
  ): Promise<string> {
    // Import the faucet service dynamically to avoid circular imports
    const { faucetService } = await import('./faucet');
    
    // Check eligibility first
    const eligibility = await faucetService.checkEligibility(walletAddress);
    if (!eligibility.eligible) {
      throw new Error(eligibility.reason || 'Not eligible for faucet tokens');
    }

    // Request tokens from faucet service
    const txHash = await faucetService.requestTokens(walletAddress, amount);
    return txHash;
  }

  /**
   * Create a bridge transaction from Solana to Base
   */
  async createBridgeTransaction(
    walletAddress: PublicKey,
    amount: number,
    destinationAddress: string,
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  ): Promise<string> {
    // Import address resolver and real bridge
    const { addressResolver } = await import('./addressResolver');
    const { realBridgeImplementation } = await import('./realBridgeImplementation');
    
    // Resolve destination address (handles ENS/basename)
    console.log(`Resolving destination address: ${destinationAddress}`);
    const resolvedAddress = await addressResolver.resolveAddress(destinationAddress);
    console.log(`Resolved to: ${resolvedAddress}`);

    // Validate amount
    if (amount < BRIDGE_CONFIG.minBridgeAmount / Math.pow(10, 9)) {
      throw new Error(`Minimum bridge amount is ${BRIDGE_CONFIG.minBridgeAmount / Math.pow(10, 9)} SOL`);
    }

    console.log(`Creating real bridge transaction: ${amount} SOL to ${resolvedAddress}`);

    // Create the real bridge transaction
    const transaction = await realBridgeImplementation.createBridgeTransaction(
      walletAddress,
      amount,
      resolvedAddress
    );

    // Submit the transaction
    const signature = await realBridgeImplementation.submitBridgeTransaction(
      transaction,
      walletAddress,
      signTransaction
    );

    console.log(`REAL bridge transaction submitted: ${signature}`);
    
    // **HANDOFF BUNDLE** for Base team debugging
    console.info("=== HANDOFF BUNDLE FOR BASE TEAM ===");
    console.info("Environment: devnet-prod");
    console.info("Solana tx:", signature);
    console.info("Expected Base registration event should contain OutgoingMessage PDA");
    console.info("If no Base event with this PDA, likely indexer/registry issue");
    console.info("===================================");
    
    return signature;
  }

  /**
   * Generate a mock transaction signature for demonstration
   * Makes it clear this is a simulation
   */
  private generateMockTxHash(): string {
    // Generate a realistic-looking base58 signature but prefix with "MOCK_" to make it clear
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = 'MOCK_BRIDGE_';
    for (let i = 0; i < 75; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Validate if an address is a valid Ethereum/Base address or ENS name
   */
  private isValidBaseAddress(address: string): boolean {
    // Check if it's a valid Ethereum address (42 characters starting with 0x)
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    
    // Check if it's a potential ENS name (ends with .eth or .base)
    const ensRegex = /^.+\.(eth|base)$/;
    
    return ethAddressRegex.test(address) || ensRegex.test(address);
  }

  /**
   * Get recent bridge transactions for a wallet
   */
  async getBridgeHistory(walletAddress: PublicKey): Promise<BridgeTransfer[]> {
    // This would query the bridge program's transaction history
    // For now, return empty array as placeholder
    return [];
  }

  /**
   * Estimate bridge fees
   */
  async estimateBridgeFee(amount: number): Promise<{ baseFee: number; gasFee: number; total: number }> {
    // This would calculate actual bridge fees based on current gas prices and bridge configuration
    const baseFee = 0.001; // 0.001 SOL base fee
    const gasFee = 0.002; // Estimated gas fee for Base transaction
    
    return {
      baseFee,
      gasFee,
      total: baseFee + gasFee
    };
  }
}

export const solanaBridge = new SolanaBridge();
