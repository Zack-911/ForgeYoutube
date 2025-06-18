"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getLatestVideo",
    version: "1.0.3",
    description: "Gets the most recent video from a YouTube channel.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "channel",
            description: "Channel ID or handle (e.g. UC... or @username)",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String
        }
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [id]) {
        const channel = String(id || "").trim();
        const yt = ctx.client.youtube;
        if (!yt)
            return this.customError("YouTube is not configured.");
        try {
            const page = await yt.getChannel(channel);
            const videosTab = await page.getVideos();
            const section = videosTab.current_tab?.content;
            if (!section || section.type == "MusicQueue")
                return this.customError("Expected MusicQueue in channel videos tab.");
            const MusicQueue = section;
            const items = MusicQueue.content;
            if (!Array.isArray(items) || items.length === 0)
                return this.customError("No videos found.");
            const latest = items[0];
            return this.success(JSON.stringify({
                id: latest,
            }, null, 2));
        }
        catch (err) {
            return this.customError("Failed to fetch latest video: " + err.message);
        }
    }
});
//# sourceMappingURL=getLatestVideo.js.map