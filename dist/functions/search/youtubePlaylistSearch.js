"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$youtubePlaylistSearch",
    aliases: ["$ytPlaylistSearch", "$searchYtPlaylist", "$searchYoutubePlaylist"],
    version: "1.0.0",
    description: "Searches YouTube and returns the top playlists in JSON format. Supports filters.",
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
            name: "uploadDate",
            description: "Upload date filter: all, hour, today, week, month, year",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "duration",
            description: "Video duration filter: all, short, medium, long",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "sortBy",
            description: "Sort results by: relevance, rating, upload_date, view_count",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "features",
            description: "Comma-separated features: hd, subtitles, 4k, live, etc.",
            required: false,
            rest: false,
            type: forgescript_1.ArgType.String,
        }
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [query, uploadDate, duration, sortBy, features]) {
        const q = query.trim();
        if (!q.length)
            return this.customError("Query cannot be empty");
        if (!ctx.client.youtube)
            return this.customError("YouTube API is not configured");
        const filters = { type: "playlist" };
        const ud = (uploadDate ?? "").trim().toLowerCase();
        const dr = (duration ?? "").trim().toLowerCase();
        const sb = (sortBy ?? "").trim().toLowerCase();
        const ft = (features ?? "").trim();
        const validUploadDates = ["all", "hour", "today", "week", "month", "year"];
        const validDurations = ["all", "short", "medium", "long"];
        const validSortBy = ["relevance", "rating", "upload_date", "view_count"];
        if (ud && !validUploadDates.includes(ud))
            return this.customError(`Invalid uploadDate: ${ud}`);
        if (dr && !validDurations.includes(dr))
            return this.customError(`Invalid duration: ${dr}`);
        if (sb && !validSortBy.includes(sb))
            return this.customError(`Invalid sortBy: ${sb}`);
        if (ud)
            filters.upload_date = ud;
        if (dr)
            filters.duration = dr;
        if (sb)
            filters.sort_by = sb;
        if (ft.length)
            filters.features = ft.split(",").map(f => f.trim().toLowerCase()).filter(Boolean);
        const start = Date.now();
        let search;
        try {
            search = await ctx.client.youtube.search(q, filters);
        }
        catch (e) {
            return this.customError("YouTube search failed: " + (e?.message || "unknown error"));
        }
        const playlists = search?.playlists || [];
        if (!Array.isArray(playlists) || playlists.length === 0)
            return this.customError("No playlists found for that query");
        const sliced = playlists.slice(0, 5);
        const result = sliced.map((p) => ({
            type: p.content_type,
            id: p.content_id,
            videoCount: p.video_count?.text,
            url: `https://youtube.com/playlist?list=${p.content_id}`
        }));
        const ping = Date.now() - start;
        return this.success(JSON.stringify({
            success: true,
            ping,
            results: result
        }, null, 2));
    }
});
//# sourceMappingURL=youtubePlaylistSearch.js.map