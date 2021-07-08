const db = require('../models/welcome');

module.exports = {
    name: 'check',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            return message.lineReply('Missing Permissions `MANAGE_CHANNELS`')
        };

        db.findOne({ Guild: message.guild.id }, async(err, data)=>{
            if(!data) return ('No greet channel set, use `;;greet <channel>`.');

            const channel = client.channels.cache.get(data.Channel);

            message.channel.send(`Greet messages are enabled on ${channel}`);
        })
    }
}