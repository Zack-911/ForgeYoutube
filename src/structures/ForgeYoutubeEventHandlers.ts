import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript"
import { ForgeSocial } from ".."

export interface IForgeYoutubeEvents {
    posted: [ any ]
    error: [ Error ]
    voted: [ any ]
}

export class ForgeSocialEventHandler<T extends keyof IForgeYoutubeEvents> extends BaseEventHandler<IForgeYoutubeEvents, T> {
    register(client: ForgeClient): void {
        // @ts-ignore
        client.getExtension(ForgeSocial, true)["emitter"].on(this.name, this.listener.bind(client))
    }
}
