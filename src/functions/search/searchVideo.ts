import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { searchVideoByQuery } from "../../utils/search/searchVideoByQuery"

export default new NativeFunction({
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
            type: ArgType.String,
        },
        {
            name: "limit",
            description: "Max number of results (max 50)",
            required: false,
            rest: false,
            type: ArgType.Number,
        },
        {
            name: "order",
            description: "Sort order: date, rating, relevance, title, videoCount, viewCount",
            required: false,
            rest: false,
            type: ArgType.String,
        },
        {
            name: "type",
            description: "Result type: video, playlist",
            required: false,
            rest: false,
            type: ArgType.String,
        },
        {
            name: "channelId",
            description: "Only return results from this channel ID",
            required: false,
            rest: false,
            type: ArgType.String,
        },
        {
            name: "safeSearch",
            description: "Safe search level: none, moderate, strict",
            required: false,
            rest: false,
            type: ArgType.String,
        },
    ],
    output: ArgType.String,
    async execute(ctx, [
        query,
        limit,
        order,
        type,
        channelId,
        safeSearch
    ]) {
        if (!ctx.client.youtube) return this.customError("YouTube API is not configured.")

        const amount = Math.floor(limit ?? 5)
        if (amount < 1) return this.customError("Limit must be at least 1.")
        if (amount > 50) return this.customError("Google API does not allow more than 50 results.")

        const results = await searchVideoByQuery(ctx.client.youtube, query.trim(), amount, {
            order: order ?? undefined,
            type: type ?? "video",
            channelId: channelId?.trim() || undefined,
            safeSearch: safeSearch ?? undefined
        })

        if (!results.length) return this.customError("No videos found.")

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
        }))

        return this.success(JSON.stringify(videos, null, 2))
    }
})
