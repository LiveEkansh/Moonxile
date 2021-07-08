const db = require('../models/d-schema');
const moment = require('moment');

module.exports = {
    name: 'donate',
    args: 2,
    usage: '<@user> <donation>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`')
        };

        const member = message.mentions.members.first();
        if(member.user.bot){
            return message.lineReply('The user mentioned is a bot')
        };

        const donation = args.slice(1).join(' ');
        if(!member || !donation){
            return message.lineReply('Invalid Usage : `;;donate <@user> <donation>`')
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
        const role = message.guild.roles.cache.find(r => r.name == '・donator');
        if(!role){
            return message.lineReply('No Donator role found!')
        };
        const channel = message.guild.channels.cache.get('857633390269431818');
        member.roles.add(role).catch(console.error);
        channel.send(`[${member}] donated **${donation}**!`).then(sentMessage =>{
            sentMessage.react('<a:mx_tick:858361758539841536>')
        });

        message.channel.send(`Donation by **${member.user.tag}** logged in <#857633390269431818>!`)
    }
}