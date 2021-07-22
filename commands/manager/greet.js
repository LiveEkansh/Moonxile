const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/greet');

module.exports = {
    name: 'greet',
    description: 'Enable greet messages on a channel',
    usage: '<channel>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`')
        };
        
        const channel = message.mentions.channels.first();
        if(!channel) return message.reply(`Incorrect Usage, \`${prefix}greet <channel>\``)

        db.findOne({ Guild: message.guild.id }, async(err, data)=>{
            if(data){
                data.Channel = channel.id;
                data.save();
            } else {
                new db({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }
            message.channel.send(`<:mw_tick:867667518512168960> | Set greet messages on <#${channel.id}>`)
        });
    }
}