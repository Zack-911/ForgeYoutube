import { Interpreter } from "@tryforge/forgescript"
import { ForgeYoutube } from ".."
import { FYEventHandler } from "../structures/ForgeYoutubeEventHandlers"

export default new FYEventHandler({
  name: "channelUpload",
  version: "1.0.0",
  description: "Fires when a new video upload notification is received from a channel",

  listener(data) {
    const { channelID, videoID } = data

    if (!channelID || !videoID) return

    const commands = this.getExtension(ForgeYoutube, true).commandManager.get("channelUpload")

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: { channelID, videoID }
      })
    }
  }
})
