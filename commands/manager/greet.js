const db = require('../models/welcome');

module.exports = {
    name: 'greet',
    usage: "<#channel|off>",
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`')
        };
        
        const channel = message.mentions.channels.first();

        const toggle = args[0];

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
        });

        if(toggle === 'off'){
            await db.findOne({ Guild: message.guild.id }, async(err, data)=>{
                if(err) throw err;
                if(data){
                    await db.findOneAndDelete({ Guild: message.guild.id });

                    message.lineReplyNoMention('Greet messages disabled.')
                } else {
                    message.lineReplyNoMention('Greet messages are not enabled!')
                }
            })
        }
    }
}