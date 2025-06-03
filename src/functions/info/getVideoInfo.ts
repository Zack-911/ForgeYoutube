import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$getVideoStats",
    version: "1.1.0",
  aliases: ["$ytVideoStats", "$youtubeStats", "$getYtStats"],
  description: "Returns views, likes, comments count for a video",
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "videoID",
      description: "The ID of the YouTube video",
      required: true,
      rest: false,
      type: ArgType.String,
    }
  ],
  output: ArgType.Json,
  async execute(ctx, [videoID]) {
    const id = videoID.trim()
    if (!id.length) return this.customError("Video ID cannot be empty")
    if (!ctx.client.youtube) return this.customError("YouTube API is not configured")

    const start = Date.now()

    let info
    try {
      info = await ctx.client.youtube.getInfo(id)
    } catch (e: any) {
      return this.customError("Failed to fetch video info: " + (e?.message || "unknown error"))
    }

    const stats = info.primary_info
    const secondary = info.secondary_info
    const comments = ctx.client.youtube.getComments(id)
    const raw = (await comments).contents

    if (!stats) return this.customError("No primary info found for this video")

    const filteredComments = Array.isArray(raw)
      ? raw.map((item: any) => ({
          content: item?.comment?.content?.text ?? null,
          published_time: item?.comment?.published_time?.text ?? null,
          author_is_channel_owner: item?.comment?.author_is_channel_owner ?? null,
          reply_count: item?.comment?.reply_count ?? null,
          is_member: item?.comment?.author?.is_moderator ?? null,
          author_id: item?.comment?.author?.id ?? null,
          comment_id: item?.comment?.comment_id ?? null
        }))
      : null

    const ping = Date.now() - start

    return this.success(JSON.stringify({
      success: true,
      ping: ping,
      id: id,
      title: stats?.title?.text ?? null,
      description: secondary?.description?.text ?? null,
      originalViews: stats?.view_count?.original_view_count ?? null,
      shortViews: stats?.view_count?.extra_short_view_count ?? null,
      totalViews: stats?.view_count?.view_count ?? null,
      playlist: info.playlist ?? null,
      gameTitle: info.game_info?.title?.text ?? null,
      merchandise: info.merchandise ?? null,
      comments: filteredComments,
      url: `https://youtube.com/watch?v=${id}`
    }, null, 2))
  }
})
