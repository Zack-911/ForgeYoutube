"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const youtube_1 = require("../../utils/youtube");
exports.default = new forgescript_1.NativeFunction({
    name: "$getVideoName",
    version: "1.0.0",
    description: "Fetches the title of a YouTube video by its ID.",
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
        if (videoId == null)
            return this.customError("Missing argument `videoId`");
        const title = await (0, youtube_1.fetchVideoTitle)(ctx.client.youtube, videoId.trim());
        return title ? this.success(title) : this.customError("Video title not found.");
    },
});
//# sourceMappingURL=getVideoName.js.map