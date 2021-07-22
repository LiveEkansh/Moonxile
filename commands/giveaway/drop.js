const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'drop',
    description: 'Quick Drop Template [User Support]',
    usage: '[user]',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`.')
        };
        message.delete();
        const user = message.mentions.users.first() || message.author;
        const embed = new Discord.MessageEmbed()
        .setColor('9933ff')
        .setTitle(`<:mw_tada:867655074413805578> **MILKY WAY DROP!**`)
        .setDescription(`
        <:mw_dotline:867654933100232784> Must join with ${user}'s link!
                
        <:mw_info:867654960875307028> **PRO TIP!**
        <:mw_dots:867654889991831602> If the bot doesn't trace you, make sure to **REJOIN**!
        <:mw_dots:867654889991831602> Copy the link so that you can rejoin as many times you want!
        <:mw_dots:867654889991831602> Be fast coming to giveaway channels because we delete link in a few minutes, putting as above all other servers will help you see the pings easily!
        <:mw_dots:867654889991831602> Be active in **drops/giveaways** for you to win **NITRO & ROBUX**
                
        <:mw_sign:867655009844068383>**Stay in channel so you won't miss the giveaway**`)
        .setImage('https://i.imgur.com/PZyF3Qu.gif')
        .setTimestamp()

        message.channel.send(embed)
    }
}