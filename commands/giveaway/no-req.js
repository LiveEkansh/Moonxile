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
        message.delete();
        
        message.channel.send([
            '╭<:mw_gift:867654903139401729> **MILKY WAY NO REQUIREMENT GIVEAWAY!**',
            '<:mw_dot:867654918188957696><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_dot:867654918188957696>',  
            '<:mw_dotline:867654933100232784> **PRO TIP!**',
            '\u200b',
            '<:mw_arrow:867655024271687712> Stay active during **giveaways/drops** for a higher chance to win **NITRO & ROBUX**!',
            '<:mw_arrow:867655024271687712> Putting us above all your servers will help see the pings at the earliest!',
            '<:mw_arrow:867655024271687712> <#866879381434400768> and get +3s claim time!',
            '<:mw_dot:867654918188957696><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_line:867654989769080834><:mw_dot:867654918188957696>',         
            '╰<:mw_sign:867655009844068383> **Stay in the channel to not get rerolled!**'
        ]);
    }
}