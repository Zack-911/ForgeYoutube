"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$searchPlaylist",
    version: "1.0.0",
    description: "Searches YouTube playlists and returns a JSON array of playlist details.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "query",
            description: "Search query",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "limit",
            description: "Max number of results (max 50)",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "order",
            description: "Sort order: date, rating, relevance, title, videoCount, viewCount",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "channelId",
            description: "Only return playlists from this channel ID",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "safeSearch",
            description: "Safe search level: none, moderate, strict",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [query, limit, order, channelId, safeSearch]) {
        if (!ctx.client.youtube)
            return this.customError("YouTube API is not configured.");
        const amount = Math.floor(limit ?? 5);
        if (amount < 1)
            return this.customError("Limit must be at least 1.");
        if (amount > 50)
            return this.customError("Google API does not allow more than 50 results.");
        const validOrders = ["date", "rating", "relevance", "title", "videoCount", "viewCount"];
        const validSafeSearch = ["none", "moderate", "strict"];
        const orderSanitized = order?.trim();
        const safeSearchSanitized = safeSearch?.trim();
        if (orderSanitized && !validOrders.includes(orderSanitized))
            return this.customError(`Invalid order: ${orderSanitized}. Must be one of: ${validOrders.join(", ")}`);
        if (safeSearchSanitized && !validSafeSearch.includes(safeSearchSanitized))
            return this.customError(`Invalid safeSearch: ${safeSearchSanitized}. Must be one of: ${validSafeSearch.join(", ")}`);
        const res = await ctx.client.youtube.search.list({
            part: ["snippet"],
            q: query.trim(),
            type: ["playlist"],
            order: orderSanitized,
            maxResults: amount,
            channelId: channelId?.trim() || undefined,
            safeSearch: safeSearchSanitized
        });
        const results = res.data.items ?? [];
        if (!results.length)
            return this.success(false);
        const playlists = results.map(p => ({
            playlistId: p.id?.playlistId ?? "unknown",
            title: p.snippet?.title ?? "Unknown Title",
            description: p.snippet?.description ?? "",
            channelId: p.snippet?.channelId ?? "unknown",
            channelTitle: p.snippet?.channelTitle ?? "unknown",
            publishedAt: p.snippet?.publishedAt ?? "unknown",
            thumbnail: p.snippet?.thumbnails?.high?.url ?? null,
            url: `https://www.youtube.com/playlist?list=${p.id?.playlistId ?? "unknown"}`,
        }));
        return this.success(JSON.stringify(playlists, null, 2));
    },
});
//# sourceMappingURL=searchPlaylist.js.map