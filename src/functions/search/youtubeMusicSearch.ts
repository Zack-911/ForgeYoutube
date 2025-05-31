import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$ytMusicSearch",
  version: "1.0.0",
  description: "Searches YouTube Music and returns top songs.",
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "query",
      description: "Query to search on YouTube Music",
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.String,
  async execute(ctx, [query]) {
    const searchQuery = query.trim()
    if (!searchQuery.length) return this.customError("Query cannot be empty")
    if (!ctx.client.youtube) return this.customError("YouTube API is not configured")

    const search = await ctx.client.youtube.music.search(searchQuery)
    const songs = search.songs?.contents || []

    if (!songs.length) return this.customError("No songs found")

    const top = songs.slice(0, 5).map(song => ({
      name: song.title,
      artist: song.artists?.[0]?.name || "Unknown",
      id: song.id,
      url: `https://music.youtube.com/watch?v=${song.id}`,
      album: song.album?.name || null,
    }))

    return this.success(JSON.stringify(top, null, 2))
  }
})
