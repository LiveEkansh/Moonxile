const db = require('../models/welcome');

module.exports = {
    name: 'greet',
    args: true,
    usage: '<channel>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('Missing Permissions `MANAGE_MESSAGES`')
        };
        
        const channel = message.mentions.channels.first() || message.channel;

        db.findOne({ Guild: message.guild.id }, async(err, data)=>{
            if(data){
                data.Channel = channel.id;
                data.save();
            } else {
                new db({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }
            message.channel.send(`Set greet messages on <#${channel.id}>`)
        })
    }
}