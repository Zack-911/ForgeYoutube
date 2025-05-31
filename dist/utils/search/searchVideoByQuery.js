"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVideoByQuery = void 0;
const VALID_ORDER = ["date", "rating", "relevance", "title", "videoCount", "viewCount"];
const VALID_TYPE = ["video", "playlist"];
const VALID_SAFESEARCH = ["none", "moderate", "strict"];
async function searchVideoByQuery(youtube, query, max = 5, options = {}) {
    const order = VALID_ORDER.includes(options.order) ? options.order : undefined;
    const type = VALID_TYPE.includes(options.type) ? options.type : "video";
    const safeSearch = VALID_SAFESEARCH.includes(options.safeSearch) ? options.safeSearch : undefined;
    const res = await youtube.search.list({
        part: ["snippet"],
        q: query,
        maxResults: max,
        type: [type],
        order,
        channelId: options.channelId,
        safeSearch
    });
    return res.data.items ?? [];
}
exports.searchVideoByQuery = searchVideoByQuery;
//# sourceMappingURL=searchVideoByQuery.js.map