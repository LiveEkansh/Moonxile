const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        message.lineReplyNoMention(`${client.ws.ping} ms`)
    }
}