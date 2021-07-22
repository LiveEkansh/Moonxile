const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/claims');

module.exports = {
    name: 'claims',
    description: 'Total claims of a member in the server',
    usage: '[user]',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if(member.user.bot){
            return message.lineReply('The user is a bot.')
        };

        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(data) {
                
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${member.user.tag}'s Claims`)
                    // .setDescription(
                    //     data.content.map(
                    //         (w, i) => 
                    //         `\`${i + 1}\` | **${w.date}**\nReward : **${w.reward}**\n`
                    //     )
                    // )
                    .setColor("9933ff")
                    .setFooter(`${data.content.length} claim(s)`, message.guild.iconURL({ dynamic: true }))
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

                    // for(let i in data.content){
                    //     let w = data.content[1];
                    //     embed.addField(`${w.date}`, `Reward: **${w.reward}**\nID: **${i + 1}**`, true)
                    // };
                    data.content.forEach((w, i) => {
                        embed.addField(`${w.date}`, `Reward: **${w.reward}**\nID: **${i + 1}**`, true);
                    });

                message.channel.startTyping();        
                await message.lineReplyNoMention(embed)
            } else if (!data){
                message.lineReplyNoMention(new Discord.MessageEmbed()
                .setTitle(`${member.user.tag}'s Claims`)
                .setDescription(`**No Data Found**`)
                .setColor('9933ff')
                .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
                )
            }
        });
    }
}