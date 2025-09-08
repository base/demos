// biome-ignore lint/suspicious/noExplicitAny: this is used in a catch block
export const parseErrorMessageFromAny = (errorOrAny) => {
    return 'message' in errorOrAny && typeof errorOrAny.message === 'string'
        ? errorOrAny.message
        : '';
};
//# sourceMappingURL=utils.js.map