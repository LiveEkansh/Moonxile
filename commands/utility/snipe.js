const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json');
const moment = require('moment');

module.exports = {
    name: 'snipe',
    description: 'Snipe upto 10 last deleted messages',
    usage: '[number]',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        const snipes = client.snipes.get(message.channel.id);
        if(!snipes) return message.lineReplyNoMention('Nothing to snipe');

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe];
        if(!target) return message.channel.send('Couldn\'t snipe any further');

        const { content, image, member, time } = target;

        message.channel.lineReplyNoMention(new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(content)
            .setImage(image)
            .setFooter(moment(time).fromNow())
            .setColor('9933ff')
        )
    }
}