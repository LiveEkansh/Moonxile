const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json');

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
            return message.lineReply('<:red_cross:864755062684123146> | No Muted role found!')
        };

        if(member.hasPermission('MANAGE_ROLES')){
            return message.lineReply('<:red_cross:864755062684123146> | That user is a staff, I can\'t mute them!')
        };

        member.roles.add(role).catch(err =>{
            if(err){
                message.channel.send('<:red_cross:864755062684123146> | Failed to mute : `'+ err +'`')
            }
        });

        const embed = new Discord.MessageEmbed()
        .setDescription(`***<:1_tick:864501120628949002> | ${member.user.tag} has been muted by ${message.author.tag} | Reason : ${reason}***`)
        .setColor("RED")

        message.channel.send(embed)
    }
}