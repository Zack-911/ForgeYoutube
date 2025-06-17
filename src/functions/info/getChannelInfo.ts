import { ArgType, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
  name: "$getChannelInfo",
  version: "1.0.0",
  description: "Gets info about a YouTube channel by ID or handle.",
  brackets: true,
  unwrap: true,
  args: [
    {
      name: "identifier",
      description: "Channel ID or handle (e.g. UC... or @username)",
      required: true,
      rest: false,
      type: ArgType.String
    }
  ],
  output: ArgType.Json,
  async execute(ctx, [id]) {
    const query = String(id || "").trim()
    const yt = ctx.client.youtube
    if (!yt) return this.customError("YouTube is not configured.")

    try {
      const result = await yt.getChannel(query)
      return this.success(JSON.stringify({}, null, 2))
    } catch (e) {
      return this.customError("Failed to get channel info: " + (e as Error).message)
    }
  }
})
