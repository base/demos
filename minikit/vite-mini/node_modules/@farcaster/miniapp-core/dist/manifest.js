"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMiniAppConfig = getMiniAppConfig;
/**
 * Helper function to get the MiniApp config from a manifest,
 * supporting both 'miniapp' and 'frame' properties during the transition period
 */
function getMiniAppConfig(manifest) {
    return manifest.miniapp || manifest.frame;
}
