const db = require('../models/wembed');

module.exports = {
    name: 'welcome',
    usage: '<on/off>',
    permissions: ['MANAGE_CHANNELS'],
    aliases: [],
    async execute(client, message, args, Discord){

        const toggle = args[0];
        const ch = message.mentions.channels.first();
        if(!toggle || !ch){
            return message.lineReply('Incorrect Usage : `;;welcome <#channel|off>`')
        };

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
            return;
        }
        
        if(toggle === 'off'){
            await db.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(err) throw err;
                if(data){
                    await db.findOneAndDelete({ Guild: message.guild.id });
                    message.channel.send(`Welcome embed toggled **OFF**`)
                } else {
                    message.channel.send(`Welcome embed is toggled OFF, use \`;;welcome on\`.`)
                }
            });
            return;
        } else {
            message.lineReplyNoMention('Incorrect Usage : `;;welcome <#channel|off>`')
        }
    }
}