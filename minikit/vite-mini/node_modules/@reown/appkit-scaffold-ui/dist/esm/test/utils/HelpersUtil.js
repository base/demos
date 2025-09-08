export const HelpersUtil = {
    getTextContent(element) {
        return element.textContent?.trim().replace('\n', '') ?? '';
    },
    querySelect(element, selector) {
        return element.shadowRoot?.querySelector(selector);
    },
    querySelectAll(element, selector) {
        return element.shadowRoot?.querySelectorAll(selector);
    },
    getAllByTestId(element, testId) {
        return this.querySelectAll(element, `[data-testid="${testId}"]`);
    },
    getByTestId(element, testId) {
        return this.querySelect(element, `[data-testid="${testId}"]`);
    },
    getClasses(element, selector) {
        if (selector) {
            const targetElement = this.querySelect(element, selector);
            return Array.from(targetElement.classList);
        }
        return Array.from(element.classList);
    }
};
//# sourceMappingURL=HelpersUtil.js.map