"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const youtube_1 = require("../../utils/youtube");
exports.default = new forgescript_1.NativeFunction({
    name: "$followYoutubeChannel",
    version: "1.0.0",
    description: "Subscribes to YouTube channel upload notifications.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "channelId", type: forgescript_1.ArgType.String, required: true, description: "The ID of the YouTube channel.",
            rest: false
        },
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [channelId]) {
        if (!ctx.client.youtube)
            return this.customError("YouTube API is not configured.");
        const success = await (0, youtube_1.subscribeToChannelUpload)(ctx.client.youtube, channelId.trim());
        return success ? this.success(true) : this.customError("Failed to follow channel.");
    },
});
//# sourceMappingURL=followYoutubeChannel.js.map