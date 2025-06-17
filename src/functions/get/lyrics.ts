import { ArgType, NativeFunction } from '@tryforge/forgescript'
import type { Innertube } from 'youtubei.js'

export default new NativeFunction({
  name: '$getMusicLyrics',
  description: 'Fetches lyrics for a YouTube Music track (video ID)',
  version: '1.0.0',
  output: ArgType.Json,
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'videoId',
      description: 'YouTube Music video ID',
      type: ArgType.String,
      required: true,
      rest: false
    }
  ],
  async execute(ctx, args) {
    const videoId = String(args[0] || '').trim()
    if (!videoId) return this.customError('Missing video ID')

    const youtube = ctx.client.youtube as Innertube
    if (!youtube) return this.customError('YouTube client is not initialized')

    const start = Date.now()
    const lyricsData = await youtube.music.getLyrics(videoId).catch(() => null)

    if (!lyricsData || !lyricsData.description || !lyricsData.footer)
      return this.customError('Lyrics not available')

    const description = lyricsData.description.text
    const footer = lyricsData.footer.text
    const ping = Date.now() - start

    return this.success(JSON.stringify({
      success: true,
      ping,
      results: {
        lyrics: description,
        footer
      }
    }, null, 2))
  }
})