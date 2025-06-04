"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FYEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
class FYEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        //@ts-ignore
        client.getExtension(__1.ForgeYoutube, true)['emitter'].on(this.name, this.listener.bind(client));
    }
}
exports.FYEventHandler = FYEventHandler;
//# sourceMappingURL=ForgeYoutubeEventHandlers.js.map