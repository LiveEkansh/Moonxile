module.exports = {
    name: 'members',
    execute(client, message, args, Discord){
        const totalCount = message.guild.memberCount;
        const botCount = message.guild.members.cache.filter(member => member.user.bot).size;
        const memberCount = message.guild.members.cache.filter(member => !member.user.bot).size;

            const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL( {dynamic: true} ))
            .setDescription(`\`\`\`css\nTotal   : ${totalCount}\nMembers : ${memberCount}\nBots    : ${botCount}\`\`\``)
            .setTimestamp()
            .setColor('00ffcc')

        message.channel.send(embed)
    }
}