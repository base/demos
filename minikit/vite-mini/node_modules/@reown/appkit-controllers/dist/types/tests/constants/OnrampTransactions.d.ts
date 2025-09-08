export declare const ONRAMP_TRANSACTIONS_RESPONSES_JAN: {
    SUCCESS: {
        id: string;
        metadata: {
            operationType: string;
            hash: string;
            minedAt: string;
            sentFrom: string;
            sentTo: string;
            status: string;
            nonce: number;
            chain: string;
        };
        transfers: {
            fungible_info: {
                name: string;
                symbol: string;
            };
            direction: string;
            quantity: {
                numeric: string;
            };
        }[];
    };
    FAILED: {
        id: string;
        metadata: {
            operationType: string;
            hash: string;
            minedAt: string;
            sentFrom: string;
            sentTo: string;
            status: string;
            nonce: number;
        };
        transfers: {
            fungible_info: {
                name: string;
                symbol: string;
            };
            direction: string;
            quantity: {
                numeric: string;
            };
        }[];
    };
    IN_PROGRESS: {
        id: string;
        metadata: {
            operationType: string;
            hash: string;
            minedAt: string;
            sentFrom: string;
            sentTo: string;
            status: string;
            nonce: number;
        };
        transfers: {
            fungible_info: {
                name: string;
                symbol: string;
            };
            direction: string;
            quantity: {
                numeric: string;
            };
        }[];
    };
};
export declare const ONRAMP_TRANSACTIONS_RESPONSES_FEB: {
    SUCCESS: {
        id: string;
        metadata: {
            operationType: string;
            hash: string;
            minedAt: string;
            sentFrom: string;
            sentTo: string;
            status: string;
            nonce: number;
            chain: string;
        };
        transfers: {
            fungible_info: {
                name: string;
                symbol: string;
            };
            direction: string;
            quantity: {
                numeric: string;
            };
        }[];
    };
    FAILED: {
        id: string;
        metadata: {
            operationType: string;
            hash: string;
            minedAt: string;
            sentFrom: string;
            sentTo: string;
            status: string;
            nonce: number;
        };
        transfers: {
            fungible_info: {
                name: string;
                symbol: string;
            };
            direction: string;
            quantity: {
                numeric: string;
            };
        }[];
    };
    IN_PROGRESS: {
        id: string;
        metadata: {
            operationType: string;
            hash: string;
            minedAt: string;
            sentFrom: string;
            sentTo: string;
            status: string;
            nonce: number;
        };
        transfers: {
            fungible_info: {
                name: string;
                symbol: string;
            };
            direction: string;
            quantity: {
                numeric: string;
            };
        }[];
    };
};
