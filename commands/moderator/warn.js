const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/warns');

module.exports = {
    name: 'warn',
    description: 'Warn a user who break rules',
    usage: '<user> <reason>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_ROLES') && message.author.id !== client.dev && !message.member.roles.cache.find(r => r.name === '・trial moderator')){
            return message.lineReplyNoMention('Must have `@・trial moderator` or above to execute this command')
        };

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');

        if(!member || !reason){
            return message.lineReply(`Incorrect Usage, \`${prefix}warn <user> <reason>\``)
        };

        if(member.user.id === message.author.id){
            return message.lineReply('<:mw_cross:867667594505224192> | You cannot warn yourself!')
        };

        await db.findOne({ guildid: message.guild.id, user: member.user.id }, async (err, data)=>{
            if(err) throw err;

            if(!data){
                data = new db({
                    guildid: message.guild.id,
                    user: member.user.id,
                    content: [
                        {
                            moderator: message.author.id,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(obj)
            }
            data.save();
        });

        await member.send(new Discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`Warned by **${message.author.tag}** for **${reason}**`)
                .setFooter('Warned at')
                .setTimestamp()
                .setColor("RED")
            ).catch(console.error);
        await message.channel.send(new Discord.MessageEmbed()
            .setDescription(`***<:mw_tick:867667518512168960> | ${member.user.tag} has been warned! | Reason : ${reason}***`)
            .setColor("RED")
        );
    }
}