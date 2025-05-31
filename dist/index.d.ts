import { ForgeExtension, ForgeClient } from "@tryforge/forgescript";
import { ForgeYoutubeCommandManager } from "./structures/ForgeYoutubeCommandManager";
import { IForgeYoutubeEvents } from "./structures/ForgeYoutubeEventHandlers";
import { TypedEmitter } from "tiny-typed-emitter";
import { Innertube } from "youtubei.js";
export interface IForgeSocialOptions {
    youtube?: {
        cookie?: string;
    };
}
export type ForgeSocialEventMap<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never;
};
export declare class ForgeSocial extends ForgeExtension {
    private readonly config;
    readonly name = "forge.youtube";
    readonly version: any;
    readonly description = "Integration layer for YouTube APIs";
    forgeClient: ForgeClient;
    readonly emitter: TypedEmitter<ForgeSocialEventMap<IForgeYoutubeEvents>>;
    commandManager: ForgeYoutubeCommandManager;
    youtube?: Innertube;
    constructor(config: IForgeSocialOptions);
    init(client: ForgeClient): Promise<void>;
}
declare module "@tryforge/forgescript" {
    interface ForgeClient {
        youtube?: Innertube;
    }
}
//# sourceMappingURL=index.d.ts.map