import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
    if (!window.Buffer) {
        window.Buffer = Buffer;
    }
    if (!window.global) {
        window.global = window;
    }
    if (!window.process) {
        window.process = {};
    }
    if (!window.process?.env) {
        window.process = { env: {} };
    }
}
//# sourceMappingURL=index.js.map