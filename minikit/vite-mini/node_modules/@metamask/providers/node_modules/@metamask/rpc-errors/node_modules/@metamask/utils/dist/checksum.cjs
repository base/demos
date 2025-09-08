"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecksumStruct = void 0;
const superstruct_1 = require("@metamask/superstruct");
const base64_1 = require("./base64.cjs");
exports.ChecksumStruct = (0, superstruct_1.size)((0, base64_1.base64)((0, superstruct_1.string)(), { paddingRequired: true }), 44, 44);
//# sourceMappingURL=checksum.cjs.map