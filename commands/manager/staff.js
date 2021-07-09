module.exports = {
    name: 'staff',
    permissions: ['ADMINISTRATOR'],
    aliases: ['stafflist'],
    usage: '',
    execute(client, message, args, Discord){

        const roles = [
            'creator',
            'founder',
            'co founder',
            'owner',
            'co owner',
            'head administrator',
            'administrator',
            'head moderator',
            'moderator',
            'trial moderator'
        ];

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name + ' Staff', message.guild.iconURL())
        .setColor('00FFCC')
        .setFooter('Last Updated')
        .setTimestamp()

        for (role of roles) {
            const members = message.guild.roles.cache.find(r => r.name === `・${role}`).members.map(m => m.user.tag).join('\n');
            embed.addField(`・${role}`, `${members}\n_ _`, true);
          };
          

        message.channel.send(embed)
    }
}