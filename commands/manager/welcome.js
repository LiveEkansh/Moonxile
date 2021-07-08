const db = require('../models/wembed');

module.exports = {
    name: 'welcome',
    usage: '<on/off>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            return message.lineReply('Missing Permissions `MANAGE_CHANNELS`')
        };

        const toggle = args[1];
        if(!toggle){
            return message.lineReply('Incorrect Usage : `;;welcome <on|off>`')
        };

        if(toggle === 'on'){
            await db.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(data){
                    data.Channel = '859389667567992842';
                    data.save();
                } else {
                    new db({
                        Guild: message.guild.id,
                        Channel: '859389667567992842'
                    }).save();
                }
                message.channel.send(`Welcome embed toggled **ON** [Channel: <#859389667567992842>]`);
                
            });
            return;
        }
        
        if(toggle === 'off'){
            await db.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(err) throw err;
                if(data){
                    await db.findOneAndDelete({ Guild: message.guild.id, Channel: '859389667567992842'});
                    message.channel.send(`Welcome embed toggled **OFF**`)
                } else {
                    message.channel.send(`Welcome embed is toggled OFF, use \`;;welcome on\`.`)
                }
            });
            return;
        }
    }
}