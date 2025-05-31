"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const youtube_1 = require("../../utils/youtube");
exports.default = new forgescript_1.NativeFunction({
    name: "$getYoutubeVideo",
    version: "1.0.0",
    description: "Fetches YouTube video details by its ID.",
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
        const result = await (0, youtube_1.fetchVideoById)(ctx.client.youtube, videoId.trim());
        return result ? this.success(result) : this.customError("Video not found.");
    },
});
//# sourceMappingURL=getYoutubeVideo.js.map