"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverEventSchema = exports.notificationsDisabledSchema = exports.eventNotificationsEnabledSchema = exports.eventMiniAppRemovedSchema = exports.eventMiniAppAddedSchema = void 0;
const zod_1 = require("zod");
const notifications_ts_1 = require("./notifications.js");
exports.eventMiniAppAddedSchema = zod_1.z.object({
    event: zod_1.z.literal('miniapp_added'),
    notificationDetails: notifications_ts_1.notificationDetailsSchema.optional(),
});
exports.eventMiniAppRemovedSchema = zod_1.z.object({
    event: zod_1.z.literal('miniapp_removed'),
});
exports.eventNotificationsEnabledSchema = zod_1.z.object({
    event: zod_1.z.literal('notifications_enabled'),
    notificationDetails: notifications_ts_1.notificationDetailsSchema.required(),
});
exports.notificationsDisabledSchema = zod_1.z.object({
    event: zod_1.z.literal('notifications_disabled'),
});
exports.serverEventSchema = zod_1.z.discriminatedUnion('event', [
    exports.eventMiniAppAddedSchema,
    exports.eventMiniAppRemovedSchema,
    exports.eventNotificationsEnabledSchema,
    exports.notificationsDisabledSchema,
]);
