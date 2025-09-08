export const MathUtil = {
    interpolate(inputRange, outputRange, value) {
        if (inputRange.length !== 2 || outputRange.length !== 2) {
            throw new Error('inputRange and outputRange must be an array of length 2');
        }
        const originalRangeMin = inputRange[0] || 0;
        const originalRangeMax = inputRange[1] || 0;
        const newRangeMin = outputRange[0] || 0;
        const newRangeMax = outputRange[1] || 0;
        if (value < originalRangeMin) {
            return newRangeMin;
        }
        if (value > originalRangeMax) {
            return newRangeMax;
        }
        return (((newRangeMax - newRangeMin) / (originalRangeMax - originalRangeMin)) *
            (value - originalRangeMin) +
            newRangeMin);
    }
};
//# sourceMappingURL=MathUtil.js.map