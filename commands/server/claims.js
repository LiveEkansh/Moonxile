const db = require('../models/c-schema');

module.exports = {
    name: 'claims',
    async execute(client, message, args, Discord){

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if(member.bot){
            return message.reply('The user is a bot.')
        };

        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(data) {
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`${member.user.tag}'s Claims`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | **${w.date}**\nReward : **${w.reward}**\n`
                        )
                    )
                    .setColor("00ffcc")
                    .setTimestamp()
                    .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
                )
            } else if (!data){
                message.channel.send(new Discord.MessageEmbed()
                .setTitle(`${member.user.tag}'s Claims`)
                .setDescription(`**No Data Found**`)
                .setColor('00ffcc')
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
                )
            }
        })
    }
}