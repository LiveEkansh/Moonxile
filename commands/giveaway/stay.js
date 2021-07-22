const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'stay',
    description: 'Deleted the link? Use this to notify',
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
        .setTitle('<:mw_tada:867655074413805578> **GG! STAY IN THAT SERVER!**')
        .setDescription(`
        <:mw_dotline:867654933100232784> Only those who joined with ${user}'s link can win.
                
        <:mw_info:867654960875307028> **LATE? make sure to follow tips below:**
        <:mw_dots:867654889991831602> Be fast coming to giveaway channels because we delete link in a few minutes, putting as above all other servers will help you see the pings easily!
        <:mw_dots:867654889991831602> Be active in **drops/giveaways** for you to win **NITRO & ROBUX**
                
        <:mw_sign:867655009844068383> **Stay in channel so you won't miss the giveaway**`)
        .setImage('https://i.imgur.com/MjChoAC.gifv')
        .setTimestamp()

        message.channel.send(embed)
    }
}