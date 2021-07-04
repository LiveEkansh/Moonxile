const db = require('../models/warnings');

module.exports = {
    name : 'delwarn',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.find(r => r.name === '୨・trial mod')){
            return message.channel.send('Must have `@୨・trial mod` or above to execute this command')
        };
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member){
            return message.reply('Invalid Usage : `;;delwarn <@user> <warnID>`')
        };
        await db.findOne({ guildid : message.guild.id, user: member.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send(`Warning \`#${args[1]}\` deleted for ${member.user.username}.`)
                data.save()
            } else {
                message.channel.send(`**${member.user.username}** has no warnings.`)
            }
        })
    }
}