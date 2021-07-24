const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Bot\'s latency',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        message.lineReplyNoMention('Pinging...').then(msg => {
            msg.edit([
                `**Discord Latency: \`${(msg.createdTimestamp) - (message.createdTimestamp)}ms\`**`,
                `**API Latency: \`${client.ws.ping}ms\`**`
            ])
        })
    }
}