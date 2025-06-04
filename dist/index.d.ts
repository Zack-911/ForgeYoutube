import { ForgeExtension, ForgeClient } from "@tryforge/forgescript";
import { ForgeYoutubeCommandManager } from "./structures/ForgeYoutubeCommandManager";
import { FYEvents } from "./structures/ForgeYoutubeEventHandlers";
import { TypedEmitter } from "tiny-typed-emitter";
import { Innertube } from "youtubei.js";
export interface IForgeSocialOptions {
    youtube?: {
        cookie?: string;
    };
}
export type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never;
};
export declare let forgeSocialInstance: ForgeYoutube | null;
export declare class ForgeYoutube extends ForgeExtension {
    private readonly config;
    readonly name = "forge.youtube";
    readonly version: any;
    readonly description = "Integration layer for YouTube APIs";
    forgeClient: ForgeClient;
    emitter: TypedEmitter<TransformEvents<FYEvents>>;
    commandManager: ForgeYoutubeCommandManager;
    youtube?: Innertube;
    constructor(config: IForgeSocialOptions);
    init(client: ForgeClient): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map