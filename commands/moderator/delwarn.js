const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/warns');

module.exports = {
    name: 'delwarn',
    description: 'Delete a user\'s warning using ID',
    usage: '<user> <id>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.find(r => r.name === '・trial moderator')){
            return message.lineReplyNoMention('Must have `@・trial moderator` or above to execute this command')
        };
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member){
            return message.lineReply(`Incorrect Usage, \`${prefix}delwarn <user> <ID>\``)
        };
        await db.findOne({ guildid : message.guild.id, user: member.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send(`<:1_tick:864501120628949002> | Warning \`#${args[1]}\` deleted for ${member.user.username}.`)
                data.save()
            } else {
                message.channel.send(`<:red_cross:864755062684123146> | **${member.user.username}** has no warnings.`)
            }
        })
    }
}