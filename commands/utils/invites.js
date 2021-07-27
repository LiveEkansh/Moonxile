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

        // let invites = [];
        //     client.guilds.cache.forEach(async (guild) => { 
        //       const channel = guild.channels.cache 
        //         .filter((channel) => channel.type === 'text')
        //         .first();
        //       if (!channel || guild.member(client.user).hasPermission('CREATE_INSTANT_INVITE')) return;
        //       await channel
        //         .createInvite({ maxAge: 0, maxUses: 0 })
        //         .then(async (invite) => {
        //             invites.push(`${guild.name} | ${invite.url}`);
        //         })
        //         .catch((error) => console.log(error));
        //       message.lineReplyNoMention(embed);
        //     });

        client.guilds.forEach(g => {
            g.fetchInvites().then(guildInvites => {
                invites[invites.length + 1] = (g + " - `Invites: " + guildInvites.array().join(", ") + "`");
                ct++;
    
                if(ct >= client.guilds.size) {
                    invites.forEach((invite, i) => {
                        if(invite == undefined)
                            invites.splice(i, 1);
                    }); 
    
                    invites.shift();
                    invites.forEach((invite, i) => invites[i] = "- " + invite);
                    invites = invites.join("\n\n");
    
                    let embed = new Discord.RichEmbed()
                    .setTitle("All Invites:")
                    .setDescription(invites);
    
                    message.channel.send(embed);
                }
            }).catch(err => {
                ct++;
            });
        });
    }
}