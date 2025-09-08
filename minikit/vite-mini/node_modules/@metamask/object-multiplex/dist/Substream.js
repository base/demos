"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Substream = void 0;
const readable_stream_1 = require("readable-stream");
class Substream extends readable_stream_1.Duplex {
    constructor(_a) {
        var { parent, name } = _a, streamOptions = __rest(_a, ["parent", "name"]);
        super(Object.assign({ objectMode: true }, streamOptions));
        this._parent = parent;
        this._name = name;
    }
    /**
     * Explicitly sets read operations to a no-op.
     */
    _read() {
        return undefined;
    }
    /**
     * Called when data should be written to this writable stream.
     *
     * @param chunk - Arbitrary object to write
     * @param encoding - Encoding to use when writing payload
     * @param callback - Called when writing is complete or an error occurs
     */
    _write(chunk, _encoding, callback) {
        this._parent.push({
            name: this._name,
            data: chunk,
        });
        callback();
    }
}
exports.Substream = Substream;
//# sourceMappingURL=Substream.js.map