import { Component, ComponentType, ErrorInfo, ReactNode } from 'react';
type Props = {
    fallback?: ComponentType<{
        error: Error;
    }>;
    children: ReactNode;
};
type State = {
    error: Error | null;
};
declare class OnchainKitProviderBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(error: Error): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): string | number | boolean | Iterable<ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export default OnchainKitProviderBoundary;
//# sourceMappingURL=OnchainKitProviderBoundary.d.ts.map