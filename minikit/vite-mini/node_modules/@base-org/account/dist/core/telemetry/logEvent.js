import { PACKAGE_NAME, PACKAGE_VERSION } from '../constants.js';
import { store } from '../../store/store.js';
var ComponentType;
(function (ComponentType) {
    ComponentType["unknown"] = "unknown";
    ComponentType["banner"] = "banner";
    ComponentType["button"] = "button";
    ComponentType["card"] = "card";
    ComponentType["chart"] = "chart";
    ComponentType["content_script"] = "content_script";
    ComponentType["dropdown"] = "dropdown";
    ComponentType["link"] = "link";
    ComponentType["page"] = "page";
    ComponentType["modal"] = "modal";
    ComponentType["table"] = "table";
    ComponentType["search_bar"] = "search_bar";
    ComponentType["service_worker"] = "service_worker";
    ComponentType["text"] = "text";
    ComponentType["text_input"] = "text_input";
    ComponentType["tray"] = "tray";
    ComponentType["checkbox"] = "checkbox";
    ComponentType["icon"] = "icon";
})(ComponentType || (ComponentType = {}));
var ActionType;
(function (ActionType) {
    ActionType["unknown"] = "unknown";
    ActionType["blur"] = "blur";
    ActionType["click"] = "click";
    ActionType["change"] = "change";
    ActionType["dismiss"] = "dismiss";
    ActionType["focus"] = "focus";
    ActionType["hover"] = "hover";
    ActionType["select"] = "select";
    ActionType["measurement"] = "measurement";
    ActionType["move"] = "move";
    ActionType["process"] = "process";
    ActionType["render"] = "render";
    ActionType["scroll"] = "scroll";
    ActionType["view"] = "view";
    ActionType["search"] = "search";
    ActionType["keyPress"] = "keyPress";
    ActionType["error"] = "error";
})(ActionType || (ActionType = {}));
var AnalyticsEventImportance;
(function (AnalyticsEventImportance) {
    AnalyticsEventImportance["low"] = "low";
    AnalyticsEventImportance["high"] = "high";
})(AnalyticsEventImportance || (AnalyticsEventImportance = {}));
export function logEvent(name, event, importance) {
    var _a, _b, _c;
    if (window.ClientAnalytics) {
        (_a = window.ClientAnalytics) === null || _a === void 0 ? void 0 : _a.logEvent(name, Object.assign(Object.assign({}, event), { sdkVersion: PACKAGE_VERSION, sdkName: PACKAGE_NAME, appName: (_c = (_b = store.config.get().metadata) === null || _b === void 0 ? void 0 : _b.appName) !== null && _c !== void 0 ? _c : '', appOrigin: window.location.origin }), importance);
    }
}
export function identify(event) {
    var _a;
    if (window.ClientAnalytics) {
        (_a = window.ClientAnalytics) === null || _a === void 0 ? void 0 : _a.identify(event);
    }
}
export { ActionType, AnalyticsEventImportance, ComponentType };
//# sourceMappingURL=logEvent.js.map