import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
export interface IForgeYoutubeEvents {
    posted: [any];
    error: [Error];
    voted: [any];
}
export declare class ForgeSocialEventHandler<T extends keyof IForgeYoutubeEvents> extends BaseEventHandler<IForgeYoutubeEvents, T> {
    register(client: ForgeClient): void;
}
//# sourceMappingURL=ForgeYoutubeEventHandlers.d.ts.map