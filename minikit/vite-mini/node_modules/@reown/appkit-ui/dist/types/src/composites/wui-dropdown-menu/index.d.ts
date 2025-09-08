import { LitElement } from 'lit';
import '../../components/wui-text/index.js';
import '../../layout/wui-flex/index.js';
import '../wui-list-item/index.js';
type Action = {
    icon: string;
    label: string;
    onClick: (e: Event) => void;
};
export declare class WuiDropdownMenu extends LitElement {
    static styles: import("lit").CSSResult[];
    actions: Action[];
    isOpen: boolean;
    render(): import("lit").TemplateResult<1> | null;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-dropdown-menu': WuiDropdownMenu;
    }
}
export {};
