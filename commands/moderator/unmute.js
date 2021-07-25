const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'unmute',
    description: 'Unmute a muted user',
    usage: '<user>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_ROLES') && message.author.id !== client.dev){
            return message.lineReply('Missing Permissions `MANAGE_ROLES`.')
        };
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member){
            return message.lineReply(`Incorrect Usage, \`${prefix}unmute <user>\``)
        } 
        const role = message.guild.roles.cache.find(r => r.name == '・muted');
        if(!role) return;
        /*if(!member.roles.cache.find(role)){
            return message.channel.send(`${member.user.tag} is not muted!`)
        };*/
        member.roles.remove(role).catch(err =>{
            if(err){
                message.channel.send('<:mw_cross:867667594505224192> | Failed to unmute : `'+ err + '`');
            }
        });
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`***<:mw_tick:867667518512168960> | ${member.user.tag} has been unmuted by ${message.author.tag}***`)
        .setColor('BLUE')
        )
    }
}