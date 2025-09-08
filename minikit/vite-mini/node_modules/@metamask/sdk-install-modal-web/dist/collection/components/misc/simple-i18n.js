const defaultTranslations = {
    "DESKTOP": "Desktop",
    "MOBILE": "Mobile",
    "META_MASK_MOBILE_APP": "MetaMask mobile app",
    "SCAN_TO_CONNECT": "Scan to connect and sign with",
    "CONNECT_WITH_EXTENSION": "Connect With MetaMask Extension",
    "INSTALL_MODAL": {
        "TRUSTED_BY_USERS": "Trusted by over 30 million users to buy, store, send and swap crypto securely",
        "LEADING_CRYPTO_WALLET": "The leading crypto wallet & gateway to blockchain apps built on Ethereum Mainnet, Polygon, Optimism, and many other networks",
        "CONTROL_DIGITAL_INTERACTIONS": "Puts you in control of your digital interactions by making power of cryptography more accessible",
        "INSTALL_META_MASK_EXTENSION": "Install MetaMask Extension"
    },
    "PENDING_MODAL": {
        "OPEN_META_MASK_SELECT_CODE": "Please open the MetaMask wallet app and select the code on the screen OR disconnect",
        "OPEN_META_MASK_CONTINUE": "Open the MetaMask app to continue with your session.",
        "NUMBER_AFTER_OPEN_NOTICE": "If a number doesn't appear after opening MetaMask, please click disconnect and re-scan the QRCode.",
        "DISCONNECT": "Disconnect"
    },
    "SELECT_MODAL": {
        "CRYPTO_TAKE_CONTROL_TEXT": "Take control of your crypto and explore the blockchain with the wallet trusted by over 30 million people worldwide"
    },
    "META_MASK_MODAL": {
        "ADDRESS_COPIED": "Address copied to clipboard!",
        "DISCONNECT": "Disconnect",
        "ACTIVE_NETWORK": "Active Network"
    }
};
export class SimpleI18n {
    constructor(config) {
        var _a;
        this.translations = defaultTranslations;
        this.supportedLocales = ['es', 'fr', 'he', 'it', 'pt', 'tr'];
        this.baseUrl = (_a = config === null || config === void 0 ? void 0 : config.baseUrl) !== null && _a !== void 0 ? _a : 'https://raw.githubusercontent.com/MetaMask/metamask-sdk/refs/heads/gh-pages/locales';
    }
    getBrowserLanguage() {
        // Get all browser languages in order of preference
        const browserLanguages = navigator.languages || [navigator.language];
        // Check if English is one of the preferred languages
        const hasEnglish = browserLanguages.some(lang => lang.toLowerCase().startsWith('en'));
        // If user understands English, use it
        if (hasEnglish) {
            return 'en';
        }
        // Otherwise, check for other supported languages
        const primaryLang = navigator.language;
        const shortLang = primaryLang.toLowerCase().split('-')[0];
        if (this.supportedLocales.includes(shortLang)) {
            return shortLang;
        }
        return 'en';
    }
    async init(config) {
        const browserLang = this.getBrowserLanguage();
        const locale = browserLang || config.fallbackLng;
        await this.loadTranslations(locale);
    }
    async loadTranslations(locale) {
        const shortLocale = locale.split('-')[0];
        if (shortLocale === 'en' || !this.supportedLocales.includes(shortLocale)) {
            this.translations = defaultTranslations;
            return;
        }
        try {
            const url = `${this.baseUrl}/${shortLocale}.json`;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            this.translations = await response.json();
        }
        catch (error) {
            console.warn(`❌ Failed to load ${shortLocale} translations, falling back to English:`, error);
            this.translations = defaultTranslations;
        }
    }
    t(key) {
        return this.getNestedTranslation(key, this.translations) || key;
    }
    getNestedTranslation(key, dict) {
        const parts = key.split('.');
        let current = dict;
        for (const part of parts) {
            if (typeof current !== 'object')
                return '';
            current = current[part];
        }
        return typeof current === 'string' ? current : '';
    }
}
//# sourceMappingURL=simple-i18n.js.map
