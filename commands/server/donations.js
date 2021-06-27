const db = require('../models/d-schema');

module.exports = {
    name: 'donations',
    async execute(client, message, args, Discord){

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if(member.bot){
            return message.reply('The user is a bot.')
        };

        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(data) {
                message.channel.send(new Discord.MessageEmbed()
                    .setTitle(`${member.user.tag}'s Donations`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | **${w.date}**\nDonation : **${w.donation}**\n`
                        )
                    )
                    .setColor("00ffcc")
                    .setTimestamp()
                    .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
                )
            } else {
                message.channel.send(new Discord.MessageEmbed()
                .setTitle(`${member.user.tag}'s Donations`)
                .setDescription(`**No Data Found**`)
                .setColor('00ffcc')
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
                )
            }
        })

    db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
        if(err) throw err;
        if(data){
        const donates = parseInt(db.collection.count(data))

        module.exports.donates = donates;
    }
});
    }
}