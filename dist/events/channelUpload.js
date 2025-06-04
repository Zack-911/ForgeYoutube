"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const ForgeYoutubeEventHandlers_1 = require("../structures/ForgeYoutubeEventHandlers");
exports.default = new ForgeYoutubeEventHandlers_1.FYEventHandler({
    name: "channelUpload",
    version: "1.0.0",
    description: "Fires when a new video upload notification is received from a channel",
    listener(data) {
        const { channelID, videoID } = data;
        if (!channelID || !videoID)
            return;
        const commands = this.getExtension(__1.ForgeYoutube, true).commandManager.get("channelUpload");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: { channelID, videoID }
            });
        }
    }
});
//# sourceMappingURL=channelUpload.js.map