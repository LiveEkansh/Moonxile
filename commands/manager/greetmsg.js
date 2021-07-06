const db = require('../models/welcome');

module.exports = {
    name: 'greet-msg',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_GUILD')){
            return message.reply('Missing Permissions `MANAGE_SERVER`')
        };

        const greet = args.join(' ');
        
        await db.findOne({ Guild: message.guild.id }, async(err, data)=>{
            if(err) throw err;
            if(data){
                data.Message = greet;
                data.save();
            } else {
                new db({
                    Guild: message.guild.id,
                    Message: greet
                }).save();
            }
            message.channel.send(`Greet message has been set to:- \`\`\`${greet}\`\`\``);
        })
    }
}