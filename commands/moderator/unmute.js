module.exports = {
    name: 'unmute',
    args: true,
    aliases: [],
    usage: '<@user>',
    permissions: 'MANAGE_ROLES',
    execute(client, message, args, Discord){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member){
            return message.lineReply('Incorrect Usage : `;;unmute <@user>`')
        }
        const role = message.guild.roles.cache.find(r => r.name == '・muted');
        if(!role) return;
        /*if(!member.roles.cache.find(role)){
            return message.channel.send(`${member.user.tag} is not muted!`)
        };*/
        member.roles.remove(role).catch(err =>{
            if(err){
                message.channel.send('Failed to unmute : `'+ err + '`');
            }
        });
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('Member Unmuted')
        .setDescription(`Member : **${member.user.tag}**\nModerator : **${message.author.tag}**`)
        .setFooter('Unmuted at')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('BLUE')
        )
    }
}