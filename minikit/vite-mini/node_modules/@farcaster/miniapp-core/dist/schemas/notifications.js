"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationResponseSchema = exports.sendNotificationRequestSchema = exports.notificationDetailsSchema = void 0;
const zod_1 = require("zod");
const shared_ts_1 = require("./shared.js");
exports.notificationDetailsSchema = zod_1.z.object({
    url: zod_1.z.string(),
    token: zod_1.z.string(),
});
exports.sendNotificationRequestSchema = zod_1.z.object({
    notificationId: zod_1.z.string().max(128),
    title: zod_1.z.string().max(32),
    body: zod_1.z.string().max(128),
    targetUrl: shared_ts_1.secureUrlSchema,
    tokens: zod_1.z.string().array().max(100),
});
exports.sendNotificationResponseSchema = zod_1.z.object({
    result: zod_1.z.object({
        successfulTokens: zod_1.z.array(zod_1.z.string()),
        invalidTokens: zod_1.z.array(zod_1.z.string()),
        rateLimitedTokens: zod_1.z.array(zod_1.z.string()),
    }),
});
