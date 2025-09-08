/**
 * A `StructFailure` represents a single specific failure in validation.
 */
export declare type Failure = {
    value: any;
    key: any;
    type: string;
    refinement: string | undefined;
    message: string;
    explanation?: string | undefined;
    branch: any[];
    path: any[];
};
/**
 * `StructError` objects are thrown (or returned) when validation fails.
 *
 * Validation logic is design to exit early for maximum performance. The error
 * represents the first error encountered during validation. For more detail,
 * the `error.failures` property is a generator function that can be run to
 * continue validation and receive all the failures in the data.
 */
export declare class StructError extends TypeError {
    value: any;
    key: any;
    type: string;
    refinement: string | undefined;
    path: any[];
    branch: any[];
    failures: () => Failure[];
    [x: string]: any;
    constructor(failure: Failure, failures: () => Generator<Failure>);
}
//# sourceMappingURL=error.d.cts.map