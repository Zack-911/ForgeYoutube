import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$getLatestVideo",
  version: "1.0.0",
  description: "Gets the most recent video from a YouTube channel.",
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "channel",
      description: "Channel ID or handle (e.g. UC... or @username)",
      required: true,
      rest: false,
      type: ArgType.String
    }
  ],
  output: ArgType.Json,
  async execute(ctx, [id]) {
    const channel = String(id || "").trim()
    const yt = ctx.client.youtube
    if (!yt) return this.customError("YouTube is not configured.")

    try {
      const page = await yt.getChannel(channel)
      const videos = await page.getVideos()
      const latest = videos.items?.[0]
      if (!latest) return this.customError("No videos found.")

      return this.success(JSON.stringify({
        id: latest.id,
        title: latest.title,
        duration: latest.duration,
        views: latest.view_count,
        uploaded: latest.published,
        url: `https://www.youtube.com/watch?v=${latest.id}`
      }, null, 2))
    } catch (err) {
      return this.customError("Failed to fetch latest video: " + (err as Error).message)
    }
  }
})
