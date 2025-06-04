const { ForgeClient, LogPriority } = require('@tryforge/forgescript')
const { ForgeYoutube } = require('../dist')
const path = require('path')

const Social = new ForgeYoutube({
  youtube: {
    apiKey: "AIzaSyBR5ruKlz3iRYIHTnkdnmpwY5arDyIMHTE"
  }
})
const client = new ForgeClient({
  extensions: [
    Social
  ],
  events: [
    'messageCreate',
    'channelUpload'
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
