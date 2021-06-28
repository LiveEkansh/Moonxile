const moment = require('moment');

module.exports = {
    name: 'info',
    async execute(client, message, args, Discord){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const db = require('../models/d-schema');
        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data)=>{
            if(err) throw err;
            if(data){
              const donates = parseInt(data.content.length);
            }
          })

        var DefaultTime = 10;
        var support = 0;
        var donate = 0;
        var boost = 0;
       
        const userRoles = member.roles.cache.map((r) => r.name);
        
        if (userRoles.includes("୨・supporter")) {
          support = 3;
        }
    
        if (userRoles.includes("୨・donator")) {
          donate = donates * 5;
        }
        
        if (userRoles.includes("୨・booster")) {
          boost = 10;
        }
    
        const TotalTime = DefaultTime + support + donate + boost;

        const embed = new Discord.MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
        
        .addFields(
            {name: member.user.tag, value: member.user, inline: true},
            {name: 'Nickname', value: `${member.nickname !== null ? member.nickname : 'None'}`, inline: true},
            {name: 'Is Bot', value: member.user.bot, inline: true},

            {name: 'Joined', value: `${moment.utc(member.joinedAt).format("MMMM Do YYYY")}`, inline: true},
            {name: 'Created', value: `${moment.utc(member.user.createdAt).format("MMMM Do YYYY")}`, inline: true},
            {name: 'Claim Time', value: `${TotalTime} seconds`, inline: true},
        )

        .setFooter(`ID : ${member.user.id}`)
        .setTimestamp()
        .setColor('00ffcc')

        message.channel.send(embed)
    }
}