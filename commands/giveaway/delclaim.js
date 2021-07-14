const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/claims');

module.exports = {
    name: 'delclaim',
    description: 'Delete a user\'s claim with ID',
    usage: '<user> <id>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`.')
        };
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(member.user.bot){
            return message.lineReply('The user mentioned is a bot.')
        };
        if(!member){
            return message.lineReply(`Incorrect Usage, \`${prefix}delclaim <user> <ID>\``)
        };
        db.findOne({ guildid : message.guild.id, user: member.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.lineReplyNoMention(`Deleted the Claim with ID \`${args[1]}\``)
                data.save()
            } else {
                message.lineReplyNoMention('User has no claims')
            }
        })
    }
}