module.exports = {
    name: 'staff',
    execute(client, message, args, Discord){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('Missing Permissions `ADMINISTRATOR`')
        };

        const roles = [
            '୨・Creators',
            '୨・founder',
            '୨・co founder',
            '୨・owner',
            '୨・co owner',
            '୨・head admin',
            '୨・admin',
            '୨・head mod',
            '୨・moderator',
            '୨・trial mod'
        ]

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name + ' Staff', message.guild.iconURL())
        .setColor('00FFCC')
        .setFooter('Last Updated')
        .setTimestamp()

        for (role of roles) {
            const members = message.guild.roles.cache.find(r => r.name === `${role}`).members.map(m => m.user.tag).join('\n');
            embed.addField(`${role}`, members, true);
          };
          

        message.channel.send(embed)
    }
}