import type { Account, Chain, Client, PublicActions, RpcSchema, Transport, WalletActions } from 'viem';
/**
 * Retrieves and returns an action from the client (if exists), and falls
 * back to the tree-shakable action.
 *
 * Useful for extracting overridden actions from a client (ie. if a consumer
 * wants to override the `sendTransaction` implementation).
 */
export declare function getAction<transport extends Transport, chain extends Chain | undefined, account extends Account | undefined, rpcSchema extends RpcSchema | undefined, extended extends {
    [key: string]: unknown;
}, client extends Client<transport, chain, account, rpcSchema, extended>, parameters, returnType>(client: client, actionFn: (_: any, parameters: parameters) => returnType, name: keyof PublicActions | keyof WalletActions): (parameters: parameters) => returnType;
//# sourceMappingURL=getAction.d.ts.map