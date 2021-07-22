const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/donations');
const moment = require('moment');

module.exports = {
    name: 'donate',
    description: 'Logs a donation by a member',
    usage: '<user> <donation>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`')
        };

        const member = message.mentions.members.first();

        const donation = args.slice(1).join(' ').toUpperCase();
        if(!member || !donation){
            return message.lineReply(`Incorrect Usage, \`${prefix}donate <user> <donation>\``)
        };
        if(member.user.bot){
            return message.lineReply('The user mentioned is a bot')
        };

        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(!data){
                data = new db({
                    guildid: message.guild.id,
                    user: member.user.id,
                    content: [
                        {
                            date: moment(message.createdAt).format("MMM Do YYYY"),
                            donation: donation
                        }
                    ]
                })
            } else {
                const obj = {
                    date: moment(message.createdAt).format("MMM Do YYYY"),
                    donation: donation
                }
                data.content.push(obj)
            }
            data.save();
        });
        const role = message.guild.roles.cache.find(r => r.name == '୧🍂・donator');
        if(!role){
            return message.lineReply('No Donator role found!')
        };
        const channel = message.guild.channels.cache.get('866879382983147541');
        member.roles.add(role).catch(console.error);
        channel.send(`[${member}] donated **${donation}**!`).then(sentMessage =>{
            sentMessage.react('<a:mw_trophy:867651795169181696>>')
        });

        message.lineReplyNoMention(`Donation by **${member.user.tag}** logged in <#866879382983147541>!`)
    }
}