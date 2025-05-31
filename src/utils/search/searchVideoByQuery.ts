import { youtube_v3 } from "googleapis"

interface SearchOptions {
    order?: "date" | "rating" | "relevance" | "title" | "videoCount" | "viewCount"
    type?: "video" | "playlist"
    channelId?: string
    safeSearch?: "none" | "moderate" | "strict"
}

const VALID_ORDER = ["date", "rating", "relevance", "title", "videoCount", "viewCount"]
const VALID_TYPE = ["video", "playlist"]
const VALID_SAFESEARCH = ["none", "moderate", "strict"]

export async function searchVideoByQuery(
    youtube: youtube_v3.Youtube,
    query: string,
    max: number = 5,
    options: Record<string, any> = {}
): Promise<youtube_v3.Schema$SearchResult[]> {
    const order = VALID_ORDER.includes(options.order) ? options.order : undefined
    const type = VALID_TYPE.includes(options.type) ? options.type : "video"
    const safeSearch = VALID_SAFESEARCH.includes(options.safeSearch) ? options.safeSearch : undefined

    const res = await youtube.search.list({
        part: ["snippet"],
        q: query,
        maxResults: max,
        type: [type],
        order,
        channelId: options.channelId,
        safeSearch
    })

    return res.data.items ?? []
}
