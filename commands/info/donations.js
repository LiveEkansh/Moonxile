const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/donations');

module.exports = {
    name: 'donations',
    description: 'Donations of a member for the server',
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
                    .setTitle(`${member.user.tag}'s Donations`)
                    // .setDescription(
                    //     data.content.map(
                    //         (w, i) => 
                    //         `\`${i + 1}\` | **${w.date}**\nDonation : **${w.donation}**\n`
                    //     )
                    // )
                    .setColor("9933ff")
                    .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
                    .setFooter(`${parseInt(data.content.length)} donation(s)`, message.guild.iconURL({ dynamic: true }))

                    data.content.forEach((w, i) =>{
                        embed.addField(`${w.date}`, `Donation: **${w.donation}**\nID: **${i + 1}**`, true)
                    });

                    message.lineReplyNoMention(embed)
                
            } else {
                message.lineReplyNoMention(new Discord.MessageEmbed()
                .setTitle(`${member.user.tag}'s Donations`)
                .setDescription(`**No Data Found**`)
                .setColor('9933ff')
                .setThumbnail(member.user.displayAvatarURL( {dynamic: true} ))
                )
            };
        })
    }
}