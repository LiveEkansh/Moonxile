const db = require('../models/warnings');

module.exports = {
    name: 'warnings',
    async execute(client, message, args, Discord){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        await db.findOne({ guildid:message.guild.id, user:member.user.id }, async (err, data)=>{
            if(err) throw err;
            if(data){
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`${member.user.tag}'s warns`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\`. **Reason : ${w.reason}**\n**Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}**\n`
                        )
                    )
                    .setColor("BLUE")
                    .setFooter(`${data.content.length} warning(s)`)
                )
            } else {
                message.channel.send(new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}'s warnings`, member.user.displayAvatarURL({ dynamic: true }))
                    .setColor("BLUE")
                    .setDescription('No data found')
                    .setFooter(`No Warnings`)
                )
            }
        })
    }
}