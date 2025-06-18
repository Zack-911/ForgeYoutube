"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const fs_1 = require("fs");
const path_1 = require("path");
const undici_1 = require("undici");
const perf_hooks_1 = require("perf_hooks");
exports.default = new forgescript_1.NativeFunction({
    name: "$downloadVideoFromUrl",
    version: "1.0.1",
    description: "Downloads a video file from a direct URL with custom filename and path.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "url",
            description: "Direct video file URL (e.g. https://domain.com/video)",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String
        },
        {
            name: "path",
            description: "Subdirectory to save in (relative to project root)",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String
        },
        {
            name: "filename",
            description: "Name of the file to save as (no extension)",
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String
        }
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [url, folder, name]) {
        const videoUrl = String(url || "").trim();
        const savePath = String(folder || "").trim();
        const filename = String(name || "").trim();
        if (!/^https?:\/\//.test(videoUrl))
            return this.customError("Invalid URL");
        if (!filename.length || !savePath.length)
            return this.customError("Missing path or filename");
        try {
            const start = perf_hooks_1.performance.now();
            const ext = "mp4";
            const relativeDir = (0, path_1.join)(process.cwd(), savePath);
            if (!(0, fs_1.existsSync)(relativeDir))
                (0, fs_1.mkdirSync)(relativeDir, { recursive: true });
            const filePath = (0, path_1.join)(relativeDir, `${filename}.${ext}`);
            const res = await (0, undici_1.request)(videoUrl);
            const stream = (0, fs_1.createWriteStream)(filePath);
            await new Promise((resolve, reject) => {
                res.body.pipe(stream);
                res.body.on("error", reject);
                stream.on("finish", resolve);
            });
            const end = perf_hooks_1.performance.now();
            const ms = Math.round(end - start);
            return this.success(JSON.stringify({
                path: `./${savePath}/${filename}.${ext}`,
                ping: `${ms}`,
                success: true
            }, null, 2));
        }
        catch (err) {
            return this.customError("Download failed: " + err.message);
        }
    }
});
//# sourceMappingURL=download.js.map