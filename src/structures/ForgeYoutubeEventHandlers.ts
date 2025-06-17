import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { ForgeYoutube } from "..";
import {
  channelUpload
} from "../types/events";

export interface FYEvents {
  channelUpload: [channelUpload];
  error: [Error];
}

export class FYEventHandler<
  T extends keyof FYEvents,
> extends BaseEventHandler<FYEvents, T> {
  register(client: ForgeClient): void {
    const ext = client.getExtension(ForgeYoutube, true);

    const listener = this.listener.bind(
      client,
    ) as [T][0] extends undefined
      ? () => void
      : (arg: FYEvents[T][0]) => void;

    ext["emitter"].on(this.name, listener);
  }
}