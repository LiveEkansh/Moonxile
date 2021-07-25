const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'slowmode',
    aliases: ['sm'],
    description: 'Adds slowmode to a channel in seconds',
    usage: '<seconds>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_CHANNELS') && message.author.id !== client.dev){
            return message.lineReply('Missing Permissions `MANAGE_CHANNELS`.')
        };        
        const num = parseInt(args[0]);
        if(args[0] === '0' || args[0] == 'off'){
            return message.channel.setRateLimitPerUser(0).then(ch =>{
                ch.send(`**<#${message.channel.id}>**'s slowmode has been removed!`)
            });
        };
        if(num > 3600){
            return message.lineReply('<:mw_cross:867667594505224192> | Slowmode cannot last more than 1 hour!')
        };
        if(num < 1){
            return message.lineReply('<:mw_cross:867667594505224192> | Slowmode must be more than 1 second!')
        };
        if(isNaN(num)){
            return message.lineReply('<:mw_cross:867667594505224192> | Enter a valid Number!')
        };
        message.channel.setRateLimitPerUser(parseInt(num));
        message.channel.send(`<:mw_tick:867667518512168960> | **<#${message.channel.id}>** now has a slowmode of **${num}** seconds!`)
    }
}