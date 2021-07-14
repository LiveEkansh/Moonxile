const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'embed',
    description: 'Embeds a message',
    usage: '<description>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!args[0]){
            return message.channel.send(`Incorrect Usage, \`${prefix}embed <description>\``)
        };
        const embed = new Discord.MessageEmbed()
        .setDescription(args.join(' '))
        .setAuthor(message.guild.name, message.guild.iconURL( {dynamic: true} ))
        .setColor('00ffcc')
        .setTimestamp()

        message.channel.send(embed)
    }
}