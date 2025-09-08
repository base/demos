import { describe, expect, it } from 'vitest';
import { ConstantsUtil } from '../../src/utils/ConstantsUtil';
import { OptionsUtil } from '../../src/utils/OptionsUtil';
describe('OptionsUtil', () => {
    describe('getFeatureValue', () => {
        it('should return the default value when feature is not provided', () => {
            const defaultValue = ConstantsUtil.DEFAULT_FEATURES.allWallets;
            const result = OptionsUtil.getFeatureValue('allWallets');
            expect(result).toBe(defaultValue);
        });
        it('should handle disabling feature values', () => {
            const features = {
                allWallets: false
            };
            const result = OptionsUtil.getFeatureValue('allWallets', features);
            expect(result).toBe(false);
        });
    });
});
//# sourceMappingURL=OptionsUtil.test.js.map