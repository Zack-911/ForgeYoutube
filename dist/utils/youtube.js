"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToChannelUpload = exports.searchVideoByQuery = exports.fetchChannelStats = exports.fetchLatestVideo = exports.fetchVideoStats = exports.fetchVideoTitle = exports.fetchVideoById = void 0;
async function fetchVideoById(youtube, videoId) {
    const res = await youtube.videos.list({
        part: ["snippet", "statistics"],
        id: [videoId],
        maxResults: 1,
    });
    return res.data.items?.[0] ?? null;
}
exports.fetchVideoById = fetchVideoById;
async function fetchVideoTitle(youtube, videoId) {
    const video = await fetchVideoById(youtube, videoId);
    return video?.snippet?.title ?? null;
}
exports.fetchVideoTitle = fetchVideoTitle;
async function fetchVideoStats(youtube, videoId) {
    const video = await fetchVideoById(youtube, videoId);
    if (!video)
        return null;
    return {
        views: parseInt(video.statistics?.viewCount || "0"),
        likes: parseInt(video.statistics?.likeCount || "0"),
        comments: parseInt(video.statistics?.commentCount || "0"),
    };
}
exports.fetchVideoStats = fetchVideoStats;
async function fetchLatestVideo(youtube, channelId) {
    const res = await youtube.search.list({
        part: ["snippet"],
        channelId,
        order: "date",
        maxResults: 1,
    });
    return res.data.items?.[0] ?? null;
}
exports.fetchLatestVideo = fetchLatestVideo;
async function fetchChannelStats(youtube, channelId) {
    const res = await youtube.channels.list({
        part: ["statistics"],
        id: [channelId],
    });
    const channel = res.data.items?.[0];
    if (!channel || !channel.statistics)
        return null;
    return {
        subs: parseInt(channel.statistics.subscriberCount || "0"),
        views: parseInt(channel.statistics.viewCount || "0"),
        videos: parseInt(channel.statistics.videoCount || "0"),
    };
}
exports.fetchChannelStats = fetchChannelStats;
async function searchVideoByQuery(youtube, query, max = 5) {
    const res = await youtube.search.list({
        part: ["snippet"],
        q: query,
        type: ["video"],
        maxResults: max,
    });
    return res.data.items ?? [];
}
exports.searchVideoByQuery = searchVideoByQuery;
async function subscribeToChannelUpload(_, __) {
    // Dummy placeholder for now, you’d add PubSubHubbub support or polling later
    return true;
}
exports.subscribeToChannelUpload = subscribeToChannelUpload;
//# sourceMappingURL=youtube.js.map