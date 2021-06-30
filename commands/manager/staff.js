module.exports = {
    name: 'staff',
    execute(client, message, args, Discord){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('Missing Permissions `ADMINISTRATOR`')
        };

        const roles = [
            'Creators',
            'founder',
            'co founder',
            'owner',
            'co owner',
            'head admin',
            'admin',
            'head mod',
            'moderator',
            'trial mod'
        ]

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name + ' Staff', message.guild.iconURL())
        .setColor('00FFCC')
        .setFooter('Last Updated')
        .setTimestamp()

        for (role of roles) {
            const members = message.guild.roles.cache.find(r => r.name === `୨・${role}`).members.map(m => m.user.tag).join('\n');
            embed.addField(`୨・${role}`, `.\n${members}`, true);
          };
          

        message.channel.send(embed)
    }
}