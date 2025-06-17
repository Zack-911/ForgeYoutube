"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getPlaylistItems",
    description: "Fetches items (videos) from a playlist",
    version: "1.0.0",
    output: forgescript_1.ArgType.Json,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "playlistId",
            description: "YouTube playlist ID",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String
        },
        {
            name: "limit",
            description: "Maximum number of items to return",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number
        }
    ],
    async execute(ctx, [playlistId, limit]) {
        const id = String(playlistId || "").trim();
        if (!id)
            return this.customError("Missing playlist ID");
        const youtube = ctx.client.youtube;
        if (!youtube)
            return this.customError("YouTube client not available");
        const feed = await youtube.getPlaylist(id).catch(() => null);
        if (!feed || !Array.isArray(feed.videos))
            return this.customError("Invalid or empty playlist");
        const lim = typeof limit === "number" && limit > 0 ? limit : 25;
        const videos = feed.videos.slice(0, lim).map((v) => ({
            id: v.id,
            index: v.index.text,
            title: v.title.text,
            duration: v.duration.text,
            durationSecs: v.duration.seconds,
            author: v.author?.name,
            thumbnail: v.thumbnails,
            url: `https://youtube.com/watch?v=${v.id}`
        }));
        return this.success(JSON.stringify({
            success: true,
            results: videos
        }, null, 2));
    }
});
//# sourceMappingURL=getPlaylistItems.js.map