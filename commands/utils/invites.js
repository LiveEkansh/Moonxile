const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'invites',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(message.author.id !== client.dev) return;

        let invites = [];
            client.guilds.cache.forEach(async (guild) => { 
              const channel = guild.channels.cache 
                .filter((channel) => channel.type === 'text')
                .first();
              if(!channel) return;
              await channel.createInvite({ maxAge: 0, maxUses: 0 }).then((invite) => {
                    invites.push(`${guild.name} | ${invite.code}`);
                })
                .catch((error) => console.log(error));
              message.channel.send(invites);
            });
    }
}