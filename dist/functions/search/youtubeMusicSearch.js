"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$ytMusicSearchFiltered",
    version: "1.0.0",
    description: "Search YouTube Music with filter and returns top results.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "query",
            description: "Search query for YouTube Music",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: "filter",
            description: "Filter type: all, song, video, album, playlist, artist",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [query, filter]) {
        const trimmedQuery = query.trim();
        const trimmedFilter = filter.trim().toLowerCase();
        const allowedFilters = ['all', 'song', 'video', 'album', 'playlist', 'artist'];
        if (!trimmedQuery.length)
            return this.customError("Query cannot be empty");
        if (!allowedFilters.includes(trimmedFilter))
            return this.customError("Invalid filter type");
        if (!ctx.client.youtube)
            return this.customError("YouTube API is not configured");
        let search = await ctx.client.youtube.music.search(trimmedQuery);
        if (trimmedFilter !== 'all') {
            try {
                search = await search.applyFilter(trimmedFilter);
            }
            catch {
                return this.customError("Failed to apply filter");
            }
        }
        let results = [];
        switch (trimmedFilter) {
            case 'song':
                results = search.songs?.contents || [];
                break;
            case 'video':
                results = search.videos?.contents || [];
                break;
            case 'album':
                results = search.albums?.contents || [];
                break;
            case 'playlist':
                results = search.playlists?.contents || [];
                break;
            case 'artist':
                results = search.artists?.contents || [];
                break;
            case 'all':
            default:
                results = search.songs?.contents || [];
                break;
        }
        if (!results.length)
            return this.customError("No results found");
        const mapped = results.slice(0, 5).map(item => {
            return {
                id: item.id || null,
                title: item.title?.text || item.name || "Unknown",
                artist: item.artists?.map((a) => a.name).join(", ") || item.artist || null,
                url: item.id && (trimmedFilter === 'video' || trimmedFilter === 'all')
                    ? `https://music.youtube.com/watch?v=${item.id}`
                    : item.id && (trimmedFilter === 'playlist')
                        ? `https://music.youtube.com/playlist?list=${item.id}`
                        : item.id && (trimmedFilter === 'album')
                            ? `https://music.youtube.com/playlist?list=${item.id}`
                            : null,
                type: trimmedFilter,
            };
        });
        return this.success(JSON.stringify(mapped, null, 2));
    }
});
//# sourceMappingURL=youtubeMusicSearch.js.map