import { ConstantsUtil } from './ConstantsUtil.js';
export const HelpersUtil = {
    getCaipTokens(tokens) {
        if (!tokens) {
            return undefined;
        }
        const caipTokens = {};
        Object.entries(tokens).forEach(([id, token]) => {
            caipTokens[`${ConstantsUtil.EIP155}:${id}`] = token;
        });
        return caipTokens;
    },
    isLowerCaseMatch(str1, str2) {
        return str1?.toLowerCase() === str2?.toLowerCase();
    }
};
//# sourceMappingURL=HelpersUtil.js.map