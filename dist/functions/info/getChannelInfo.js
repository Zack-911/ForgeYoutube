"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getChannelInfo",
    version: "1.0.0",
    description: "Gets info about a YouTube channel by ID or handle.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "identifier",
            description: "Channel ID or handle (e.g. UC... or @username)",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String
        }
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [id]) {
        const query = String(id || "").trim();
        const yt = ctx.client.youtube;
        if (!yt)
            return this.customError("YouTube is not configured.");
        try {
            const result = await yt.getChannel(query);
            return this.success(JSON.stringify({}, null, 2));
        }
        catch (e) {
            return this.customError("Failed to get channel info: " + e.message);
        }
    }
});
//# sourceMappingURL=getChannelInfo.js.map