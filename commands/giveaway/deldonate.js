const db = require('../models/d-schema');

module.exports = {
    name: 'deldonate',
    args: 2,
    usage: '<@user/ID> <donationID>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('Missing Permissions `MANAGE_MESSAGES`')
        };

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(member.bot){
            return message.reply('The user mentioned is a bot')
        };
        if(!member){
            return message.reply('Invalid Usage : `;;deldonate <@user/id> <donationID>')
        };
        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(data){
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send(`Deleted the Donation with ID \`${args[1]}\``)
                data.save()
            } else {
                message.channel.send('User has no donations.')
            }
        })
    }
}