const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'winner',
    description: 'Claim Template [No Log]',
    usage: '<user>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`')
        }
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member){
            return message.lineReply(`Incorrect Usage, \`${prefix}winner <user>\``)
        };
        if(member.user.bot){
            return message.lineReply('The user mentioned is a bot') // ignore bots
        };

        message.delete();

        message.channel.send(
            [
            `╭<:mw_tada:867655074413805578> **[${member}] won!** you may ask them if we're **LEGIT**.`, 
        `**・━━━━━━━━━━━━━━━━━━━━━━━━━━━・**`, 
        `<:mw_info:867654960875307028> **PRO TIP!**`,   
        `<:mw_dots:867654889991831602> Be quick coming to our giveaway channels because we often delete the invite for the requirement after a few minutes, putting us above all other servers will allow you to be notified much easier!`,               
        `<:mw_dots:867654889991831602> <#866879381434400768> for +3s claim time!`,
        `**・━━━━━━━━━━━━━━━━━━━━━━━━━━━・**`,
        `╰<:mw_sign:867655009844068383> Stay in **Milkyway** for more!`
    ]
        )
        .then(sentMessage =>{
            sentMessage.react('<a:mw_trophy:867651795169181696>')
        })
    }
}