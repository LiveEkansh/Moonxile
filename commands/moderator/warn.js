const db = require('../models/warnings');

module.exports = {
    name: 'warn',
    args: true,
    usage: '<@user> <reason>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.get('857892859310505995')){
            return message.reply('Missing Permissions, Must be a Trial Mod!')
        };

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');

        if(!member || !reason){
            return message.reply('Invalid Usage : `;;warn <@user> <reason>`')
        };

        await db.findOne({ guildid: message.guild.id, user: member.user.id }, async (err, data)=>{
            if(err) throw err;

            if(!data){
                data = new db({
                    guildid: message.guild.id,
                    user: member.user.id,
                    content: [
                        {
                            moderator: message.author.id,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.content.push(obj)
            }
            data.save();
        });

        await message.channel.send(new Discord.MessageEmbed()
            .setAuthor('Member Warned!', message.guild.iconURL({ dynamic:true }))
            .addFields(
                {name: 'Member', value: `**${member.user.tag}**`},
                {name: 'Moderator', value: `**${message.author.tag}**`},
                {name: 'Reason', value: reason}
            )
            .setThumbnail(member.user.displayAvatarURL( {dynamic:true} ))
            .setFooter('Warned at')
            .setTimestamp()
            .setColor("RED")
        )
    }
}