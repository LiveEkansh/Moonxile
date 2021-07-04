const db = require('../models/warnings');

module.exports = {
    name: 'clearwarn',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.find(r => r.name === '୨・trial mod')){
            return message.channel.send('Must have `@୨・trial mod` or above to execute this command')
        };
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        await db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`Cleared **${user.user.tag}**'s warns`)
            } else {
                message.channel.send(`**${user.user.tag}** has no warnings.`)
            }
        })
    }
}