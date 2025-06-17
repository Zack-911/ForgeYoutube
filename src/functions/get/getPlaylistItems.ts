import { ArgType, NativeFunction } from "@tryforge/forgescript"
import type { Innertube } from "youtubei.js"
import type { PlaylistVideo } from "youtubei.js/dist/src/parser/nodes"

export default new NativeFunction({
  name: "$getPlaylistItems",
  description: "Fetches items (videos) from a playlist",
  version: "1.0.0",
  output: ArgType.Json,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "playlistId",
      description: "YouTube playlist ID",
      required: true,
      rest: false,
      type: ArgType.String
    },
    {
      name: "limit",
      description: "Maximum number of items to return",
      required: false,
      rest: false,
      type: ArgType.Number
    }
  ],
  async execute(ctx, [playlistId, limit]) {
    const id = String(playlistId || "").trim()
    if (!id) return this.customError("Missing playlist ID")

    const youtube = ctx.client.youtube as Innertube
    if (!youtube) return this.customError("YouTube client not available")

    const feed = await youtube.getPlaylist(id).catch(() => null)
    if (!feed || !Array.isArray(feed.videos))
      return this.customError("Invalid or empty playlist")

    const lim = typeof limit === "number" && limit > 0 ? limit : 25

    const videos = (feed.videos as PlaylistVideo[]).slice(0, lim).map((v) => ({
      id: v.id,
      index: v.index.text,
      title: v.title.text,
      duration: v.duration.text,
      durationSecs: v.duration.seconds,
      author: v.author?.name,
      thumbnail: v.thumbnails,
      url: `https://youtube.com/watch?v=${v.id}`
    }))

    return this.success(JSON.stringify({
      success: true,
      results: videos
    }, null, 2))
  }
})