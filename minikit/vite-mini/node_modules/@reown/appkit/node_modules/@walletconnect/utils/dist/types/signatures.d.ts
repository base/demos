import { AuthTypes } from "@walletconnect/types";
export declare function hashEthereumMessage(message: string): string;
export declare function verifySignature(address: string, reconstructedMessage: string, cacaoSignature: AuthTypes.CacaoSignature, chainId: string, projectId: string, baseRpcUrl?: string): Promise<boolean>;
export declare function isValidEip191Signature(address: string, message: string, signature: string): Promise<boolean>;
export declare function isValidEip1271Signature(address: string, reconstructedMessage: string, signature: string, chainId: string, projectId: string, baseRpcUrl?: string): Promise<boolean>;
export declare function extractSolanaTransactionId(solanaTransaction: string): string;
//# sourceMappingURL=signatures.d.ts.map