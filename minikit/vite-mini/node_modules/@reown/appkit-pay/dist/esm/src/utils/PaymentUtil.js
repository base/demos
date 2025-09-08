import { ConstantsUtil, ContractUtil } from '@reown/appkit-common';
import { ChainController, ConnectionController, CoreHelperUtil } from '@reown/appkit-controllers';
import { AppKitPayError } from '../types/errors.js';
import { AppKitPayErrorCodes } from '../types/errors.js';
export async function ensureCorrectNetwork(options) {
    const { paymentAssetNetwork, activeCaipNetwork, approvedCaipNetworkIds, requestedCaipNetworks } = options;
    const sortedNetworks = CoreHelperUtil.sortRequestedNetworks(approvedCaipNetworkIds, requestedCaipNetworks);
    const assetCaipNetwork = sortedNetworks.find(network => network.caipNetworkId === paymentAssetNetwork);
    if (!assetCaipNetwork) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);
    }
    if (assetCaipNetwork.caipNetworkId === activeCaipNetwork.caipNetworkId) {
        return;
    }
    const isSupportingAllNetworks = ChainController.getNetworkProp('supportsAllNetworks', assetCaipNetwork.chainNamespace);
    const isSwitchAllowed = approvedCaipNetworkIds?.includes(assetCaipNetwork.caipNetworkId) || isSupportingAllNetworks;
    if (!isSwitchAllowed) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);
    }
    try {
        await ChainController.switchActiveNetwork(assetCaipNetwork);
    }
    catch (error) {
        throw new AppKitPayError(AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR, error);
    }
}
export async function processEvmNativePayment(paymentAsset, chainNamespace, params) {
    if (chainNamespace !== ConstantsUtil.CHAIN.EVM) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_CHAIN_NAMESPACE);
    }
    if (!params.fromAddress) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG, 'fromAddress is required for native EVM payments.');
    }
    const amountValue = typeof params.amount === 'string' ? parseFloat(params.amount) : params.amount;
    if (isNaN(amountValue)) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG);
    }
    const decimals = paymentAsset.metadata?.decimals ?? 18;
    const amountBigInt = ConnectionController.parseUnits(amountValue.toString(), decimals);
    if (typeof amountBigInt !== 'bigint') {
        throw new AppKitPayError(AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR);
    }
    const txResponse = await ConnectionController.sendTransaction({
        chainNamespace,
        to: params.recipient,
        address: params.fromAddress,
        value: amountBigInt,
        data: '0x'
    });
    return txResponse ?? undefined;
}
export async function processEvmErc20Payment(paymentAsset, params) {
    if (!params.fromAddress) {
        throw new AppKitPayError(AppKitPayErrorCodes.INVALID_PAYMENT_CONFIG, 'fromAddress is required for ERC20 EVM payments.');
    }
    const tokenAddress = paymentAsset.asset;
    const recipientAddress = params.recipient;
    const decimals = Number(paymentAsset.metadata.decimals);
    const amountBigInt = ConnectionController.parseUnits(params.amount.toString(), decimals);
    if (amountBigInt === undefined) {
        throw new AppKitPayError(AppKitPayErrorCodes.GENERIC_PAYMENT_ERROR);
    }
    const txResponse = await ConnectionController.writeContract({
        fromAddress: params.fromAddress,
        tokenAddress,
        args: [recipientAddress, amountBigInt],
        method: 'transfer',
        abi: ContractUtil.getERC20Abi(tokenAddress),
        chainNamespace: ConstantsUtil.CHAIN.EVM
    });
    return txResponse ?? undefined;
}
//# sourceMappingURL=PaymentUtil.js.map