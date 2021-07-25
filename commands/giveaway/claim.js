const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const moment = require('moment');
const db = require('../../models/claims');

module.exports = {
    name: 'claim',
    description: 'Claim Template with log',
    usage: '<user> <reward>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== client.dev && message.author.id !== client.dev){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`.') // check permissions for user
        };
        message.delete();

        const member = message.mentions.members.first() //|| await message.guild.members.fetch(args[0]).catch(() => null);
        
        const reward = args.slice(1).join(' ').toUpperCase();
        if(!member || !reward){
            return message.lineReply(`Incorrect Usage, \`${prefix}claim <user> <reward>\``)
        };
        if(member.user.bot){
            return message.lineReply('The user mentioned is a bot') // ignore bots
        };
        // database 
        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(!data){
                data = new db({
                    guildid: message.guild.id,
                    user: member.user.id,
                    content: [
                        {
                            date : moment(message.createdAt).format("MMM Do YYYY"),
                            reward : reward
                        }
                    ]
                })
            } else {
                const obj = {
                    date : moment(message.createdAt).format("MMM Do YYYY"),
                    reward : reward
                }
                data.content.push(obj)
            }
            data.save();
        });
        const role = message.guild.roles.cache.find(r => r.name == '୧🌺・claimed');
        if(!role) return;
        member.roles.add(role);

        const channel = message.guild.channels.cache.get('866879408982851584')
        channel.send(`[${member}] claimed **${reward}**! Ask them if legit!`).then(sentMessage =>{
            sentMessage.react('<a:mw_trophy:867651795169181696>')
        });

        message.channel.send(`╭<:mw_tada:867655074413805578> **[${member}] won!** you may ask them if we're **LEGIT**.
**・━━━━━━━━━━━━━━━━━━━━━━━━━━━・**
<:mw_info:867654960875307028> **PRO TIP!**
<:mw_dots:867654889991831602> Be quick coming to our giveaway channels because we often delete the invite for the requirement after a few minutes, putting us above all other servers will allow you to be notified much easier!
<:mw_dots:867654889991831602> <#866879381434400768> for +3s claim time!
**・━━━━━━━━━━━━━━━━━━━━━━━━━━━・**
╰<:mw_sign:867655009844068383> Stay in **Milkyway** for more!`)
        .then(sentMessage =>{
            sentMessage.react('<a:mw_trophy:867651795169181696>')
        })
    }
}