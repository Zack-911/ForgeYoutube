import { app } from "@tryforge/webserver"
import type { Request, Response } from "express"
import { forgeSocialInstance } from ".."
import express from "express"

export function setupChannelUploadRoute(port: number) {
  const server = app(port)

  server.use(express.json())

  server.post("/channelUpload", (req: Request, res: Response) => {
    const data = req.body

    const channelID = data["channelId"] || data["yt:channelId"] || null
    const videoID = data["videoId"] || data["yt:videoId"] || null

    if (!channelID || !videoID) {
      res.status(400).send("Missing channelID or videoID")
      return
    }

    if (forgeSocialInstance) {
      forgeSocialInstance.emitter.emit("channelUpload", { channelID, videoID })
    } else {
      console.warn("ForgeYoutube instance is not initialized yet")
    }

    res.send("received")
  })

  return server
}
