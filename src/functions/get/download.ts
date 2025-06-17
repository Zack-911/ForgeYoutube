import { ArgType, NativeFunction } from "@tryforge/forgescript"
import fs from "fs"
import path from "path"
import { Readable } from "stream"

export default new NativeFunction({
  name: "$youtubeDownload",
    version: "1.1.0",
  description: "Downloads a YouTube video and saves it to the given file path.",
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "videoID",
      description: "The ID of the YouTube video",
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: "filePath",
      description: "Where to save the downloaded file",
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.Json,
  async execute(ctx, [videoID, filePath]) {
    const id = String(videoID || "").trim()
    let location = String(filePath || "").trim()

    if (!id) return this.customError("No video ID provided.")
    if (!location) return this.customError("No file path provided.")

    if (!location.endsWith(".mp4")) location += ".mp4"

    const youtube = ctx.client.youtube
    if (!youtube) return this.customError("YouTube is not configured on this client.")

    const start = Date.now()

    try {
      const info = await youtube.getInfo(id)
      if (!info.streaming_data) return this.customError("This video cannot be downloaded (no streaming data).")

      await new Promise(res => setTimeout(res, 10000))

      const webStream = await youtube.download(id)
      if (!webStream) return this.customError("Could not get download stream.")

      const nodeStream = Readable.fromWeb(webStream as any)
      const fullPath = path.resolve(location)
      const writer = fs.createWriteStream(fullPath)

      await new Promise((resolve, reject) => {
        nodeStream.pipe(writer)
        writer.on("finish", resolve)
        writer.on("error", reject)
      })

      const size = fs.statSync(fullPath).size
      const ping = Date.now() - start

      return this.success(JSON.stringify({
        result: true,
        ping,
        file: fullPath,
        size
      }, null, 2))
    } catch (err) {
      return this.customError("Download failed: " + (err as Error).toString())
    }
  },
})