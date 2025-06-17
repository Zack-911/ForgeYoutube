"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FYEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
class FYEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        const ext = client.getExtension(__1.ForgeYoutube, true);
        const listener = this.listener.bind(client);
        ext["emitter"].on(this.name, listener);
    }
}
exports.FYEventHandler = FYEventHandler;
//# sourceMappingURL=ForgeYoutubeEventHandlers.js.map