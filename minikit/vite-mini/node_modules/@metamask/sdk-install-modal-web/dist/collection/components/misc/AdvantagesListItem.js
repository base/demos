import { h } from "@stencil/core";
const AdvantagesListItem = ({ Icon, text }) => (h("div", { class: 'flexContainer', style: { padding: '6', flexDirection: 'row' } }, h("div", { class: 'flexItem1' }, h(Icon, null)), h("div", { class: 'flexItem11' }, h("span", { style: { lineHeight: '2', color: 'black' } }, text))));
export default AdvantagesListItem;
//# sourceMappingURL=AdvantagesListItem.js.map
