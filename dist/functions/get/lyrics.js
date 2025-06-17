"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$getMusicLyrics',
    description: 'Fetches lyrics for a YouTube Music track (video ID)',
    version: '1.0.0',
    output: forgescript_1.ArgType.Json,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'videoId',
            description: 'YouTube Music video ID',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, args) {
        const videoId = String(args[0] || '').trim();
        if (!videoId)
            return this.customError('Missing video ID');
        const youtube = ctx.client.youtube;
        if (!youtube)
            return this.customError('YouTube client is not initialized');
        const start = Date.now();
        const lyricsData = await youtube.music.getLyrics(videoId).catch(() => null);
        if (!lyricsData || !lyricsData.description || !lyricsData.footer)
            return this.customError('Lyrics not available');
        const description = lyricsData.description.text;
        const footer = lyricsData.footer.text;
        const ping = Date.now() - start;
        return this.success(JSON.stringify({
            success: true,
            ping,
            results: {
                lyrics: description,
                footer
            }
        }, null, 2));
    }
});
//# sourceMappingURL=lyrics.js.map