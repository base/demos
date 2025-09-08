"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParseFrameEmbed = exports.safeParseMiniAppEmbed = exports.miniAppEmbedNextSchema = exports.buttonSchema = exports.actionSchema = exports.actionViewTokenSchema = exports.actionLaunchMiniAppSchema = exports.actionLaunchFrameSchema = void 0;
const zod_1 = require("zod");
const shared_ts_1 = require("./shared.js");
exports.actionLaunchFrameSchema = zod_1.z.object({
    type: zod_1.z.literal('launch_frame'),
    name: shared_ts_1.miniAppNameSchema,
    url: shared_ts_1.secureUrlSchema.optional(),
    splashImageUrl: shared_ts_1.secureUrlSchema.optional(),
    splashBackgroundColor: shared_ts_1.hexColorSchema.optional(),
});
exports.actionLaunchMiniAppSchema = zod_1.z.object({
    type: zod_1.z.literal('launch_miniapp'),
    name: shared_ts_1.miniAppNameSchema,
    url: shared_ts_1.secureUrlSchema.optional(),
    splashImageUrl: shared_ts_1.secureUrlSchema.optional(),
    splashBackgroundColor: shared_ts_1.hexColorSchema.optional(),
});
exports.actionViewTokenSchema = zod_1.z.object({
    type: zod_1.z.literal('view_token'),
    token: shared_ts_1.caip19TokenSchema,
});
exports.actionSchema = zod_1.z.discriminatedUnion('type', [
    exports.actionLaunchMiniAppSchema,
    exports.actionViewTokenSchema,
    // Remove after compatibility period
    exports.actionLaunchFrameSchema,
]);
exports.buttonSchema = zod_1.z.object({
    title: shared_ts_1.buttonTitleSchema,
    action: exports.actionSchema,
});
exports.miniAppEmbedNextSchema = zod_1.z.object({
    version: zod_1.z
        .union([zod_1.z.string(), zod_1.z.number()])
        .transform((val) => String(val))
        .pipe(zod_1.z.union([zod_1.z.literal('next'), zod_1.z.literal('1')])),
    imageUrl: shared_ts_1.secureUrlSchema,
    aspectRatio: shared_ts_1.aspectRatioSchema.optional(),
    button: exports.buttonSchema,
});
const safeParseMiniAppEmbed = (rawResponse) => exports.miniAppEmbedNextSchema.safeParse(rawResponse);
exports.safeParseMiniAppEmbed = safeParseMiniAppEmbed;
// Backward compatibility - also parse fc:frame meta tags
exports.safeParseFrameEmbed = exports.safeParseMiniAppEmbed;
