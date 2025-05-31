import { youtube_v3 } from "googleapis";
export declare function fetchVideoById(youtube: youtube_v3.Youtube, videoId: string): Promise<youtube_v3.Schema$Video | null>;
export declare function fetchVideoTitle(youtube: youtube_v3.Youtube, videoId: string): Promise<string | null>;
export declare function fetchVideoStats(youtube: youtube_v3.Youtube, videoId: string): Promise<{
    views: number;
    likes: number;
    comments: number;
} | null>;
export declare function fetchLatestVideo(youtube: youtube_v3.Youtube, channelId: string): Promise<youtube_v3.Schema$SearchResult | null>;
export declare function fetchChannelStats(youtube: youtube_v3.Youtube, channelId: string): Promise<{
    subs: number;
    views: number;
    videos: number;
} | null>;
export declare function searchVideoByQuery(youtube: youtube_v3.Youtube, query: string, max?: number): Promise<youtube_v3.Schema$SearchResult[]>;
export declare function subscribeToChannelUpload(_: youtube_v3.Youtube, __: string): Promise<boolean>;
//# sourceMappingURL=youtube.d.ts.map