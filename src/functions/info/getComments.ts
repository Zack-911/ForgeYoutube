import { ArgType, NativeFunction } from "@tryforge/forgescript"
import type { Innertube } from "youtubei.js"
import type { CommentThread } from "youtubei.js/dist/src/parser/nodes"

export default new NativeFunction({
  name: "$getComments",
  description: "Fetches top-level comments for a video",
  version: "1.0.0",
  output: ArgType.Json,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "videoId",
      description: "YouTube video ID",
      required: true,
      rest: false,
      type: ArgType.String
    },
    {
      name: "limit",
      description: "Number of comments to return",
      required: false,
      rest: false,
      type: ArgType.Number
    }
  ],
  async execute(ctx, [videoId, limit]) {
    const id = String(videoId || "").trim()
    if (!id) return this.customError("Missing video ID")

    const youtube = ctx.client.youtube as Innertube
    if (!youtube) return this.customError("YouTube client not available")

    const start = Date.now()
    const comments = await youtube.getComments(id).catch(() => null)
    const ping = Date.now() - start

    if (!comments || !Array.isArray(comments.contents))
      return this.customError("No comments found")

    const lim = typeof limit === "number" && limit > 0 ? limit : 10

    const result = comments.contents.slice(0, lim).map((thread: CommentThread) => {
      const c = thread.comment
      return {
        id: c?.comment_id,
        author: c?.author?.name,
        content: c?.content?.toString(),
        likes: c?.like_count,
        published: c?.published_time,
        url: `https://youtube.com/watch?v=${id}&lc=${c?.comment_id}`
      }
    })

    return this.success(JSON.stringify({
      success: true,
      ping,
      results: result
    }, null, 2))
  }
})