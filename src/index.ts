import 'dotenv/config'
import { Client as DiscordClient, Intents } from 'discord.js'
import { Client as ItChatClient } from '@itchatapp/client'

const discord = new DiscordClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

const itchat = new ItChatClient()


discord.on('ready', () => console.log('Connected to Discord'))
itchat.on('ready', () => console.log('Connected to ItChat'))


discord.on('messageCreate', async message => {
    if (message.channelId !== process.env.DISCORD_CHANNEL_ID) return
    if (!message.content) return

    const channel = itchat.channels.cache.get(process.env.ITCHAT_CHANNEL_ID!)

    if (channel?.isText()) {
        await channel.send(`[**${message.author.tag}**]: ${message.content}`)
    }
})

itchat.on('messageCreate', async message => {
    if (message.channelId !== process.env.ITCHAT_CHANNEL_ID) return
    if (!message.content) return

    const channel = discord.channels.cache.get(process.env.DISCORD_CHANNEL_ID!)

    if (channel?.isText()) {
        await channel.send(`[**${message.author.username}**]: ${message.content}`)
    }
})


itchat.login(process.env.ITCHAT_TOKEN!)
discord.login(process.env.DISCORD_TOKEN)