import { SwapUnit } from '../../swap/types';
type OnrampItemReact = {
    name: string;
    description: string;
    onClick: () => void;
    svg?: React.ReactNode;
    icon: string;
    to?: SwapUnit;
};
export declare function BuyOnrampItem({ name, description, onClick, icon, to, }: OnrampItemReact): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=BuyOnrampItem.d.ts.map