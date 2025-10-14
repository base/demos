import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  SystemProgram,
} from '@solana/web3.js';
import bs58 from 'bs58';
import { deriveOutgoingMessagePda, deriveMessageToRelayPda, normalizeSalt } from './pdas';
import { SOLANA_DEVNET_CONFIG, BASE_SEPOLIA_CONFIG, DEFAULT_GAS_LIMIT, REMOTE_WSOL_ADDR_HEX } from './constants';

/**
 * Real Bridge Implementation using standard Solana libraries
 * Implements the actual bridge_sol instruction without dependency conflicts
 */
export class RealBridgeImplementation {
  private connection: Connection;
  private bridgeProgramId: PublicKey;
  private baseRelayerProgramId: PublicKey;

  constructor() {
    this.connection = new Connection(SOLANA_DEVNET_CONFIG.rpcUrl, 'confirmed');
    this.bridgeProgramId = SOLANA_DEVNET_CONFIG.solanaBridge;
    this.baseRelayerProgramId = SOLANA_DEVNET_CONFIG.baseRelayerProgram;
  }

  /**
   * Create a real bridge transaction using the actual bridge_sol instruction
   * @param includeRelayPayment - Whether to include pay_for_relay instruction (experimental)
   */
  async createBridgeTransaction(
    walletAddress: PublicKey,
    amount: number,
    destinationAddress: string
  ): Promise<Transaction> {
    const amountLamports = BigInt(Math.floor(amount * LAMPORTS_PER_SOL));

    // Validate SOL balance
    const balance = await this.connection.getBalance(walletAddress);
    if (balance < Number(amountLamports)) {
      throw new Error(`Insufficient SOL balance. You have ${balance / LAMPORTS_PER_SOL} SOL but trying to bridge ${amount} SOL.`);
    }

    console.log(`Creating REAL bridge transaction: ${amount} SOL to ${destinationAddress}`);

    try {
      // Calculate bridge PDA (Program Derived Address)
      const [bridgeAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("bridge")], // BRIDGE_SEED from IDL constants
        this.bridgeProgramId
      );

      // Calculate SOL vault PDA using current WSOL address
      const remoteTokenBytes = this.addressToBytes20(REMOTE_WSOL_ADDR_HEX);
      const [solVaultAddress] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("sol_vault"), // SOL_VAULT_SEED from IDL constants
          remoteTokenBytes
        ],
        this.bridgeProgramId
      );

      // **CRITICAL FIX**: Use SINGLE 32-byte salt for BOTH PDAs (v0.3.0 requirement)
      const salt32 = new Uint8Array(32);
      crypto.getRandomValues(salt32);
      const saltBuffer = normalizeSalt(salt32);
      
      // Derive PDAs using the SAME salt
      const outgoingMessagePda = deriveOutgoingMessagePda(saltBuffer);
      const messageToRelayPda = deriveMessageToRelayPda(saltBuffer);

      // **CRITICAL DIAGNOSTICS**: Show exactly what relayer will see
      console.info("[sol2base] env=devnet-prod");
      console.info("[sol2base] salt32:", "0x" + saltBuffer.toString("hex"));
      console.info("[sol2base] outgoingMessagePDA:", outgoingMessagePda.toBase58());
      console.info("[sol2base] messageToRelayPDA:", messageToRelayPda.toBase58());
      console.info("[sol2base] to:", destinationAddress.toLowerCase());
      console.info("[sol2base] remoteToken:", REMOTE_WSOL_ADDR_HEX);
      console.info("[sol2base] remoteToken20bytes:", "0x" + remoteTokenBytes.toString("hex"));
      console.info("[sol2base] gasLimit:", DEFAULT_GAS_LIMIT.toString());
      console.info("[sol2base] usingExplicitWSOL:", !!process.env.NEXT_PUBLIC_BASE_WSOL);
      
      console.log(`Bridge Program ID: ${this.bridgeProgramId.toString()}`);
      console.log(`Bridge Address: ${bridgeAddress.toString()}`);
      console.log(`SOL Vault: ${solVaultAddress.toString()}`);
      console.log(`Outgoing Message PDA: ${outgoingMessagePda.toString()}`);
      console.log(`Destination: ${destinationAddress}`);
      console.log(`Wrapped SOL: ${REMOTE_WSOL_ADDR_HEX}`);

      // Fetch bridge state for gas fee receiver
      const bridgeAccountInfo = await this.connection.getAccountInfo(bridgeAddress);
      if (!bridgeAccountInfo) {
        throw new Error('Bridge account not found. The bridge may not be initialized on Solana Devnet.');
      }

      const gasFeeReceiver = SOLANA_DEVNET_CONFIG.gasFeeReceiver;
      console.log(`Gas Fee Receiver: ${gasFeeReceiver.toString()} (bridge operator's address)`);

      // Derive relayer config PDA
      const [cfgAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from('config')],
        this.baseRelayerProgramId
      );

      console.log(`Relayer Config PDA: ${cfgAddress.toString()}`);
      console.log(`Message To Relay PDA: ${messageToRelayPda.toString()}`);

      // Build transaction
      const transaction = new Transaction();
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = walletAddress;

      try {
        const cfgAccountInfo = await this.connection.getAccountInfo(cfgAddress);
        if (!cfgAccountInfo) {
          console.log('❌ Relayer config account does not exist:', cfgAddress.toString());
          throw new Error('Base relayer config account not found. Bridge may not be fully initialized.');
        }

        const relayInstruction = this.createPayForRelayInstruction({
          payer: walletAddress,
          cfg: cfgAddress,
          gasFeeReceiver,
          messageToRelay: messageToRelayPda,
          messageToRelaySalt: saltBuffer,
          outgoingMessageSalt: saltBuffer,
          systemProgram: SystemProgram.programId,
          outgoingMessage: outgoingMessagePda,
          gasLimit: DEFAULT_GAS_LIMIT,
        });

        const bridgeInstruction = this.createBridgeSolInstruction({
          payer: walletAddress,
          from: walletAddress,
          gasFeeReceiver,
          solVault: solVaultAddress,
          bridge: bridgeAddress,
          outgoingMessage: outgoingMessagePda,
          outgoingMessageSalt: saltBuffer,
          systemProgram: SystemProgram.programId,
          to: destinationAddress,
          remoteToken: REMOTE_WSOL_ADDR_HEX,
          amount: amountLamports,
        });

        transaction.add(relayInstruction);
        transaction.add(bridgeInstruction);

      } catch (error) {
        console.error('❌ Error with relay payment, falling back to bridge-only:', error);

        const fallbackBridgeInstruction = this.createBridgeSolInstruction({
          payer: walletAddress,
          from: walletAddress,
          gasFeeReceiver,
          solVault: solVaultAddress,
          bridge: bridgeAddress,
          outgoingMessage: outgoingMessagePda,
          outgoingMessageSalt,
          systemProgram: SystemProgram.programId,
          to: destinationAddress,
          remoteToken: BASE_SEPOLIA_CONFIG.wrappedSOL,
          amount: amountLamports,
        });

        transaction.add(fallbackBridgeInstruction);
      }

      return transaction;

    } catch (error) {
      console.error('Error creating bridge transaction:', error);
      throw error;
    }
  }

  /**
   * Create pay_for_relay instruction manually
   */
  private createPayForRelayInstruction({
    payer,
    cfg,
    gasFeeReceiver,
    messageToRelay,
    messageToRelaySalt,
    outgoingMessageSalt,
    systemProgram,
    outgoingMessage,
    gasLimit,
  }: {
    payer: PublicKey;
    cfg: PublicKey;
    gasFeeReceiver: PublicKey;
    messageToRelay: PublicKey;
    messageToRelaySalt: Buffer;
    outgoingMessageSalt: Buffer;
    systemProgram: PublicKey;
    outgoingMessage: PublicKey;
    gasLimit: bigint;
  }): TransactionInstruction {

    // pay_for_relay discriminator
    const discriminator = Buffer.from([41, 191, 218, 201, 250, 164, 156, 55]);

    // Instruction data: discriminator + mtrSalt + outgoingMessage + gasLimit
    const data = Buffer.alloc(8 + 32 + 32 + 8);
    let offset = 0;

    discriminator.copy(data, offset);
    offset += 8;

    messageToRelaySalt.copy(data, offset);
    offset += 32;

    const outgoingMessageBytes = outgoingMessage.toBuffer();
    outgoingMessageBytes.copy(data, offset);
    offset += 32;

    data.writeBigUInt64LE(gasLimit, offset);

    console.log('🔍 PayForRelay instruction data length:', data.length);
    console.log('🔍 PayForRelay discriminator:', Array.from(discriminator));
    console.log('🔍 PayForRelay outgoing message:', outgoingMessage.toString());
    console.log('🔍 PayForRelay gas limit:', gasLimit.toString());

    const keys = [
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: cfg, isSigner: false, isWritable: true },
      { pubkey: gasFeeReceiver, isSigner: false, isWritable: true },
      { pubkey: messageToRelay, isSigner: false, isWritable: true },
      { pubkey: systemProgram, isSigner: false, isWritable: false },
    ];

    console.log('🔍 PayForRelay accounts:');
    console.log('  [0] payer:', payer.toString(), '(signer, writable)');
    console.log('  [1] cfg:', cfg.toString(), '(writable)');
    console.log('  [2] gasFeeReceiver:', gasFeeReceiver.toString(), '(writable) ⚠️ THIS IS THE CRITICAL ONE');
    console.log('  [3] messageToRelay:', messageToRelay.toString(), '(writable)');
    console.log('  [4] systemProgram:', systemProgram.toString(), '(readonly)');

    return new TransactionInstruction({
      keys,
      programId: this.baseRelayerProgramId,
      data,
    });
  }

  /**
   * Create bridge_sol instruction manually using standard Solana libraries
   */
  private createBridgeSolInstruction({
    payer,
    from,
    gasFeeReceiver,
    solVault,
    bridge,
    outgoingMessage,
    outgoingMessageSalt,
    systemProgram,
    to,
    remoteToken,
    amount,
  }: {
    payer: PublicKey;
    from: PublicKey;
    gasFeeReceiver: PublicKey;
    solVault: PublicKey;
    bridge: PublicKey;
    outgoingMessage: PublicKey;
    outgoingMessageSalt: Buffer;
    systemProgram: PublicKey;
    to: string;
    remoteToken: string;
    amount: bigint;
  }): TransactionInstruction {

    const discriminator = Buffer.from([190, 190, 32, 158, 75, 153, 32, 86]);

    const toBytes = this.addressToBytes20(to);
    const remoteTokenBytes = this.addressToBytes20(remoteToken);

    // Instruction data: discriminator + salt + to + remoteToken + amount + call_option
    const data = Buffer.alloc(8 + 32 + 20 + 20 + 8 + 1);
    let offset = 0;

    discriminator.copy(data, offset);
    offset += 8;

    outgoingMessageSalt.copy(data, offset);
    offset += 32;

    toBytes.copy(data, offset);
    offset += 20;

    remoteTokenBytes.copy(data, offset);
    offset += 20;

    data.writeBigUInt64LE(amount, offset);
    offset += 8;

    data.writeUInt8(0, offset);

    const keys = [
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: from, isSigner: false, isWritable: true },
      { pubkey: gasFeeReceiver, isSigner: false, isWritable: true },
      { pubkey: solVault, isSigner: false, isWritable: true },
      { pubkey: bridge, isSigner: false, isWritable: true },
      { pubkey: outgoingMessage, isSigner: false, isWritable: true },
      { pubkey: systemProgram, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
      keys,
      programId: this.bridgeProgramId,
      data,
    });
  }

  /**
   * Convert Ethereum address to 20-byte buffer
   */
  private addressToBytes20(address: string): Buffer {
    try {
      // Remove 0x prefix if present
      const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;

      // Ensure it's exactly 40 hex characters (20 bytes)
      if (cleanAddress.length !== 40) {
        throw new Error(`Invalid Ethereum address length: expected 40 hex chars, got ${cleanAddress.length}`);
      }

      // Validate hex characters
      if (!/^[0-9a-fA-F]{40}$/.test(cleanAddress)) {
        throw new Error(`Invalid Ethereum address format: contains non-hex characters`);
      }

      return Buffer.from(cleanAddress, 'hex');
    } catch (error) {
      console.error(`Error converting address ${address}:`, error);
      throw new Error(`Failed to convert Ethereum address: ${address}`);
    }
  }

  /**
   * Submit bridge transaction
   */
  async submitBridgeTransaction(
    transaction: Transaction,
    walletAddress: PublicKey,
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  ): Promise<string> {
    // Sign the transaction with the user's wallet
    const signedTransaction = await signTransaction(transaction);

    const serialized = signedTransaction.serialize();

    const primarySignature = signedTransaction.signatures[0]?.signature
      ? bs58.encode(signedTransaction.signatures[0].signature as Buffer)
      : undefined;

    let signature: string | undefined;

    try {
      // Send the signed transaction
      signature = await this.connection.sendRawTransaction(serialized, {
        skipPreflight: false,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const isAlreadyProcessed = message.includes('already been processed');

      if (isAlreadyProcessed && primarySignature) {
        console.warn('⚠️ Transaction already processed, reusing existing signature');
        signature = primarySignature;
      } else {
        throw error;
      }
    }

    if (!signature) {
      if (primarySignature) {
        signature = primarySignature;
      } else {
        throw new Error('Unable to determine transaction signature');
      }
    }

    // Confirm transaction
    await this.connection.confirmTransaction(signature, 'confirmed');

    return signature;
  }

}

export const realBridgeImplementation = new RealBridgeImplementation();
