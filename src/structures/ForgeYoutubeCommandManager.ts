import { BaseCommandManager } from "@tryforge/forgescript"
import { IForgeYoutubeEvents } from "./ForgeYoutubeEventHandlers"
import { ForgeYoutubeEventManagerName } from "../constants"

export class ForgeYoutubeCommandManager extends BaseCommandManager<keyof IForgeYoutubeEvents> {
    handlerName = ForgeYoutubeEventManagerName
}
