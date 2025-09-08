import { clsx } from 'clsx';
import { render } from 'preact';
// biome-ignore lint/correctness/noUnusedImports: preact
import { h } from 'preact';
import { injectCssReset } from '../cssReset/cssReset.js';
import { SnackbarContainer } from '../Snackbar/Snackbar.js';
import { isDarkMode } from '../util.js';
import css from './RedirectDialog-css.js';
export class RedirectDialog {
    constructor() {
        this.root = null;
        this.darkMode = isDarkMode();
    }
    attach() {
        const el = document.documentElement;
        this.root = document.createElement('div');
        this.root.className = '-cbwsdk-css-reset';
        el.appendChild(this.root);
        injectCssReset();
    }
    present(props) {
        this.render(props);
    }
    clear() {
        this.render(null);
    }
    render(props) {
        if (!this.root)
            return;
        render(null, this.root);
        if (!props)
            return;
        render(h(RedirectDialogContent, Object.assign({}, props, { onDismiss: () => {
                this.clear();
            }, darkMode: this.darkMode })), this.root);
    }
}
const RedirectDialogContent = ({ title, buttonText, darkMode, onButtonClick, onDismiss }) => {
    const theme = darkMode ? 'dark' : 'light';
    return (h(SnackbarContainer, { darkMode: darkMode },
        h("div", { class: "-cbwsdk-redirect-dialog" },
            h("style", null, css),
            h("div", { class: "-cbwsdk-redirect-dialog-backdrop", onClick: onDismiss }),
            h("div", { class: clsx('-cbwsdk-redirect-dialog-box', theme) },
                h("p", null, title),
                h("button", { onClick: onButtonClick }, buttonText)))));
};
//# sourceMappingURL=RedirectDialog.js.map