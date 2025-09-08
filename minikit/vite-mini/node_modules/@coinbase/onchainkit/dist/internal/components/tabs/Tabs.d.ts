type TabsContextType = {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
};
export declare function useTabsContext(): TabsContextType;
type TabsReact = {
    children: React.ReactNode;
    defaultValue: string;
    className?: string;
};
export declare function Tabs({ children, defaultValue, className }: TabsReact): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Tabs.d.ts.map