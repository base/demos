export declare const DeployChainABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "chainID";
        readonly type: "uint256";
    }];
    readonly name: "deployAddresses";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "l2OutputOracle";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "systemConfig";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "optimismPortal";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "l1CrossDomainMessenger";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "l1StandardBridge";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "l1ERC721Bridge";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "optimismMintableERC20Factory";
            readonly type: "address";
        }];
        readonly internalType: "struct DeployChain.DeployAddresses";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
export declare const StandardBridgeABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }, {
        readonly internalType: "uint32";
        readonly name: "_minGasLimit";
        readonly type: "uint32";
    }, {
        readonly internalType: "bytes";
        readonly name: "_extraData";
        readonly type: "bytes";
    }];
    readonly name: "bridgeETHTo";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_localToken";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_remoteToken";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint32";
        readonly name: "_minGasLimit";
        readonly type: "uint32";
    }, {
        readonly internalType: "bytes";
        readonly name: "_extraData";
        readonly type: "bytes";
    }];
    readonly name: "bridgeERC20To";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
export declare const ERC20ABI: readonly [{
    readonly name: "approve";
    readonly type: "function";
    readonly stateMutability: "nonpayable";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly type: "bool";
    }];
}];
export declare const L2OutputOracleABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_submissionInterval";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_l2BlockTime";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_startingBlockNumber";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_startingTimestamp";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "_proposer";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_challenger";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_finalizationPeriodSeconds";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint8";
        readonly name: "version";
        readonly type: "uint8";
    }];
    readonly name: "Initialized";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "outputRoot";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "l2OutputIndex";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "l2BlockNumber";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "l1Timestamp";
        readonly type: "uint256";
    }];
    readonly name: "OutputProposed";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "prevNextOutputIndex";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "newNextOutputIndex";
        readonly type: "uint256";
    }];
    readonly name: "OutputsDeleted";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "CHALLENGER";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "FINALIZATION_PERIOD_SECONDS";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "L2_BLOCK_TIME";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "PROPOSER";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "SUBMISSION_INTERVAL";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_l2BlockNumber";
        readonly type: "uint256";
    }];
    readonly name: "computeL2Timestamp";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_l2OutputIndex";
        readonly type: "uint256";
    }];
    readonly name: "deleteL2Outputs";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_l2OutputIndex";
        readonly type: "uint256";
    }];
    readonly name: "getL2Output";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "outputRoot";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint128";
            readonly name: "timestamp";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "l2BlockNumber";
            readonly type: "uint128";
        }];
        readonly internalType: "struct Types.OutputProposal";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_l2BlockNumber";
        readonly type: "uint256";
    }];
    readonly name: "getL2OutputAfter";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "outputRoot";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint128";
            readonly name: "timestamp";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "l2BlockNumber";
            readonly type: "uint128";
        }];
        readonly internalType: "struct Types.OutputProposal";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_l2BlockNumber";
        readonly type: "uint256";
    }];
    readonly name: "getL2OutputIndexAfter";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_startingBlockNumber";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_startingTimestamp";
        readonly type: "uint256";
    }];
    readonly name: "initialize";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestBlockNumber";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestOutputIndex";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "nextBlockNumber";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "nextOutputIndex";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_outputRoot";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "_l2BlockNumber";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_l1BlockHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "_l1BlockNumber";
        readonly type: "uint256";
    }];
    readonly name: "proposeL2Output";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "startingBlockNumber";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "startingTimestamp";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "version";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestL2Output";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes32";
            readonly name: "outputRoot";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint128";
            readonly name: "timestamp";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "l2BlockNumber";
            readonly type: "uint128";
        }];
        readonly internalType: "struct Types.OutputProposal";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
export declare const OptimismPortalABI: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "receive";
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "balance";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "depositERC20Transaction";
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_mint";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_gasLimit";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }, {
        readonly name: "_isCreation";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "_data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "depositTransaction";
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_gasLimit";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }, {
        readonly name: "_isCreation";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "_data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "donateETH";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "finalizeWithdrawalTransaction";
    readonly inputs: readonly [{
        readonly name: "_tx";
        readonly type: "tuple";
        readonly internalType: "struct Types.WithdrawalTransaction";
        readonly components: readonly [{
            readonly name: "nonce";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "sender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "target";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "gasLimit";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "finalizedWithdrawals";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "guardian";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "initialize";
    readonly inputs: readonly [{
        readonly name: "_l2Oracle";
        readonly type: "address";
        readonly internalType: "contract OutputOracle";
    }, {
        readonly name: "_systemConfig";
        readonly type: "address";
        readonly internalType: "contract ISystemConfig";
    }, {
        readonly name: "_superchainConfig";
        readonly type: "address";
        readonly internalType: "contract ISuperchainConfig";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "isOutputFinalized";
    readonly inputs: readonly [{
        readonly name: "_l2OutputIndex";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "l2Oracle";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract OutputOracle";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "l2Sender";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "minimumGasLimit";
    readonly inputs: readonly [{
        readonly name: "_byteCount";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }];
    readonly stateMutability: "pure";
}, {
    readonly type: "function";
    readonly name: "params";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "prevBaseFee";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "prevBoughtGas";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }, {
        readonly name: "prevBlockNum";
        readonly type: "uint64";
        readonly internalType: "uint64";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "paused";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "paused_";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "proveAndFinalizeWithdrawalTransaction";
    readonly inputs: readonly [{
        readonly name: "_tx";
        readonly type: "tuple";
        readonly internalType: "struct Types.WithdrawalTransaction";
        readonly components: readonly [{
            readonly name: "nonce";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "sender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "target";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "gasLimit";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly name: "_l2OutputIndex";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_outputRootProof";
        readonly type: "tuple";
        readonly internalType: "struct Types.OutputRootProof";
        readonly components: readonly [{
            readonly name: "version";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "stateRoot";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "messagePasserStorageRoot";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "latestBlockhash";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly name: "_withdrawalProof";
        readonly type: "bytes[]";
        readonly internalType: "bytes[]";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "proveWithdrawalTransaction";
    readonly inputs: readonly [{
        readonly name: "_tx";
        readonly type: "tuple";
        readonly internalType: "struct Types.WithdrawalTransaction";
        readonly components: readonly [{
            readonly name: "nonce";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "sender";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "target";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "gasLimit";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "data";
            readonly type: "bytes";
            readonly internalType: "bytes";
        }];
    }, {
        readonly name: "_l2OutputIndex";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_outputRootProof";
        readonly type: "tuple";
        readonly internalType: "struct Types.OutputRootProof";
        readonly components: readonly [{
            readonly name: "version";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "stateRoot";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "messagePasserStorageRoot";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "latestBlockhash";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly name: "_withdrawalProof";
        readonly type: "bytes[]";
        readonly internalType: "bytes[]";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setGasPayingToken";
    readonly inputs: readonly [{
        readonly name: "_token";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_decimals";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }, {
        readonly name: "_name";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "_symbol";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "superchainConfig";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract ISuperchainConfig";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "systemConfig";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract ISystemConfig";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "version";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "pure";
}, {
    readonly type: "event";
    readonly name: "Initialized";
    readonly inputs: readonly [{
        readonly name: "version";
        readonly type: "uint8";
        readonly indexed: false;
        readonly internalType: "uint8";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "TransactionDeposited";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "version";
        readonly type: "uint256";
        readonly indexed: true;
        readonly internalType: "uint256";
    }, {
        readonly name: "opaqueData";
        readonly type: "bytes";
        readonly indexed: false;
        readonly internalType: "bytes";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "WithdrawalFinalized";
    readonly inputs: readonly [{
        readonly name: "withdrawalHash";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "success";
        readonly type: "bool";
        readonly indexed: false;
        readonly internalType: "bool";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "WithdrawalProven";
    readonly inputs: readonly [{
        readonly name: "withdrawalHash";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "BadTarget";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "CallPaused";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ContentLengthMismatch";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "EmptyItem";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "GasEstimation";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidDataRemainder";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidHeader";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "LargeCalldata";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NoValue";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NonReentrant";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "OnlyCustomGasToken";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "OutOfGas";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "SmallGasLimit";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "TransferFailed";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "Unauthorized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UnexpectedList";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UnexpectedString";
    readonly inputs: readonly [];
}];
export declare const L2_TO_L1_MESSAGE_PASSER_ABI: readonly [{
    readonly type: "function";
    readonly name: "initiateWithdrawal";
    readonly inputs: readonly [{
        readonly name: "_target";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_gasLimit";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}];
//# sourceMappingURL=abi.d.ts.map