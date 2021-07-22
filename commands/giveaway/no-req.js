const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json');

module.exports = {
    name: 'no-req',
    description: 'No Requirement template',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Missing Permissions `MANAGE_MESSAGES`');
        message.channel.send([
            '╭:mw_gift: **MOONXILE NO REQUIREMENT GIVEAWAY!**',
':mw_dot::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_dot:',
':mw_dotline: **PRO TIP!**', 
'\u200b',
':mw_arrow: Stay active during **giveaways/drops** for a higher chance to win **NITRO & ROBUX**!',
':mw_arrow: Putting us above all your servers will help see the pings at the earliest!',
':mw_arrow: #・🌱︰support-us and get +3s claim time!',
':mw_dot::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_line::mw_dot:',
 '╰:mw_sign: **Stay in the channel to not get rerolled!**'
        ]);
    }
}