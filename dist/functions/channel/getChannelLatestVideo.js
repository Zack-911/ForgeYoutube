"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const youtube_1 = require("../../utils/youtube");
exports.default = new forgescript_1.NativeFunction({
    name: "$getChannelLatestVideo",
    version: "1.0.0",
    description: "Fetches the latest video from a YouTube channel.",
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
        const result = await (0, youtube_1.fetchLatestVideo)(ctx.client.youtube, channelId.trim());
        return result ? this.success(result) : this.customError("No videos found.");
    },
});
//# sourceMappingURL=getChannelLatestVideo.js.map