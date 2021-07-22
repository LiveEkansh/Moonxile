const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'staff',
    description: 'Staff List of the server',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.lineReply('Missing Permissions `ADMINISTRATOR`.')
        };
        const roles = [
            '୧🌙・founder',
            '୧✨・owner',
            '୧⚡️・co owner',
            '୧💫・head administrator',
            '୧⭐️・administrator',
            '୧🌈・giveaway manager',
            '୧🌕・senior moderator',
            '୧🌎・head moderator',
            '୧🌑・moderator',
            '୧🪐・trial staff'
        ];

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name + ' Staff', message.guild.iconURL())
        .setColor('9933ff')
        .setFooter('Last Updated')
        .setTimestamp()

        for (role of roles) {
            const members = message.guild.roles.cache.find(r => r.name === `${role}`).members.map(m => m.user.tag).join('\n');
            embed.addField(`${role}`, `${members}\n** **`, true);
          };
          

        message.channel.send(embed)
    }
}