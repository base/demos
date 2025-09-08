import type { Abi, Address, ContractEventName } from 'viem';
import type { Config } from '../../createConfig.js';
import type { UnionCompute, UnionStrictOmit } from '../../types/utils.js';
import { type WatchContractEventParameters, type WatchContractEventReturnType } from '../watchContractEvent.js';
export type CreateWatchContractEventParameters<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined = undefined, eventName extends ContractEventName<abi> | undefined = undefined> = {
    abi: abi | Abi | readonly unknown[];
    address?: address | Address | Record<number, Address> | undefined;
    eventName?: eventName | ContractEventName<abi> | undefined;
};
export type CreateWatchContractEventReturnType<abi extends Abi | readonly unknown[], address extends Address | Record<number, Address> | undefined, eventName extends ContractEventName<abi> | undefined, omittedProperties extends 'abi' | 'address' | 'chainId' | 'eventName' = 'abi' | (address extends undefined ? never : 'address') | (address extends Record<number, Address> ? 'chainId' : never) | (eventName extends undefined ? never : 'eventName')> = <config extends Config, name extends eventName extends ContractEventName<abi> ? eventName : ContractEventName<abi>, strict extends boolean | undefined = undefined, chainId extends config['chains'][number]['id'] = config['chains'][number]['id']>(config: config, parameters: UnionCompute<UnionStrictOmit<WatchContractEventParameters<abi, name, strict, config, chainId>, omittedProperties>> & (address extends Record<number, Address> ? {
    chainId?: keyof address | undefined;
} : unknown)) => WatchContractEventReturnType;
export declare function createWatchContractEvent<const abi extends Abi | readonly unknown[], const address extends Address | Record<number, Address> | undefined = undefined, eventName extends ContractEventName<abi> | undefined = undefined>(c: CreateWatchContractEventParameters<abi, address, eventName>): CreateWatchContractEventReturnType<abi, address, eventName>;
//# sourceMappingURL=createWatchContractEvent.d.ts.map