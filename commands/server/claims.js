const db = require('../models/c-schema');

module.exports = {
    name: 'claims',
    async execute(client, message, args, Discord){

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if(member.user.bot){
            return message.reply('The user is a bot.')
        };

        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(data) {
                
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${member.user.tag}'s Claims`)
                    // .setDescription(
                    //     data.content.map(
                    //         (w, i) => 
                    //         `\`${i + 1}\` | **${w.date}**\nReward : **${w.reward}**\n`
                    //     )
                    // )
                    .setColor("00ffcc")
                    .setFooter(`${data.content.length} claim(s)`, message.guild.iconURL({ dynamic: true }))
                    .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))

                    const claims = data.content.map((w, i) =>{
                        for(claim of claims){
                            embed.addField(`${w.date}`, `Reward: **${w.reward}**\nClaim ID: \`${i + 1}\`\n`)
                        }
                    });
                message.channel.send(embed)
            } else if (!data){
                message.channel.send(new Discord.MessageEmbed()
                .setTitle(`${member.user.tag}'s Claims`)
                .setDescription(`**No Data Found**`)
                .setColor('00ffcc')
                .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
                )
            }
        });
    }
}