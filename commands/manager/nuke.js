const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'nuke',
    description: 'Nukes a channel by cloning and deleting the channel',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send('Missing Permissions `MANAGE_CHANNELS`');
        };
                
        message.channel.clone({ parent: message.channel.parentID, position: message.channel.rawPosition }).then((ch) => {
            ch.send(`**${message.author.tag}** nuked the channel!`);
        });

        message.channel.delete()
    }
}