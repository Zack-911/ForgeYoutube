"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const youtube_1 = require("../../utils/youtube");
exports.default = new forgescript_1.NativeFunction({
    name: "$getChannelStats",
    version: "1.0.0",
    description: "Returns statistics of a YouTube channel.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "channelId", type: forgescript_1.ArgType.String, required: true, description: "The ID of the YouTube channel.",
            rest: false
        },
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [channelId]) {
        if (!ctx.client.youtube)
            return this.customError("YouTube API is not configured.");
        const stats = await (0, youtube_1.fetchChannelStats)(ctx.client.youtube, channelId.trim());
        return stats ? this.success(stats) : this.customError("Channel stats not found.");
    },
});
//# sourceMappingURL=getChannelStats.js.map