/**********************************************************************
 * Constants
 **********************************************************************/
export declare const factoryAddress = "0xba5ed110efdba3d005bfc882d75358acbbb85842";
export declare const spendPermissionManagerAddress = "0xf85210B21cC50302F477BA56686d2019dC9b67Ad";
export declare const abi: readonly [{
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "bytes";
    }];
    readonly name: "AlreadyOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "Initialized";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "bytes";
    }];
    readonly name: "InvalidEthereumAddressOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "uint256";
    }];
    readonly name: "InvalidNonceKey";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "bytes";
    }];
    readonly name: "InvalidOwnerBytesLength";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "LastOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "index";
        readonly type: "uint256";
    }];
    readonly name: "NoOwnerAtIndex";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "ownersRemaining";
        readonly type: "uint256";
    }];
    readonly name: "NotLastOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "selector";
        readonly type: "bytes4";
    }];
    readonly name: "SelectorNotAllowed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "Unauthorized";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "UnauthorizedCallContext";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "UpgradeFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "index";
        readonly type: "uint256";
    }, {
        readonly name: "expectedOwner";
        readonly type: "bytes";
    }, {
        readonly name: "actualOwner";
        readonly type: "bytes";
    }];
    readonly name: "WrongOwnerAtIndex";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "index";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "owner";
        readonly type: "bytes";
    }];
    readonly name: "AddOwner";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "index";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "owner";
        readonly type: "bytes";
    }];
    readonly name: "RemoveOwner";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "implementation";
        readonly type: "address";
    }];
    readonly name: "Upgraded";
    readonly type: "event";
}, {
    readonly stateMutability: "payable";
    readonly type: "fallback";
}, {
    readonly inputs: readonly [];
    readonly name: "REPLAYABLE_NONCE_KEY";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "addOwnerAddress";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "x";
        readonly type: "bytes32";
    }, {
        readonly name: "y";
        readonly type: "bytes32";
    }];
    readonly name: "addOwnerPublicKey";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "functionSelector";
        readonly type: "bytes4";
    }];
    readonly name: "canSkipChainIdValidation";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "domainSeparator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "eip712Domain";
    readonly outputs: readonly [{
        readonly name: "fields";
        readonly type: "bytes1";
    }, {
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly name: "version";
        readonly type: "string";
    }, {
        readonly name: "chainId";
        readonly type: "uint256";
    }, {
        readonly name: "verifyingContract";
        readonly type: "address";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
    }, {
        readonly name: "extensions";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "entryPoint";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "target";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "target";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "calls";
        readonly type: "tuple[]";
    }];
    readonly name: "executeBatch";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "calls";
        readonly type: "bytes[]";
    }];
    readonly name: "executeWithoutChainIdValidation";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly name: "callGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "verificationGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "userOp";
        readonly type: "tuple";
    }];
    readonly name: "getUserOpHashWithoutChainId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "implementation";
    readonly outputs: readonly [{
        readonly name: "$";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "owners";
        readonly type: "bytes[]";
    }];
    readonly name: "initialize";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "isOwnerAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "bytes";
    }];
    readonly name: "isOwnerBytes";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "x";
        readonly type: "bytes32";
    }, {
        readonly name: "y";
        readonly type: "bytes32";
    }];
    readonly name: "isOwnerPublicKey";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly type: "bytes32";
    }, {
        readonly name: "signature";
        readonly type: "bytes";
    }];
    readonly name: "isValidSignature";
    readonly outputs: readonly [{
        readonly name: "result";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "nextOwnerIndex";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "index";
        readonly type: "uint256";
    }];
    readonly name: "ownerAtIndex";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "ownerCount";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "proxiableUUID";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "index";
        readonly type: "uint256";
    }, {
        readonly name: "owner";
        readonly type: "bytes";
    }];
    readonly name: "removeLastOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "index";
        readonly type: "uint256";
    }, {
        readonly name: "owner";
        readonly type: "bytes";
    }];
    readonly name: "removeOwnerAtIndex";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "removedOwnersCount";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly type: "bytes32";
    }];
    readonly name: "replaySafeHash";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "newImplementation";
        readonly type: "address";
    }, {
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "upgradeToAndCall";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly name: "callGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "verificationGasLimit";
            readonly type: "uint256";
        }, {
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
        }, {
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly name: "userOp";
        readonly type: "tuple";
    }, {
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly name: "missingAccountFunds";
        readonly type: "uint256";
    }];
    readonly name: "validateUserOp";
    readonly outputs: readonly [{
        readonly name: "validationData";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
export declare const factoryAbi: readonly [{
    readonly inputs: readonly [{
        readonly name: "implementation_";
        readonly type: "address";
    }];
    readonly stateMutability: "payable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "OwnerRequired";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly name: "owners";
        readonly type: "bytes[]";
    }, {
        readonly name: "nonce";
        readonly type: "uint256";
    }];
    readonly name: "createAccount";
    readonly outputs: readonly [{
        readonly name: "account";
        readonly type: "address";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly name: "owners";
        readonly type: "bytes[]";
    }, {
        readonly name: "nonce";
        readonly type: "uint256";
    }];
    readonly name: "getAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "implementation";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "initCodeHash";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
export declare const spendPermissionManagerAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "publicERC6492Validator";
        readonly type: "address";
        readonly internalType: "contract PublicERC6492Validator";
    }, {
        readonly name: "magicSpend";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "receive";
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "MAGIC_SPEND";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "NATIVE_TOKEN";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "PERMISSION_DETAILS_TYPEHASH";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "PUBLIC_ERC6492_VALIDATOR";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract PublicERC6492Validator";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "SPEND_PERMISSION_BATCH_TYPEHASH";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "SPEND_PERMISSION_TYPEHASH";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "approve";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "approveBatchWithSignature";
    readonly inputs: readonly [{
        readonly name: "spendPermissionBatch";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermissionBatch";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "permissions";
            readonly type: "tuple[]";
            readonly internalType: "struct SpendPermissionManager.PermissionDetails[]";
            readonly components: readonly [{
                readonly name: "spender";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "token";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "allowance";
                readonly type: "uint160";
                readonly internalType: "uint160";
            }, {
                readonly name: "salt";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "extraData";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
        }];
    }, {
        readonly name: "signature";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "approveWithRevoke";
    readonly inputs: readonly [{
        readonly name: "permissionToApprove";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly name: "permissionToRevoke";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly name: "expectedLastUpdatedPeriod";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.PeriodSpend";
        readonly components: readonly [{
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "spend";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "approveWithSignature";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly name: "signature";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "eip712Domain";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "fields";
        readonly type: "bytes1";
        readonly internalType: "bytes1";
    }, {
        readonly name: "name";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "version";
        readonly type: "string";
        readonly internalType: "string";
    }, {
        readonly name: "chainId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "verifyingContract";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "extensions";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getBatchHash";
    readonly inputs: readonly [{
        readonly name: "spendPermissionBatch";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermissionBatch";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "permissions";
            readonly type: "tuple[]";
            readonly internalType: "struct SpendPermissionManager.PermissionDetails[]";
            readonly components: readonly [{
                readonly name: "spender";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "token";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "allowance";
                readonly type: "uint160";
                readonly internalType: "uint160";
            }, {
                readonly name: "salt";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }, {
                readonly name: "extraData";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }];
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getCurrentPeriod";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.PeriodSpend";
        readonly components: readonly [{
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "spend";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getHash";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getLastUpdatedPeriod";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.PeriodSpend";
        readonly components: readonly [{
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "spend";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isApproved";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isRevoked";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isValid";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "revoke";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "revokeAsSpender";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "spend";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly name: "value";
        readonly type: "uint160";
        readonly internalType: "uint160";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "spendWithWithdraw";
    readonly inputs: readonly [{
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly name: "value";
        readonly type: "uint160";
        readonly internalType: "uint160";
    }, {
        readonly name: "withdrawRequest";
        readonly type: "tuple";
        readonly internalType: "struct MagicSpend.WithdrawRequest";
        readonly components: readonly [{
            readonly name: "signature";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }, {
            readonly name: "asset";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "amount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "nonce";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "expiry";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }];
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "event";
    readonly name: "SpendPermissionApproved";
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly indexed: false;
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SpendPermissionRevoked";
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "spendPermission";
        readonly type: "tuple";
        readonly indexed: false;
        readonly internalType: "struct SpendPermissionManager.SpendPermission";
        readonly components: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "spender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "token";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "allowance";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "period";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "salt";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "extraData";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SpendPermissionUsed";
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "token";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }, {
        readonly name: "periodSpend";
        readonly type: "tuple";
        readonly indexed: false;
        readonly internalType: "struct SpendPermissionManager.PeriodSpend";
        readonly components: readonly [{
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "spend";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }];
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "AfterSpendPermissionEnd";
    readonly inputs: readonly [{
        readonly name: "currentTimestamp";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }, {
        readonly name: "end";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }];
}, {
    readonly type: "error";
    readonly name: "BeforeSpendPermissionStart";
    readonly inputs: readonly [{
        readonly name: "currentTimestamp";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }, {
        readonly name: "start";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC721TokenNotSupported";
    readonly inputs: readonly [{
        readonly name: "token";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "EmptySpendPermissionBatch";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ExceededSpendPermission";
    readonly inputs: readonly [{
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "allowance";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "InvalidLastUpdatedPeriod";
    readonly inputs: readonly [{
        readonly name: "actualLastUpdatedPeriod";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.PeriodSpend";
        readonly components: readonly [{
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "spend";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }];
    }, {
        readonly name: "expectedLastUpdatedPeriod";
        readonly type: "tuple";
        readonly internalType: "struct SpendPermissionManager.PeriodSpend";
        readonly components: readonly [{
            readonly name: "start";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "end";
            readonly type: "uint48";
            readonly internalType: "uint48";
        }, {
            readonly name: "spend";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }];
    }];
}, {
    readonly type: "error";
    readonly name: "InvalidSender";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "expected";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "InvalidSignature";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidStartEnd";
    readonly inputs: readonly [{
        readonly name: "start";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }, {
        readonly name: "end";
        readonly type: "uint48";
        readonly internalType: "uint48";
    }];
}, {
    readonly type: "error";
    readonly name: "InvalidWithdrawRequestNonce";
    readonly inputs: readonly [{
        readonly name: "noncePostfix";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "permissionHashPostfix";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }];
}, {
    readonly type: "error";
    readonly name: "MismatchedAccounts";
    readonly inputs: readonly [{
        readonly name: "firstAccount";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "secondAccount";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "SafeERC20FailedOperation";
    readonly inputs: readonly [{
        readonly name: "token";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "SpendTokenWithdrawAssetMismatch";
    readonly inputs: readonly [{
        readonly name: "spendToken";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "withdrawAsset";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "SpendValueOverflow";
    readonly inputs: readonly [{
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "SpendValueWithdrawAmountMismatch";
    readonly inputs: readonly [{
        readonly name: "spendValue";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "withdrawAmount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "UnauthorizedSpendPermission";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UnexpectedReceiveAmount";
    readonly inputs: readonly [{
        readonly name: "received";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "expected";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ZeroAllowance";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ZeroPeriod";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ZeroSpender";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ZeroToken";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ZeroValue";
    readonly inputs: readonly [];
}];
//# sourceMappingURL=constants.d.ts.map