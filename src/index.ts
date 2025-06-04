import { ForgeExtension, ForgeClient, EventManager } from "@tryforge/forgescript";
import { ForgeYoutubeCommandManager } from "./structures/ForgeYoutubeCommandManager";
import { ForgeYoutubeEventManagerName } from "./constants";
import { FYEvents } from "./structures/ForgeYoutubeEventHandlers";
import { TypedEmitter } from "tiny-typed-emitter";
import { Innertube } from "youtubei.js";
import { setupChannelUploadRoute } from "./routes/channelUpload"

export interface IForgeSocialOptions {
    youtube?: {
        cookie?: string
    }
}

export type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never
}

export let forgeSocialInstance: ForgeYoutube | null = null
export class ForgeYoutube extends ForgeExtension {
    readonly name = "forge.youtube"
    readonly version = require("../package.json").version
    readonly description = "Integration layer for YouTube APIs"
    public forgeClient!: ForgeClient
    public emitter = new TypedEmitter<TransformEvents<FYEvents>>()
    public commandManager!: ForgeYoutubeCommandManager
    public youtube?: Innertube

    constructor(private readonly config: IForgeSocialOptions) {
        super()
    }

    async init(client: ForgeClient): Promise<void> {
        this.forgeClient = client
        this.commandManager = new ForgeYoutubeCommandManager(client)
        forgeSocialInstance = this

        if (this.config.youtube) {
            this.youtube = await Innertube.create({
                cookie: this.config.youtube.cookie,
            })

            client.youtube = this.youtube
            client.lastPlaylistSearch = undefined
        }

        EventManager.load(ForgeYoutubeEventManagerName, __dirname + "/events")
        this.load(__dirname + "/functions")

        client.events.load(ForgeYoutubeEventManagerName)
        setupChannelUploadRoute(8085)
    }
}