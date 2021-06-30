module.exports = {
    name: 'staff',
    execute(client, message, args, Discord){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('Missing Permissions `ADMINISTRATOR`')
        };

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name + ' Staff', message.guild.iconURL())
        
        .addField('୨・Creators', `${message.guild.roles.cache.find(r => r.name == '୨・Creators').members.map(m => m.user.tag).join('\n')}`, true)
        .addField('୨・founder', `${message.guild.roles.cache.find(r => r.name == '୨・founder').members.map(m => m.user.tag).join('\n')}`, true)
        .addField('୨・co founder', `${message.guild.roles.cache.find(r => r.name == '୨・co founder').members.map(m => m.user.tag).join('\n')}`, true)

        .addField('୨・owner', `${message.guild.roles.cache.find(r => r.name == '୨・owner').members.map(m => m.user.tag).join('\n')}`, true)
        .addField('୨・co owner', `${message.guild.roles.cache.find(r => r.name == '୨・co owner').members.map(m => m.user.tag).join('\n')}`, true)
        .addField('୨・head admin', `${message.guild.roles.cache.find(r => r.name == '୨・head admin').members.map(m => m.user.tag).join('\n')}`, true)
        
        .addField('୨・admin', `${message.guild.roles.cache.find(r => r.name == '୨・admin').members.map(m => m.user.tag).join('\n')}`, true)
        .addField('୨・head mod', `${message.guild.roles.cache.find(r => r.name == '୨・head mod').members.map(m => m.user.tag).join('\n')}`, true)
        .addField('୨・moderator', `${message.guild.roles.cache.find(r => r.name == '୨・moderator').members.map(m => m.user.tag).join('\n')}`, true)
        
        .addField('୨・trial mod', `${message.guild.roles.cache.find(r => r.name == '୨・trial mod').members.map(m => m.user.tag).join('\n')}`)

        .setColor('00FFCC')
        .setFooter('Last Updated')
        .setTimestamp()

        message.channel.send(embed)
    }
}