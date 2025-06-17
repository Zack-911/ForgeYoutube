import { ForgeExtension, ForgeClient, EventManager } from "@tryforge/forgescript";
import { ForgeYoutubeCommandManager } from "./structures/ForgeYoutubeCommandManager";
import { ForgeYoutubeEventManagerName } from "./constants";
import { FYEvents } from "./structures/ForgeYoutubeEventHandlers";
import { TypedEmitter } from "tiny-typed-emitter";
import { Innertube, ClientType } from "youtubei.js";

export interface IForgeYoutubeOptions {
    youtube?: {
        cookie?: string;
    };
    events?: Array<keyof FYEvents>;
}

export type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never;
};

export let ForgeYoutubeInstance: ForgeYoutube | null = null;

export class ForgeYoutube extends ForgeExtension {
    readonly name = "forge.youtube";
    readonly version = require("../package.json").version;
    readonly description = "Integration layer for YouTube APIs";

    public client!: ForgeClient;
    public emitter = new TypedEmitter<TransformEvents<FYEvents>>();
    public commandManager!: ForgeYoutubeCommandManager;
    public youtube?: Innertube;

    constructor(private readonly config: IForgeYoutubeOptions) {
        super();
    }

    async init(client: ForgeClient): Promise<void> {
        this.client = client;
        this.commandManager = new ForgeYoutubeCommandManager(client);
        ForgeYoutubeInstance = this;

        if (this.config.youtube) {
            this.youtube = await Innertube.create({
                cookie: this.config.youtube.cookie,
            });

            client.youtube = this.youtube;
            client.lastPlaylistSearch = undefined;
        }

        EventManager.load(ForgeYoutubeEventManagerName, __dirname + "/events");
        this.load(__dirname + "/functions");

        if (this.config.events?.length)
            this.client.events.load(ForgeYoutubeEventManagerName, this.config.events);
        else
            this.client.events.load(ForgeYoutubeEventManagerName);
    }
}
