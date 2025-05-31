"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$searchVideo",
    version: "1.0.0",
    description: "Searches YouTube videos and returns a JSON array of full video details with filtering options.",
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
            description: "Sort order: date, rating, relevance, title, viewCount",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "channelId",
            description: "Only return results from this channel ID",
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
        const validOrders = ["date", "rating", "relevance", "title", "viewCount"];
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
            maxResults: amount,
            type: ["video"],
            order: orderSanitized,
            channelId: channelId?.trim() || undefined,
            safeSearch: safeSearchSanitized
        });
        const results = res.data.items ?? [];
        if (!results.length)
            return this.success(false);
        const videos = results.map(v => ({
            videoId: v.id?.videoId ?? "unknown",
            title: v.snippet?.title ?? "Unknown Title",
            url: `https://www.youtube.com/watch?v=${v.id?.videoId ?? "unknown"}`,
            channelId: v.snippet?.channelId ?? "unknown",
            channelTitle: v.snippet?.channelTitle ?? "unknown",
            publishedAt: v.snippet?.publishedAt ?? "unknown",
            thumbnail: v.snippet?.thumbnails?.high?.url ?? null,
            description: v.snippet?.description ?? "",
            liveBroadcastContent: v.snippet?.liveBroadcastContent ?? "none"
        }));
        return this.success(JSON.stringify(videos, null, 2));
    }
});
//# sourceMappingURL=searchVideo.js.map