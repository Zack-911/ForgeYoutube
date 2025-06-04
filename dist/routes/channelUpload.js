"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupChannelUploadRoute = void 0;
const webserver_1 = require("@tryforge/webserver");
const __1 = require("..");
const express_1 = __importDefault(require("express"));
function setupChannelUploadRoute(port) {
    const server = (0, webserver_1.app)(port);
    server.use(express_1.default.json());
    server.post("/channelUpload", (req, res) => {
        const data = req.body;
        const channelID = data["channelId"] || data["yt:channelId"] || null;
        const videoID = data["videoId"] || data["yt:videoId"] || null;
        if (!channelID || !videoID) {
            res.status(400).send("Missing channelID or videoID");
            return;
        }
        if (__1.forgeSocialInstance) {
            __1.forgeSocialInstance.emitter.emit("channelUpload", { channelID, videoID });
        }
        else {
            console.warn("ForgeYoutube instance is not initialized yet");
        }
        res.send("received");
    });
    return server;
}
exports.setupChannelUploadRoute = setupChannelUploadRoute;
//# sourceMappingURL=channelUpload.js.map