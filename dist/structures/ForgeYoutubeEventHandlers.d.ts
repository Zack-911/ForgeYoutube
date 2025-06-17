import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { channelUpload } from "../types/events";
export interface FYEvents {
    channelUpload: [channelUpload];
    error: [Error];
}
export declare class FYEventHandler<T extends keyof FYEvents> extends BaseEventHandler<FYEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=ForgeYoutubeEventHandlers.d.ts.map