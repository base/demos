import { PublicKey } from '@solana/web3.js';
import { BRIDGE_PROGRAM_ID, RELAYER_PROGRAM_ID } from './constants';

export function hexTo32(bytesHex: string): Buffer {
  const h = bytesHex.startsWith("0x") ? bytesHex.slice(2) : bytesHex;
  if (h.length !== 64) throw new Error(`salt hex must be 32 bytes (64 hex chars). got ${h.length}`);
  return Buffer.from(h, "hex");
}

export function normalizeSalt(salt: Uint8Array | string): Buffer {
  if (typeof salt === "string") return hexTo32(salt);
  if (salt.length !== 32) throw new Error(`salt must be 32 bytes. got ${salt.length}`);
  return Buffer.from(salt);
}

export function deriveOutgoingMessagePda(salt: Uint8Array | string): PublicKey {
  const s = normalizeSalt(salt);
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("outgoing_message"), s],
    new PublicKey(BRIDGE_PROGRAM_ID)
  );
  return pda;
}

export function deriveMessageToRelayPda(salt: Uint8Array | string): PublicKey {
  const s = normalizeSalt(salt);
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("mtr"), s],
    new PublicKey(RELAYER_PROGRAM_ID)
  );
  return pda;
}
