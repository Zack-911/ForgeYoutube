const { ForgeClient, LogPriority } = require('@tryforge/forgescript')
const { ForgeSocial } = require('../dist')
const path = require('path')

const Social = new ForgeSocial({
  youtube: {
    apiKey: "AIzaSyBR5ruKlz3iRYIHTnkdnmpwY5arDyIMHTE"
  }
})
const client = new ForgeClient({
  extensions: [
    Social
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

client.login('MTMzOTYyMTMzNjc3NDg3MzA4OA.GCW8iD.yWER6vThOS6tB8XI5GoQIOmY5NF3RJydSw3aYQ')
