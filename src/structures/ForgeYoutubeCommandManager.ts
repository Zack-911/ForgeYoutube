import { BaseCommandManager } from "@tryforge/forgescript"
import { FYEvents } from "./ForgeYoutubeEventHandlers"
import { ForgeYoutubeEventManagerName } from "../constants"

export class ForgeYoutubeCommandManager extends BaseCommandManager<keyof FYEvents> {
    handlerName = ForgeYoutubeEventManagerName
}
