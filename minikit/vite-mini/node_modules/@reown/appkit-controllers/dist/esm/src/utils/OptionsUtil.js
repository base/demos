import { ConstantsUtil } from './ConstantsUtil.js';
import { CoreHelperUtil } from './CoreHelperUtil.js';
export const OptionsUtil = {
    getFeatureValue(key, features) {
        const optionValue = features?.[key];
        if (optionValue === undefined) {
            return ConstantsUtil.DEFAULT_FEATURES[key];
        }
        return optionValue;
    },
    filterSocialsByPlatform(socials) {
        if (!socials || !socials.length) {
            return socials;
        }
        if (CoreHelperUtil.isTelegram()) {
            if (CoreHelperUtil.isIos()) {
                return socials.filter(s => s !== 'google');
            }
            if (CoreHelperUtil.isMac()) {
                return socials.filter(s => s !== 'x');
            }
            if (CoreHelperUtil.isAndroid()) {
                return socials.filter(s => !['facebook', 'x'].includes(s));
            }
        }
        return socials;
    }
};
//# sourceMappingURL=OptionsUtil.js.map