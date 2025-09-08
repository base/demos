import type { SocialProvider } from './TypeUtil.js';
export declare function connectFarcaster(): Promise<void>;
export declare function connectSocial(socialProvider: 'google' | 'github' | 'apple' | 'facebook' | 'x' | 'discord'): Promise<void>;
export declare function executeSocialLogin(socialProvider: SocialProvider): Promise<void>;
