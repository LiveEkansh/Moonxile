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
            `╭<:1_tada:857846692233478154> **[${member}] won!** you may ask them if we're **LEGIT**.`, 
        `**・━━━━━━━━━━━━━━━━━━━━━━━━━━━・**`, 
        `<:1_info:857846561714208819> **PRO TIP!**`,   
        `<:1_dots:857846478587428904> Be quick coming to our giveaway channels because we often delete the invite for the requirement after a few minutes, putting us above all other servers will allow you to be notified much easier!`,               
        `<:1_dots:857846478587428904> <#857633375543885884> for +3s claim time!`,
        `**・━━━━━━━━━━━━━━━━━━━━━━━━━━━・**`,
        `╰<:1_sign:857846611397050369> Stay in **Moonxile** for more!`
    ]
        )
        .then(sentMessage =>{
            sentMessage.react('<a:mx_trophy:863765662346641409>')
        })
    }
}