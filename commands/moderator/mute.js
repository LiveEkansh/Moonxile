module.exports = {
    name: 'mute',
    args: 2,
    usage: '<@user> [reason]',
    execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_ROLES')){
            return message.reply('Missing Permissions : `MANAGE_ROLES`')
        };
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member){
            return message.reply('Incorrect Usage : `;;mute <@user> [reason]`')
        }
        const reason = args.slice(1).join(' ');
        if(!reason) reason == 'Unspecified';
        const role = message.guild.roles.cache.find(r => r.name == '・muted');
        if(!role){
            return message.reply('No Muted role found!')
        };

        if(member.hasPermission('MANAGE_ROLES')){
            return message.reply('That user is a staff, I can\'t mute them!')
        };

        member.roles.add(role).catch(err =>{
            if(err){
                message.channel.send('Failed to mute : `'+ err +'`')
            }
        });

        const embed = new Discord.MessageEmbed()
        .setTitle('Member Muted')
        .setDescription(`Member : **${member.user.tag}**\nModerator : **${message.author.tag}**\nReason : ${reason}`)
        .setFooter('Muted at')
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('RED')

        message.channel.send(embed)
    }
}