declare const brand: unique symbol;
export type Opaque<Base, Brand extends symbol> = Base & {
    [brand]: Brand;
};
export {};
//# sourceMappingURL=opaque.d.mts.map