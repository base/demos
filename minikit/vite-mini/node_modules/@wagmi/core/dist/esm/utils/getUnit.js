import { weiUnits } from 'viem';
export function getUnit(unit) {
    if (typeof unit === 'number')
        return unit;
    if (unit === 'wei')
        return 0;
    return Math.abs(weiUnits[unit]);
}
//# sourceMappingURL=getUnit.js.map