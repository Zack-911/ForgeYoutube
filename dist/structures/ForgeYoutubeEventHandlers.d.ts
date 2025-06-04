import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
export interface FYEvents {
    channelUpload: [
        {
            channelID: any | null;
            videoID: any | null;
        }
    ];
}
export declare class FYEventHandler<T extends keyof FYEvents> extends BaseEventHandler<FYEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=ForgeYoutubeEventHandlers.d.ts.map