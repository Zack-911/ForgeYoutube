import { ForgeExtension, ForgeClient } from "@tryforge/forgescript";
import { Innertube } from "youtubei.js";
export declare let ForgeYoutubeInstance: ForgeYoutube | null;
export declare class ForgeYoutube extends ForgeExtension {
    readonly name = "forge.youtube";
    readonly version: any;
    readonly description = "Integration layer for YouTube APIs";
    client: ForgeClient;
    youtube?: Innertube;
    init(client: ForgeClient): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map