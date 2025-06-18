import { ArgType, NativeFunction } from "@tryforge/forgescript"
import type { MusicQueue } from "youtubei.js/dist/src/parser/nodes"

export default new NativeFunction({
  name: "$getLatestVideo",
  version: "1.0.3",
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
      const videosTab = await page.getVideos()
      const section = videosTab.current_tab?.content

      if (!section || section.type == "MusicQueue")
        return this.customError("Expected MusicQueue in channel videos tab.")

      const MusicQueue = section as MusicQueue
      const items = MusicQueue.content

      if (!Array.isArray(items) || items.length === 0)
        return this.customError("No videos found.")

      const latest = items[0] as any

      return this.success(JSON.stringify({
        id: latest,
      }, null, 2))
    } catch (err) {
      return this.customError("Failed to fetch latest video: " + (err as Error).message)
    }
  }
})
