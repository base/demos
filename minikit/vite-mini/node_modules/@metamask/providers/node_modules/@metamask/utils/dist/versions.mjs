import { is, refine, string } from "@metamask/superstruct";
import $semver from "semver";
const { gt: gtSemver, gtr: gtrSemver, satisfies: satisfiesSemver, valid: validSemVerVersion, validRange: validSemVerRange } = $semver;
import { assertStruct } from "./assert.mjs";
/**
 * A struct for validating a version string.
 */
export const VersionStruct = refine(string(), 'Version', (value) => {
    if (validSemVerVersion(value) === null) {
        return `Expected SemVer version, got "${value}"`;
    }
    return true;
});
export const VersionRangeStruct = refine(string(), 'Version range', (value) => {
    if (validSemVerRange(value) === null) {
        return `Expected SemVer range, got "${value}"`;
    }
    return true;
});
/**
 * Checks whether a SemVer version is valid.
 *
 * @param version - A potential version.
 * @returns `true` if the version is valid, and `false` otherwise.
 */
export function isValidSemVerVersion(version) {
    return is(version, VersionStruct);
}
/**
 * Checks whether a SemVer version range is valid.
 *
 * @param versionRange - A potential version range.
 * @returns `true` if the version range is valid, and `false` otherwise.
 */
export function isValidSemVerRange(versionRange) {
    return is(versionRange, VersionRangeStruct);
}
/**
 * Asserts that a value is a valid concrete SemVer version.
 *
 * @param version - A potential SemVer concrete version.
 */
export function assertIsSemVerVersion(version) {
    assertStruct(version, VersionStruct);
}
/**
 * Asserts that a value is a valid SemVer range.
 *
 * @param range - A potential SemVer range.
 */
export function assertIsSemVerRange(range) {
    assertStruct(range, VersionRangeStruct);
}
/**
 * Checks whether a SemVer version is greater than another.
 *
 * @param version1 - The left-hand version.
 * @param version2 - The right-hand version.
 * @returns `version1 > version2`.
 */
export function gtVersion(version1, version2) {
    return gtSemver(version1, version2);
}
/**
 * Checks whether a SemVer version is greater than all possibilities in a range.
 *
 * @param version - A SemvVer version.
 * @param range - The range to check against.
 * @returns `version > range`.
 */
export function gtRange(version, range) {
    return gtrSemver(version, range);
}
/**
 * Returns whether a SemVer version satisfies a SemVer range.
 *
 * @param version - The SemVer version to check.
 * @param versionRange - The SemVer version range to check against.
 * @returns Whether the version satisfied the version range.
 */
export function satisfiesVersionRange(version, versionRange) {
    return satisfiesSemver(version, versionRange, {
        includePrerelease: true,
    });
}
//# sourceMappingURL=versions.mjs.map