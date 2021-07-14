const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json');
const db = require('../../models/welcome');

module.exports = {
    name: 'welcome',
    description: 'Set welcome embed on a channel',
    usage: '<channel>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            return message.lineReply('Missing Permissions `MANAGE_CHANNELS`.')
        };
        const ch = message.mentions.channels.first();
        if(!ch) return message.lineReply(`Incorrect Usage, \`${prefix}welcome <channel>\``)
        if(ch){
            await db.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(data){
                    data.Channel = ch.id;
                    data.save();
                } else {
                    new db({
                        Guild: message.guild.id,
                        Channel: ch.id
                    }).save();
                }
                message.channel.send(`<:1_tick:864501120628949002> | Welcome embed toggled **ON** [Channel: <#${ch.id}>]`);
                
            });
        }
    }
}