import type { SafeAppProvider } from '@safe-global/safe-apps-provider';
import type { Opts } from '@safe-global/safe-apps-sdk';
import type { Compute } from '@wagmi/core/internal';
export type SafeParameters = Compute<Opts & {
    /**
     * Connector automatically connects when used as Safe App.
     *
     * This flag simulates the disconnect behavior by keeping track of connection status in storage
     * and only autoconnecting when previously connected by user action (e.g. explicitly choosing to connect).
     *
     * @default false
     */
    shimDisconnect?: boolean | undefined;
    /**
     * Timeout in milliseconds for `getInfo` (from the Safe SDK) to resolve.
     *
     * `getInfo` does not resolve when not used in Safe App iFrame. This allows the connector to force a timeout.
     * @default 10
     */
    unstable_getInfoTimeout?: number | undefined;
}>;
export declare function safe(parameters?: SafeParameters): import("@wagmi/core").CreateConnectorFn<SafeAppProvider | undefined, Record<string, unknown>, {
    'safe.disconnected': true;
}>;
export declare namespace safe {
    var type: "safe";
}
//# sourceMappingURL=safe.d.ts.map