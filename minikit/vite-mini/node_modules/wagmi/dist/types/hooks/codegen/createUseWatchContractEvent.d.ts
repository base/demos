import type { Config, ResolvedRegister, WatchContractEventParameters } from '@wagmi/core';
import type { UnionCompute, UnionExactPartial, UnionStrictOmit } from '@wagmi/core/internal';
import type { Abi, Address, ContractEventName } from 'viem';
import type { ConfigParameter, EnabledParameter } from '../../types/properties.js';
export type CreateUseWatchContractEventParameters<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined = undefined, eventName extends ContractEventName<abi> | undefined = undefined> = {
    abi: abi | Abi | readonly unknown[];
    address?: address | Address | Record<number, Address> | undefined;
    eventName?: eventName | ContractEventName<abi> | undefined;
};
export type CreateUseWatchContractEventReturnType<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined, eventName extends ContractEventName<abi> | undefined, omittedProperties extends 'abi' | 'address' | 'chainId' | 'eventName' = 'abi' | (address extends undefined ? never : 'address') | (address extends Record<number, Address> ? 'chainId' : never) | (eventName extends undefined ? never : 'eventName')> = <name extends eventName extends ContractEventName<abi> ? eventName : ContractEventName<abi>, strict extends boolean | undefined = undefined, config extends Config = ResolvedRegister['config'], chainId extends config['chains'][number]['id'] = config['chains'][number]['id']>(parameters?: UnionCompute<UnionExactPartial<UnionStrictOmit<WatchContractEventParameters<abi, name, strict, config, chainId>, omittedProperties>> & ConfigParameter<config> & EnabledParameter> & (address extends Record<number, Address> ? {
    chainId?: keyof address | undefined;
} : unknown)) => void;
export declare function createUseWatchContractEvent<const abi extends Abi | readonly unknown[], const address extends Address | Record<number, Address> | undefined = undefined, eventName extends ContractEventName<abi> | undefined = undefined>(props: CreateUseWatchContractEventParameters<abi, address, eventName>): CreateUseWatchContractEventReturnType<abi, address, eventName>;
//# sourceMappingURL=createUseWatchContractEvent.d.ts.map