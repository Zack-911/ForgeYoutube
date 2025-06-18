const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeYoutube } = require('../dist')

const client = new ForgeClient({
  extensions: [
    new ForgeYoutube()
  ],
  events: [
    'messageCreate'
  ],
  intents: [
    'Guilds',
    'GuildMessages',
    'MessageContent'
  ],
  prefixes: ['.']
})

client.commands.load('./__tests__/commands')

client.login('')
