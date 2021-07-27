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
        } else if (args[0] === 'invite'){
            var invites = []; 
            message.client.guilds.cache.forEach(async (guild) => { 
              const channel = guild.channels.cache 
                .filter((channel) => channel.type === 'text')
                .first();
              if (!channel || guild.member(client.user).hasPermission('CREATE_INSTANT_INVITE')) return;
              await channel
                .createInvite({ maxAge: 0, maxUses: 0 })
                .then(async (invite) => {
                  invites.push(`${guild.name} : ${invite.url}\n`); 
                })
                .catch((error) => console.log(error));
              console.log(invites);
            });
        }
    }
}
