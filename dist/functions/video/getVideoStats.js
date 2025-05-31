"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const youtube_1 = require("../../utils/youtube");
exports.default = new forgescript_1.NativeFunction({
    name: "$getVideoStats",
    version: "1.0.0",
    description: "Fetches statistics of a YouTube video.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "videoId", type: forgescript_1.ArgType.String, required: true, description: "The ID of the YouTube video.",
            rest: false
        },
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [videoId]) {
        if (!ctx.client.youtube)
            return this.customError("YouTube API is not configured.");
        const stats = await (0, youtube_1.fetchVideoStats)(ctx.client.youtube, videoId.trim());
        return stats ? this.success(stats) : this.customError("Video stats not found.");
    },
});
//# sourceMappingURL=getVideoStats.js.map