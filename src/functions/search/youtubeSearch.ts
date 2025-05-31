import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$youtubeSearch",
  aliases: ["$ytSearch", "$searchYt", "$searchYoutube"],
  version: "1.0.0",
  description: "Searches YouTube and returns the top results in a clean readable JSON format.",
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "query",
      description: "The search query to look up on YouTube",
      required: true,
      rest: false,
      type: ArgType.String,
    }
  ],
  output: ArgType.String,
  async execute(ctx, [query]) {
    const trimmed = query.trim()
    if (!trimmed.length) return this.customError("Query cannot be empty")
    if (!ctx.client.youtube) return this.customError("YouTube API is not configured")

    const search = await ctx.client.youtube.search(trimmed)

    const results = search.results
      .filter(x => x.type === "Video")
      .map(x => x as any)
      .filter(x => x?.title?.text && x?.author?.name && x?.id)
      .slice(0, 5)

    if (!results.length) return this.customError("No videos found")

    const out = results.map(v => ({
      title: v.title.text,
      videoId: v.id,
      channelName: v.author.name,
      channeId: v.author.id,
      url: `https://youtube.com/watch?v=${v.id}`
    }))

    return this.success(JSON.stringify(out, null, 2))
  }
})
