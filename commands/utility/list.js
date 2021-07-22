const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json');

module.exports = {
    name: 'list',
    description: 'List of supporters/donators/boosters',
    usage: '<supporters|donators|boosters>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Missing Permissions `ADMINISTRATOR`');
        const list = args[0];
        if(list.toLowerCase() === 'supporters'){
            const members = message.guild.roles.cache.find(r => r.name === '୧🌱・supporter').members.map(m => m.user.tag).join('\n');
            message.lineReplyNoMention(new MessageEmbed()
                .setAuthor(`${message.guild.name} supporters`, message.guild.iconURL())
                .setDescription(members)
                .setColor('9933FF')
            )
        } else if (list.toLowerCase() === 'donators'){
            const members = message.guild.roles.cache.find(r => r.name === '୧🍂・donator').members.map(m => m.user.tag).join('\n');
            message.lineReplyNoMention(new MessageEmbed()
                .setAuthor(`${message.guild.name} donators`, message.guild.iconURL())
                .setDescription(members)
                .setColor('9933FF')
            )
        } else if (list.toLowerCase() === 'boosters'){
            const members = message.guild.roles.cache.find(r => r.name === '୧💐・booster').members.map(m => m.user.tag).join('\n');
            message.lineReplyNoMention(new MessageEmbed()
                .setAuthor(`${message.guild.name} boosters`, message.guild.iconURL())
                .setDescription(members)
                .setColor('9933FF')
            )
        }
    }
}