"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$getVideoEngagement',
    description: 'Returns basic engagement stats for a YouTube video (views, likes, comments)',
    version: '1.0.0',
    output: forgescript_1.ArgType.Json,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'videoId',
            description: 'YouTube video ID',
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
        const info = await youtube.getInfo(videoId).catch(() => null);
        if (!info || !info.basic_info)
            return this.customError('Could not fetch video info');
        const stats = info.basic_info;
        const ping = Date.now() - start;
        return this.success(JSON.stringify({
            success: true,
            ping,
            results: {
                title: stats.title,
                views: stats.view_count,
                likes: stats.like_count,
                isLive: stats.is_live,
                videoUrl: `https://youtube.com/watch?v=${videoId}`
            }
        }, null, 2));
    }
});
//# sourceMappingURL=getVideoEngagement.js.map