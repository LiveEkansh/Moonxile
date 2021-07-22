const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'members',
    description: "Member count of a server",
    aliases: ['mc'],
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        const totalCount = message.guild.memberCount;
        const botCount = message.guild.members.cache.filter(member => member.user.bot).size;
        const memberCount = message.guild.members.cache.filter(member => !member.user.bot).size;

            const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL( {dynamic: true} ))
            .setDescription(`\`\`\`css\n✅ Total   : ${totalCount}\n👪 Members : ${memberCount}\n🤖 Bots    : ${botCount}\`\`\``)
            .setTimestamp()
            .setColor('9933ff')

        message.channel.send(embed)
    }
}