import { standardErrors } from "../../../core/error/errors.js";
import { getClient } from "../../../store/chain-clients/utils.js";
import { store } from "../../../store/store.js";
import { assertPresence } from "../../../util/assertPresence.js";
import { decodeAbiParameters, encodeFunctionData, numberToHex, toHex, } from "viem";
import { waitForCallsStatus } from "viem/experimental";
import { abi } from "../utils/constants.js";
import { findOwnerIndex } from "../utils/findOwnerIndex.js";
import { presentAddOwnerDialog } from "./presentAddOwnerDialog.js";
export async function handleAddSubAccountOwner({ ownerAccount, globalAccountRequest, }) {
    var _a, _b;
    const account = store.account.get();
    const subAccount = store.subAccounts.get();
    const globalAccount = (_a = account.accounts) === null || _a === void 0 ? void 0 : _a.find((account) => account.toLowerCase() !== (subAccount === null || subAccount === void 0 ? void 0 : subAccount.address.toLowerCase()));
    assertPresence(globalAccount, standardErrors.provider.unauthorized("no global account"));
    assertPresence((_b = account.chain) === null || _b === void 0 ? void 0 : _b.id, standardErrors.provider.unauthorized("no chain id"));
    assertPresence(subAccount === null || subAccount === void 0 ? void 0 : subAccount.address, standardErrors.provider.unauthorized("no sub account"));
    const calls = [];
    if (ownerAccount.type === "local" && ownerAccount.address) {
        calls.push({
            to: subAccount.address,
            data: encodeFunctionData({
                abi,
                functionName: "addOwnerAddress",
                args: [ownerAccount.address],
            }),
            value: toHex(0),
        });
    }
    if (ownerAccount.publicKey) {
        const [x, y] = decodeAbiParameters([{ type: "bytes32" }, { type: "bytes32" }], ownerAccount.publicKey);
        calls.push({
            to: subAccount.address,
            data: encodeFunctionData({
                abi,
                functionName: "addOwnerPublicKey",
                args: [x, y],
            }),
            value: toHex(0),
        });
    }
    const request = {
        method: "wallet_sendCalls",
        params: [
            {
                version: "1",
                calls,
                chainId: numberToHex(84532),
                from: globalAccount,
            },
        ],
    };
    const selection = await presentAddOwnerDialog();
    if (selection === "cancel") {
        throw standardErrors.provider.unauthorized("user cancelled");
    }
    const callsId = (await globalAccountRequest(request));
    const client = getClient(account.chain.id);
    assertPresence(client, standardErrors.rpc.internal(`client not found for chainId ${account.chain.id}`));
    const callsResult = await waitForCallsStatus(client, {
        id: callsId,
    });
    if (callsResult.status !== 'success') {
        throw standardErrors.rpc.internal("add owner call failed");
    }
    const ownerIndex = await findOwnerIndex({
        address: subAccount.address,
        publicKey: ownerAccount.type === "local" && ownerAccount.address
            ? ownerAccount.address
            : ownerAccount.publicKey,
        client,
    });
    if (ownerIndex === -1) {
        throw standardErrors.rpc.internal("failed to find owner index");
    }
    return ownerIndex;
}
//# sourceMappingURL=handleAddSubAccountOwner.js.map