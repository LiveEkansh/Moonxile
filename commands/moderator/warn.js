const db = require('../models/warnings');

module.exports = {
    name: 'warn',
    args: true,
    usage: '<@user> <reason>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.find(r => r.name === '୨・trial mod')){
            return message.channel.send('Must have `@୨・trial mod` or above to execute this command')
        };

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');

        if(!member || !reason){
            return message.lineReply('Invalid Usage : `;;warn <@user> <reason>`')
        };

        if(member.user.id === message.author.id){
            return message.lineReply('You cannot warn yourself!')
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

        await member.send(new Discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setDescription(`Warned by **${message.author.tag}** for **${reason}**`)
                .setFooter('Warned at')
                .setTimestamp()
                .setColor("RED")
            ).catch(console.error);
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
        );
    }
}