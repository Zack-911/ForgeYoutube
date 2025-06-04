import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
import { ForgeYoutube } from '..'

export interface FYEvents {
    channelUpload: [{
        channelID: any | null
        videoID: any | null
    }]
}

export class FYEventHandler<T extends keyof FYEvents> extends BaseEventHandler<FYEvents, T> {
    register(client: ForgeClient): void {
        //@ts-ignore
        client.getExtension(ForgeYoutube, true)['emitter'].on(this.name, this.listener.bind(client))
    }
}