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
        if(!message.member.hasPermission('MANAGE_ROLES')){
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
                message.channel.send('<:red_cross:864755062684123146> | Failed to unmute : `'+ err + '`');
            }
        });
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`***<:1_tick:864501120628949002> | ${member.user.tag} has been unmuted by ${message.author.tag}***`)
        .setColor('BLUE')
        )
    }
}