import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { createWriteStream, mkdirSync, existsSync } from "fs"
import { join } from "path"
import { request } from "undici"
import { performance } from "perf_hooks"

export default new NativeFunction({
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
      type: ArgType.String
    },
    {
      name: "path",
      description: "Subdirectory to save in (relative to project root)",
      required: true,
      rest: false,
      type: ArgType.String
    },
    {
      name: "filename",
      description: "Name of the file to save as (no extension)",
      required: true,
      rest: false,
      type: ArgType.String
    }
  ],
  output: ArgType.Json,
  async execute(ctx, [url, folder, name]) {
    const videoUrl = String(url || "").trim()
    const savePath = String(folder || "").trim()
    const filename = String(name || "").trim()

    if (!/^https?:\/\//.test(videoUrl))
      return this.customError("Invalid URL")

    if (!filename.length || !savePath.length)
      return this.customError("Missing path or filename")

    try {
      const start = performance.now()

      const ext = "mp4"
      const relativeDir = join(process.cwd(), savePath)
      if (!existsSync(relativeDir)) mkdirSync(relativeDir, { recursive: true })

      const filePath = join(relativeDir, `${filename}.${ext}`)

      const res = await request(videoUrl)
      const stream = createWriteStream(filePath)

      await new Promise((resolve, reject) => {
        res.body.pipe(stream)
        res.body.on("error", reject)
        stream.on("finish", resolve)
      })

      const end = performance.now()
      const ms = Math.round(end - start)

      return this.success(JSON.stringify({
        path: `./${savePath}/${filename}.${ext}`,
        ping: `${ms}`,
        success: true
      }, null, 2))
    } catch (err) {
      return this.customError("Download failed: " + (err as Error).message)
    }
  }
})
