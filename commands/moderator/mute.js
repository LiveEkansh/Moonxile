const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'mute',
    aliases: ['m'],
    description: 'Mute a user from the text 🤐',
    usage: '<user> <reason>',
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
            return message.lineReply(`Incorrect Usage, \`${prefix}mute <user> <reason>\``)
        }
        const reason = args.slice(1).join(' ');
        if(!reason) reason == 'Unspecified';
        const role = message.guild.roles.cache.find(r => r.name == '・muted');
        if(!role){
            return message.lineReply('<:mw_cross:867667594505224192> | No Muted role found!')
        };

        if(member.hasPermission('MANAGE_ROLES')){
            return message.lineReply('<:mw_cross:867667594505224192> | That user is a staff, I can\'t mute them!')
        };

        member.roles.add(role).catch(err =>{
            if(err){
                message.channel.send('<:mw_cross:867667594505224192> | Failed to mute : `'+ err +'`')
            }
        });

        const embed = new Discord.MessageEmbed()
        .setDescription(`***<:mw_tick:867667518512168960> | ${member.user.tag} has been muted by ${message.author.tag} | Reason : ${reason}***`)
        .setColor("RED")

        message.channel.send(embed)
    }
}