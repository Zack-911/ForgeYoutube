import { ForgeExtension, ForgeClient, EventManager } from "@tryforge/forgescript"
import { ForgeYoutubeCommandManager } from "./structures/ForgeYoutubeCommandManager"
import { ForgeYoutubeEventManagerName } from "./constants"
import { IForgeYoutubeEvents } from "./structures/ForgeYoutubeEventHandlers"
import { TypedEmitter } from "tiny-typed-emitter"
import { Innertube } from "youtubei.js"
import { google } from "googleapis"

export interface IForgeSocialOptions {
    youtube?: {
        cookie?: string // optional auth, can be used for better quota
    }
}

export type ForgeSocialEventMap<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => any : never
}

export class ForgeSocial extends ForgeExtension {
    readonly name = "forge.youtube"
    readonly version = require("../package.json").version
    readonly description = "Integration layer for YouTube APIs"

    public forgeClient!: ForgeClient
    public readonly emitter = new TypedEmitter<ForgeSocialEventMap<IForgeYoutubeEvents>>()
    public commandManager!: ForgeYoutubeCommandManager

    public youtube?: Innertube

    constructor(private readonly config: IForgeSocialOptions) {
        super()
    }

    async init(client: ForgeClient): Promise<void> {
        this.forgeClient = client
        this.commandManager = new ForgeYoutubeCommandManager(client)

        if (this.config.youtube) {
            this.youtube = await Innertube.create({
                cookie: this.config.youtube.cookie,
            })
            client.youtube = this.youtube
        }

        EventManager.load(ForgeYoutubeEventManagerName, `${__dirname}/events`)
        this.load(`${__dirname}/functions`)

        client.events.load(ForgeYoutubeEventManagerName)
    }
}

declare module "@tryforge/forgescript" {
    interface ForgeClient {
        youtube?: Innertube
    }
}
