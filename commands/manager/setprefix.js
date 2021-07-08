const db = require('../models/prefix');

module.exports = {
    name: 'setprefix',
    args: true,
    usage: '<newPrefix>',
    async execute(client, message, args, Discord){
        const data = await db.findOne({ Guild: message.guild.id });
        
        const pre = args[0];
        if(pre.length > 2){
            return message.lineReply('Prefix cannot exceed `2` characters.')
        };

        if(data){
            await db.findOneAndDelete({ Guild: message.guild.id });

            message.channel.send(`Successfully set prefix to \`${pre}\`.`)

            let newData = new db({
                Prefix: pre,
                Guild: message.guild.id
            })
            newData.save();
        } else if (!data){

            let newData = new db({
                Prefix: pre,
                Guild: message.guild.id
            })
            newData.save();

            message.channel.send(`Successfully set prefix to \`${pre}\`.`)
        }
    }
}