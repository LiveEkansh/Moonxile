const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/warns');

module.exports = {
    name: 'clearwarns',
    description: 'Clear the warnings of a user on the server',
    usage: '<user>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.find(r => r.name === '・trial moderator')){
            return message.lineReplyNoMention('Must have `@・trial moderator` or above to execute this command')
        };
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.lineReply(`Incorrect Usage, \`${prefix}clearwarns <user>\``)
        await db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.lineReplyNoMention(`<:1_tick:864501120628949002> | Cleared **${user.user.tag}**'s warns`)
            } else {
                message.lineReplyNoMention(`<:red_cross:864755062684123146> | **${user.user.tag}** has no warnings.`)
            }
        })
    }
}