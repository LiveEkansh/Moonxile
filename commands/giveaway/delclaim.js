const db = require('../models/c-schema');

module.exports = {
    name: 'delclaim',
    args: 2,
    usage: '<@user/ID> <claim_number>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`.')
        };
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(member.user.bot){
            return message.lineReply('The user mentioned is a bot.')
        };
        if(!member){
            return message.lineReply('Invalid Usage : `;;delclaim @user <claim-number>`')
        };
        db.findOne({ guildid : message.guild.id, user: member.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send(`Deleted the Claim with ID \`${args[1]}\``)
                data.save()
            } else {
                message.channel.send('User has no claims.')
            }
        })
    }
}