function standardCustomElement(tagName, descriptor) {
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        finisher(clazz) {
            if (!customElements.get(tagName)) {
                customElements.define(tagName, clazz);
            }
        }
    };
}
function legacyCustomElement(tagName, clazz) {
    if (!customElements.get(tagName)) {
        customElements.define(tagName, clazz);
    }
    return clazz;
}
export function customElement(tagName) {
    return function create(classOrDescriptor) {
        return typeof classOrDescriptor === 'function'
            ? legacyCustomElement(tagName, classOrDescriptor)
            : standardCustomElement(tagName, classOrDescriptor);
    };
}
//# sourceMappingURL=WebComponentsUtil.js.map