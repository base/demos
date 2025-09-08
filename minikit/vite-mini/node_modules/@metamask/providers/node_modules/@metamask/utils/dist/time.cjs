"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSince = exports.inMilliseconds = exports.Duration = void 0;
/**
 * Common duration constants, in milliseconds.
 */
var Duration;
(function (Duration) {
    /**
     * A millisecond.
     */
    Duration[Duration["Millisecond"] = 1] = "Millisecond";
    /**
     * A second, in milliseconds.
     */
    Duration[Duration["Second"] = 1000] = "Second";
    /**
     * A minute, in milliseconds.
     */
    Duration[Duration["Minute"] = 60000] = "Minute";
    /**
     * An hour, in milliseconds.
     */
    Duration[Duration["Hour"] = 3600000] = "Hour";
    /**
     * A day, in milliseconds.
     */
    Duration[Duration["Day"] = 86400000] = "Day";
    /**
     * A week, in milliseconds.
     */
    Duration[Duration["Week"] = 604800000] = "Week";
    /**
     * A year, in milliseconds.
     */
    Duration[Duration["Year"] = 31536000000] = "Year";
})(Duration = exports.Duration || (exports.Duration = {}));
const isNonNegativeInteger = (number) => Number.isInteger(number) && number >= 0;
const assertIsNonNegativeInteger = (number, name) => {
    if (!isNonNegativeInteger(number)) {
        throw new Error(`"${name}" must be a non-negative integer. Received: "${number}".`);
    }
};
/**
 * Calculates the millisecond value of the specified number of units of time.
 *
 * @param count - The number of units of time.
 * @param duration - The unit of time to count.
 * @returns The count multiplied by the specified duration.
 */
function inMilliseconds(count, duration) {
    assertIsNonNegativeInteger(count, 'count');
    return count * duration;
}
exports.inMilliseconds = inMilliseconds;
/**
 * Gets the milliseconds since a particular Unix epoch timestamp.
 *
 * @param timestamp - A Unix millisecond timestamp.
 * @returns The number of milliseconds elapsed since the specified timestamp.
 */
function timeSince(timestamp) {
    assertIsNonNegativeInteger(timestamp, 'timestamp');
    return Date.now() - timestamp;
}
exports.timeSince = timeSince;
//# sourceMappingURL=time.cjs.map