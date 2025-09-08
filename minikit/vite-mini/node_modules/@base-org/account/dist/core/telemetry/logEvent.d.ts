declare enum ComponentType {
    unknown = "unknown",
    banner = "banner",
    button = "button",
    card = "card",
    chart = "chart",
    content_script = "content_script",
    dropdown = "dropdown",
    link = "link",
    page = "page",
    modal = "modal",
    table = "table",
    search_bar = "search_bar",
    service_worker = "service_worker",
    text = "text",
    text_input = "text_input",
    tray = "tray",
    checkbox = "checkbox",
    icon = "icon"
}
declare enum ActionType {
    unknown = "unknown",
    blur = "blur",
    click = "click",
    change = "change",
    dismiss = "dismiss",
    focus = "focus",
    hover = "hover",
    select = "select",
    measurement = "measurement",
    move = "move",
    process = "process",
    render = "render",
    scroll = "scroll",
    view = "view",
    search = "search",
    keyPress = "keyPress",
    error = "error"
}
declare enum AnalyticsEventImportance {
    low = "low",
    high = "high"
}
type CCAEventData = {
    action: ActionType;
    componentType: ComponentType;
    sdkVersion?: string;
    appName?: string;
    appOrigin?: string;
    appPreferredSigner?: string;
    signerType?: 'base-account';
    method?: string;
    correlationId?: string;
    errorMessage?: string;
    dialogContext?: string;
    dialogAction?: string;
    enableAutoSubAccounts?: boolean;
    amount?: string;
    testnet?: boolean;
    status?: string;
};
type AnalyticsEventData = {
    name: string;
    event: CCAEventData;
    importance: AnalyticsEventImportance;
};
type LogEvent = (eventName: string, eventData: CCAEventData, importance?: AnalyticsEventImportance) => void;
export declare function logEvent(name: string, event: CCAEventData, importance: AnalyticsEventImportance | undefined): void;
export declare function identify(event: CCAEventData): void;
export { ActionType, AnalyticsEventImportance, ComponentType };
export type { AnalyticsEventData, CCAEventData, LogEvent };
//# sourceMappingURL=logEvent.d.ts.map