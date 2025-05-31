import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { searchVideoByQuery } from "../../utils/search/searchVideoByQuery"

export default new NativeFunction({
    name: "$searchVideo",
    version: "1.0.0",
    description: "Searches YouTube videos and returns a JSON array of video details.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "query",
            description: "The search query for videos",
            required: true,
            rest: false,
            type: ArgType.String,
        },
        {
            name: "limit",
            description: "Maximum number of results (max 50)",
            required: false,
            rest: false,
            type: ArgType.Number,
        },
    ],
    output: ArgType.String,
    async execute(ctx, [query, limit]) {
        if (!ctx.client.youtube) return this.customError("YouTube API is not configured.")

        const amount = Math.floor(limit ?? 5)
        if (amount < 1) return this.customError("Limit must be at least 1.")
        if (amount > 50) return this.customError("Google API does not allow more than 50 results.")

        const results = await searchVideoByQuery(ctx.client.youtube, query.trim(), amount)
        if (!results.length) return this.customError("No videos found.")

        const videos = results.map(v => ({
            videoId: v.id?.videoId ?? "unknown",
            title: v.snippet?.title ?? "Unknown Title",
            url: `https://www.youtube.com/watch?v=${v.id?.videoId ?? "unknown"}`,
            channelId: v.snippet?.channelId ?? "unknown",
            channelTitle: v.snippet?.channelTitle ?? "unknown",
            publishedAt: v.snippet?.publishedAt ?? "unknown",
            thumbnail: v.snippet?.thumbnails?.high?.url ?? null
        }))

        return this.success(JSON.stringify(videos, null, 2))
    }
})
