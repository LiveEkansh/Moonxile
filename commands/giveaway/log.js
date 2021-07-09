const db = require('../models/c-schema');
const moment = require('moment');

module.exports = {
    name: 'log',
    args: 2,
    usage: '<@user> <reward>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions : `MANAGE_MESSAGES`')
        };

        const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
        if(message.mentions.members.first().bot){
            return message.lineReply('The user mentioned is a bot.')
        };
        const reward = args.slice(1).join(' ').toUpperCase();
        if(!member || !reward){
            return message.lineReply('Invalid Usage : `;;log @user <reward>`')
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
        const role = message.guild.roles.cache.find(r => r.name == '・claimed');
        if(!role) return;
        member.roles.add(role);

        const channel = message.guild.channels.cache.get('857989744701210675')
        channel.send(`[${member}] claimed **${reward}**! Ask them if legit!`).then(sentMessage =>{
            sentMessage.react('<a:mx_tick:858361758539841536>')
        });

        message.channel.send(`Logged claim for **${member.user.tag}**.`);
    }
}