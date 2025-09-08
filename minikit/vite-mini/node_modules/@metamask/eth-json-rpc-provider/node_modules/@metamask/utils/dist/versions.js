"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.satisfiesVersionRange = exports.gtRange = exports.gtVersion = exports.assertIsSemVerRange = exports.assertIsSemVerVersion = exports.isValidSemVerRange = exports.isValidSemVerVersion = exports.VersionRangeStruct = exports.VersionStruct = void 0;
const semver_1 = require("semver");
const superstruct_1 = require("superstruct");
const assert_1 = require("./assert");
/**
 * A struct for validating a version string.
 */
exports.VersionStruct = (0, superstruct_1.refine)((0, superstruct_1.string)(), 'Version', (value) => {
    if ((0, semver_1.valid)(value) === null) {
        return `Expected SemVer version, got "${value}"`;
    }
    return true;
});
exports.VersionRangeStruct = (0, superstruct_1.refine)((0, superstruct_1.string)(), 'Version range', (value) => {
    if ((0, semver_1.validRange)(value) === null) {
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
function isValidSemVerVersion(version) {
    return (0, superstruct_1.is)(version, exports.VersionStruct);
}
exports.isValidSemVerVersion = isValidSemVerVersion;
/**
 * Checks whether a SemVer version range is valid.
 *
 * @param versionRange - A potential version range.
 * @returns `true` if the version range is valid, and `false` otherwise.
 */
function isValidSemVerRange(versionRange) {
    return (0, superstruct_1.is)(versionRange, exports.VersionRangeStruct);
}
exports.isValidSemVerRange = isValidSemVerRange;
/**
 * Asserts that a value is a valid concrete SemVer version.
 *
 * @param version - A potential SemVer concrete version.
 */
function assertIsSemVerVersion(version) {
    (0, assert_1.assertStruct)(version, exports.VersionStruct);
}
exports.assertIsSemVerVersion = assertIsSemVerVersion;
/**
 * Asserts that a value is a valid SemVer range.
 *
 * @param range - A potential SemVer range.
 */
function assertIsSemVerRange(range) {
    (0, assert_1.assertStruct)(range, exports.VersionRangeStruct);
}
exports.assertIsSemVerRange = assertIsSemVerRange;
/**
 * Checks whether a SemVer version is greater than another.
 *
 * @param version1 - The left-hand version.
 * @param version2 - The right-hand version.
 * @returns `version1 > version2`.
 */
function gtVersion(version1, version2) {
    return (0, semver_1.gt)(version1, version2);
}
exports.gtVersion = gtVersion;
/**
 * Checks whether a SemVer version is greater than all possibilities in a range.
 *
 * @param version - A SemvVer version.
 * @param range - The range to check against.
 * @returns `version > range`.
 */
function gtRange(version, range) {
    return (0, semver_1.gtr)(version, range);
}
exports.gtRange = gtRange;
/**
 * Returns whether a SemVer version satisfies a SemVer range.
 *
 * @param version - The SemVer version to check.
 * @param versionRange - The SemVer version range to check against.
 * @returns Whether the version satisfied the version range.
 */
function satisfiesVersionRange(version, versionRange) {
    return (0, semver_1.satisfies)(version, versionRange, {
        includePrerelease: true,
    });
}
exports.satisfiesVersionRange = satisfiesVersionRange;
//# sourceMappingURL=versions.js.map