module.exports = {
    name: 'staff',
    execute(client, message, args, Discord){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('Missing Permissions `ADMINISTRATOR`')
        };

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name + ' Staff', message.guild.iconURL())

        .addFields(
            {name: '୨・Creators', value: message.guild.roles.cache.find(r => r.name == '୨・Creators').members.map(m => m.user.tag).join('\n'), inline:true},
            {name: '୨・founder', value: message.guild.roles.cache.find(r => r.name == '୨・founder').members.map(m => m.user.tag).join('\n'), inline:true},
            {name: '୨・co founder', value: message.guild.roles.cache.find(r => r.name == '୨・co founder').members.map(m => m.user.tag).join('\n'), inline:true},

            {name: '୨・owner', value: message.guild.roles.cache.find(r => r.name == '୨・owner').members.map(m => m.user.tag).join('\n'), inline:true},
            {name: '୨・co owner', value: message.guild.roles.cache.find(r =>r.name == '୨・co owner').members.map(m => m.user.tag).join('\n'), inline:true},
            {name: '୨・head admin', value: message.guild.roles.cache.find(r => r.name == '୨・head admin').members.map(m => m.user.tag).join('\n'), inline:true},

            {name: '୨・admin', value: message.guild.roles.cache.find(r => r.name == '୨・admin').members.map(m => m.user.tag).join('\n'), inline:true},
            {name: '୨・head mod', value: message.guild.roles.cache.find(r => r.name == '୨・head mod').members.map(m => m.user.tag).join('\n'), inline:true},
            {name: '୨・moderator', value: message.guild.roles.cache.find(r => r.name == '୨・moderator').members.map(m => m.user.tag).join('\n'), inline:true},

            {name: '୨・trial mod', value: message.guild.roles.cache.find(r => r.name == '୨・trial mod').members.map(m => m.user.tag).join('\n'), inline:true}
        )

        .setColor('00FFCC')
        .setFooter('Last Updated')
        .setTimestamp()

        message.channel.send(embed)
    }
}