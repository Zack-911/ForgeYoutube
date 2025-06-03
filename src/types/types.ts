import { Innertube } from "youtubei.js"

declare module "@tryforge/forgescript" {
  interface ForgeClient {
    youtube?: Innertube
    lastPlaylistSearch?: any
  }
}
