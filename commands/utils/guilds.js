const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'guilds',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(message.author.id !== client.dev) return;
        if(!args.length){
            const embed = new MessageEmbed();

            client.guilds.cache.forEach(guild => {
                embed.addField(guild.name, guild.id)
            });

            message.lineReplyNoMention(embed);
        }
    }
}
