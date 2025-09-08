import { OnrampOptionsResponseData } from '../types';
/**
 * Returns supported fiat currencies and available crypto assets that can be passed into the Buy Quote API.
 *
 * @param country ISO 3166-1 two-digit country code string representing the purchasing user’s country of residence, e.g., US. `required`
 * @param subdivision ISO 3166-2 two-digit country subdivision code representing the purchasing user’s subdivision of residence within their country, e.g. `NY`.
 */
export declare function fetchOnrampOptions({ country, subdivision, apiKey, }: {
    country: string;
    subdivision?: string;
    apiKey?: string;
}): Promise<OnrampOptionsResponseData>;
//# sourceMappingURL=fetchOnrampOptions.d.ts.map