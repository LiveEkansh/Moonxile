const db = require('../models/wembed');

module.exports = {
    name: 'welcome',
    usage: '<#channel>',
    permissions: ['MANAGE_CHANNELS'],
    aliases: [],
    async execute(client, message, args, Discord){
        const ch = message.mentions.channels.first();
        if(ch){
            await db.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(data){
                    data.Channel = ch.id;
                    data.save();
                } else {
                    new db({
                        Guild: message.guild.id,
                        Channel: ch.id
                    }).save();
                }
                message.channel.send(`Welcome embed toggled **ON** [Channel: <#${ch.id}>]`);
                
            });
        }
    
    }
}