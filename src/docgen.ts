import { generateMetadata } from "@tryforge/forgescript"
import { generateDocsFromMetadata } from "./generateMDFunctions"
import fs from 'fs'
import { ForgeYoutubeEventManagerName } from "./constants"

generateMetadata(
    __dirname + "/functions",
    "functions",
    ForgeYoutubeEventManagerName,
    undefined,
    undefined,
    __dirname + "/events"
)

const docs = generateDocsFromMetadata("./metadata/functions.json")
fs.writeFileSync("./metadata/functions.md", docs)