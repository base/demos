import { h } from "@stencil/core";
export default function SDKVersion({ version }) {
    return (h("div", { style: { textAlign: 'center', color: '#BBC0C5', fontSize: '12' } }, "SDK Version ", version ? `v${version}` : `unknown`));
}
//# sourceMappingURL=SDKVersion.js.map
