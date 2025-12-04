import { sdk } from "@farcaster/miniapp-sdk";

// Haptic feedback patterns for different actions
export const haptics = {
    // Light tap - for selections and navigation
    light: async () => {
        try {
            await sdk.haptics.impactOccurred('light');
        } catch {
            console.log('Haptics not supported');
        }
    },

    // Medium impact - for confirmations
    medium: async () => {
        try {
            await sdk.haptics.impactOccurred('medium');
        } catch {
            console.log('Haptics not supported');
        }
    },

    // Heavy impact - for major actions
    heavy: async () => {
        try {
            await sdk.haptics.impactOccurred('heavy');
        } catch {
            console.log('Haptics not supported');
        }
    },

    // Success notification
    success: async () => {
        try {
            await sdk.haptics.notificationOccurred('success');
        } catch {
            console.log('Haptics not supported');
        }
    },

    // Warning notification
    warning: async () => {
        try {
            await sdk.haptics.notificationOccurred('warning');
        } catch {
            console.log('Haptics not supported');
        }
    },

    // Error notification
    error: async () => {
        try {
            await sdk.haptics.notificationOccurred('error');
        } catch {
            console.log('Haptics not supported');
        }
    },

    // Selection changed - for UI interactions
    selection: async () => {
        try {
            await sdk.haptics.selectionChanged();
        } catch {
            console.log('Haptics not supported');
        }
    },
};
