import { createWalletClient, http, parseAbi, encodeAbiParameters, parseAbiParameters, parseSignature } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { AgentSettings } from './db';

const AGENT_VAULT_ABI = parseAbi([
    'function executeAction(address user, string action, bytes data, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external'
]);

const RPC_URL = process.env.BASE_RPC_URL || 'https://sepolia.base.org';
// Note: In production, use a secure secret manager. For MVP/Demo, env var is okay.
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as `0x${string}`;
const AGENT_VAULT_ADDRESS = process.env.NEXT_PUBLIC_AGENT_VAULT_ADDRESS as `0x${string}`;

export async function executeAgentAction(agent: AgentSettings) {
    if (!PRIVATE_KEY) {
        console.warn("Skipping execution: No DEPLOYER_PRIVATE_KEY");
        return "Skipped (No Key)";
    }
    if (!AGENT_VAULT_ADDRESS) {
        console.warn("Skipping execution: No AGENT_VAULT_ADDRESS");
        return "Skipped (No Vault)";
    }

    if (!agent.delegation) {
        throw new Error("No delegation found");
    }

    const account = privateKeyToAccount(PRIVATE_KEY);
    const client = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(RPC_URL)
    });

    // 1. Determine Action
    let action = "claim";
    let data: `0x${string}` = "0x";

    if (agent.strategy === 'aggressive') {
        action = "raid";
        // Mock target for MVP
        const target = "0x8342A48694A74044116F330db5050a267b28dD85";
        data = encodeAbiParameters(
            parseAbiParameters('address'),
            [target as `0x${string}`]
        );
    }

    // 2. Parse Signature
    const signature = parseSignature(agent.delegation.signature as `0x${string}`);

    // 3. Submit Transaction
    try {
        const hash = await client.writeContract({
            address: AGENT_VAULT_ADDRESS,
            abi: AGENT_VAULT_ABI,
            functionName: 'executeAction',
            args: [
                agent.userAddress as `0x${string}`,
                action,
                data,
                BigInt(agent.delegation.deadline),
                Number(signature.v),
                signature.r,
                signature.s
            ]
        });

        console.log(`Agent executed ${action} for ${agent.userAddress}: ${hash}`);
        return hash;
    } catch (error) {
        console.error(`Execution failed for ${agent.userAddress}:`, error);
        throw error;
    }
}
