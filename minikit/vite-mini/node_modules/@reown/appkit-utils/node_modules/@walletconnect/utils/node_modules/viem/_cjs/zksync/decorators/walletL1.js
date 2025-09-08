"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletActionsL1 = walletActionsL1;
const requestExecute_js_1 = require("../actions/requestExecute.js");
function walletActionsL1() {
    return (client) => ({
        requestExecute: (args) => (0, requestExecute_js_1.requestExecute)(client, args),
    });
}
//# sourceMappingURL=walletL1.js.map