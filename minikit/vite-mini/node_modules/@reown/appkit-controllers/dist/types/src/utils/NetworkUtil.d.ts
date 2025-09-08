import { type CaipNetwork } from '@reown/appkit-common';
export declare const NetworkUtil: {
    /**
     * Function to handle the network switch.
     * This function has variety of conditions to handle the network switch depending on the connectors or namespace's connection states.
     * @param args.network - The network to switch to.
     * @param args.shouldConfirmSwitch - Whether to confirm the switch. If true, the user will be asked to confirm the switch if necessary.
     * @returns void
     */
    onSwitchNetwork({ network, ignoreSwitchConfirmation }: {
        network: CaipNetwork;
        ignoreSwitchConfirmation?: boolean;
    }): void;
};
