"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeYoutube = exports.ForgeYoutubeInstance = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const youtubei_js_1 = require("youtubei.js");
exports.ForgeYoutubeInstance = null;
class ForgeYoutube extends forgescript_1.ForgeExtension {
    name = "forge.youtube";
    version = require("../package.json").version;
    description = "Integration layer for YouTube APIs";
    client;
    youtube;
    async init(client) {
        this.client = client;
        exports.ForgeYoutubeInstance = this;
        this.youtube = await youtubei_js_1.Innertube.create();
        youtubei_js_1.Log.setLevel(youtubei_js_1.Log.Level.NONE);
        client.youtube = this.youtube;
        client.lastPlaylistSearch = undefined;
        this.load(__dirname + "/functions");
    }
}
exports.ForgeYoutube = ForgeYoutube;
//# sourceMappingURL=index.js.map