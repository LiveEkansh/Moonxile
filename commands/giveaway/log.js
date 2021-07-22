const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/claims');
const moment = require('moment');

module.exports = {
    name: 'log',
    description: 'Log a user\'s claim to the database without template',
    usage: '<user> <reward>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions : `MANAGE_MESSAGES`')
        };

        const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
        if(message.mentions.members.first().bot){
            return message.lineReply('The user mentioned is a bot')
        };
        const reward = args.slice(1).join(' ').toUpperCase();
        if(!member || !reward){
            return message.lineReply(`Incorrect Usage, \`${prefix}log <user> <reward>\``)
        };

        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(!data){
                data = new db({
                    guildid: message.guild.id,
                    user: member.user.id,
                    content: [
                        {
                            date : moment(message.createdAt).format("MMM Do YYYY"),
                            reward : reward
                        }
                    ]
                })
            } else {
                const obj = {
                    date : moment(message.createdAt).format("MMM Do YYYY"),
                    reward : reward
                }
                data.content.push(obj)
            }
            data.save();
        });
        const role = message.guild.roles.cache.find(r => r.name == '୧🌺・claimed');
        if(!role) return;
        member.roles.add(role);

        const channel = message.guild.channels.cache.get('866879408982851584')
        channel.send(`[${member}] claimed **${reward}**! Ask them if legit!`).then(sentMessage =>{
            sentMessage.react('<a:mw_trophy:867651795169181696>')
        });
        message.lineReplyNoMention(`Logged claim for **${member.user.tag}**.`);
    }
}