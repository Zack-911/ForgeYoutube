"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeSocial = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const ForgeYoutubeCommandManager_1 = require("./structures/ForgeYoutubeCommandManager");
const constants_1 = require("./constants");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const youtubei_js_1 = require("youtubei.js");
class ForgeSocial extends forgescript_1.ForgeExtension {
    config;
    name = "forge.youtube";
    version = require("../package.json").version;
    description = "Integration layer for YouTube APIs";
    forgeClient;
    emitter = new tiny_typed_emitter_1.TypedEmitter();
    commandManager;
    youtube;
    constructor(config) {
        super();
        this.config = config;
    }
    async init(client) {
        this.forgeClient = client;
        this.commandManager = new ForgeYoutubeCommandManager_1.ForgeYoutubeCommandManager(client);
        if (this.config.youtube) {
            this.youtube = await youtubei_js_1.Innertube.create({
                cookie: this.config.youtube.cookie,
            });
            client.youtube = this.youtube;
            client.lastPlaylistSearch = undefined;
        }
        forgescript_1.EventManager.load(constants_1.ForgeYoutubeEventManagerName, `${__dirname}/events`);
        this.load(`${__dirname}/functions`);
        client.events.load(constants_1.ForgeYoutubeEventManagerName);
    }
}
exports.ForgeSocial = ForgeSocial;
//# sourceMappingURL=index.js.map