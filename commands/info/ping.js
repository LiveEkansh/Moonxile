const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        const pingMsg = await message.lineReplyNoMention(`Pinging...`)
        .then(msg => {
            msg.edit(`**Discord Latency**: **\`${(pingMsg.createdTimestamp) - (msg.createdTimestamp)}ms\`**\n**API Latency**: **\`${client.ws.ping}ms\`**`)
        })
    }
}