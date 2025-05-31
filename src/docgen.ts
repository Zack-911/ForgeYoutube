import { generateMetadata } from "@tryforge/forgescript"
import { ForgeYoutubeEventManagerName } from "./constants"

generateMetadata(
    __dirname + "/functions",
    "functions",
    ForgeYoutubeEventManagerName,
    undefined,
    undefined,
    __dirname + "/events"
)