module.exports = {
    name: 'embed',
    args: true,
    usage: '<description>',
    execute(client, message, args, Discord){
        if(!args[0]){
            return message.channel.send('Incorrect Usage : `;;embed <description>`')
        };
        const embed = new Discord.MessageEmbed()
        .setDescription(args.join(' '))
        .setAuthor(message.guild.name, message.guild.iconURL( {dynamic: true} ))
        .setColor('00ffcc')
        .setTimestamp()

        message.channel.send(embed)
    }
}