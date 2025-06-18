import { ForgeExtension, ForgeClient, Logger } from "@tryforge/forgescript";
import { Innertube, Log } from "youtubei.js";

export let ForgeYoutubeInstance: ForgeYoutube | null = null;

export class ForgeYoutube extends ForgeExtension {
    readonly name = "forge.youtube";
    readonly version = require("../package.json").version;
    readonly description = "Integration layer for YouTube APIs";

    public client!: ForgeClient;
    public youtube?: Innertube;

    async init(client: ForgeClient): Promise<void> {
        this.client = client;
        ForgeYoutubeInstance = this;

            this.youtube = await Innertube.create();
            Log.setLevel(Log.Level.NONE);

            client.youtube = this.youtube;
            client.lastPlaylistSearch = undefined;

        this.load(__dirname + "/functions");
    }
}