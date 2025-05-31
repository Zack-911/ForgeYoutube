export async function searchVideoByQuery(youtube: youtube_v3.Youtube, query: string, max = 5) {
    const res = await youtube.search.list({
        part: ["snippet"],
        q: query,
        type: ["video"],
        maxResults: max,
    })
    return res.data.items ?? []
}