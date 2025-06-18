"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$youtubeStreamLink",
    description: "Returns the direct video stream URL for a given YouTube video ID.",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "videoId",
            description: "YouTube video ID (e.g., dQw4w9WgXcQ)",
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [videoId]) {
        const id = String(videoId || "").trim();
        if (!id)
            return this.customError("Missing video ID.");
        const yt = ctx.client.youtube;
        if (!yt)
            return this.customError("YouTube client not available.");
        try {
            const data = await yt.getStreamingData(id);
            if (!data.url)
                return this.customError("No stream URL found for this video.");
            return this.success(data.url);
        }
        catch (err) {
            return this.customError("Failed to get stream URL: " + err.message);
        }
    }
});
//# sourceMappingURL=getDirectUrl.js.map