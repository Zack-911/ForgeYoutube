"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$youtubeChannelSearch",
    aliases: ["$ytChannelSearch", "$searchYtChannel", "$searchYoutubeChannel"],
    version: "1.0.0",
    description: "Searches YouTube and returns the top channels in JSON format.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "query",
            description: "The search query to look up on YouTube",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "limit",
            description: "Number of channels to return (default 5)",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "sortBy",
            description: "Sort results by: relevance, rating, upload_date, view_count",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        }
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [query, limit, sortBy]) {
        const q = query.trim();
        if (!q.length)
            return this.customError("Query cannot be empty");
        if (!ctx.client.youtube)
            return this.customError("YouTube API is not configured");
        const lim = typeof limit === "number" && limit > 0 ? limit : 5;
        const filters = { type: "channel" };
        const sb = (sortBy ?? "").trim().toLowerCase();
        const validSortBy = ["relevance", "rating", "upload_date", "view_count"];
        if (sb && !validSortBy.includes(sb))
            return this.customError(`Invalid sortBy: ${sb}`);
        if (sb)
            filters.sort_by = sb;
        const start = Date.now();
        let search;
        try {
            search = await ctx.client.youtube.search(q, filters);
        }
        catch (e) {
            return this.customError("YouTube search failed: " + (e?.message || "unknown error"));
        }
        const channels = search?.channels || [];
        if (!Array.isArray(channels) || channels.length === 0)
            return this.customError("No channels found for that query");
        const sliced = channels.slice(0, lim);
        const result = sliced.map((c) => ({
            id: c.id,
            name: c.author.name,
            isModerator: c.author.is_moderator,
            isVerified: c.author.is_verified,
            isVerifiedArtist: c.author.is_verified_artist,
            subscriberCount: c.subscriber_count,
            videoCount: c.video_count,
            description: c.description_snippet,
            url: `https://youtube.com/channel/${c.id}`
        }));
        const ping = Date.now() - start;
        return this.success(JSON.stringify({
            success: true,
            ping,
            results: result
        }, null, 2));
    }
});
//# sourceMappingURL=youtubeChannelSearch.js.map