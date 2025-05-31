"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVideoByQuery = void 0;
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
//# sourceMappingURL=searchVideoByQuery.js.map