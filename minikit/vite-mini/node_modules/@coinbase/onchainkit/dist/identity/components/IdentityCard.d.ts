import { Address, Chain } from 'viem';
type IdentityCardReact = {
    address?: Address;
    chain?: Chain;
    className?: string;
    schemaId?: Address | null;
    /** Controls whether the badge shows a tooltip on hover. When true, the tooltip displays the attestation's name. When a string is provided, that text overrides the default display. Defaults to false. */
    badgeTooltip?: boolean | string;
};
export declare function IdentityCard({ address, chain, className, schemaId, badgeTooltip, }: IdentityCardReact): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=IdentityCard.d.ts.map