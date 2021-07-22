const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'purge',
    aliases: ['clear'],
    description: 'Delete a number of messages',
    usage: '<number>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`')
        };
        const num = args[0];
        if(num < 1 || num > 100){
            return message.lineReplyNoMention('<:mw_cross:867667594505224192> | Cannot clear messages less than `1` and more than `100`')
        };
        
        const number = parseInt(num + 1);

        if(num.toLowerCase === 'bots'){
            await message.channel.bulkDelete(
                (await message.channel.messages.fetch({ limit: 100 }))
                .filter(m => !m.author.bot)
            ).catch(console.error)
            return message.channel.send(`<:mw_tick:867667518512168960> | Deleted \`bot\` messages!`)
        } else {
        await message.channel.bulkDelete(
            (await message.channel.messages.fetch({ limit: number }))
            .filter(m => !m.pinned)
        ).catch(console.error)

        message.channel.send(`<:mw_tick:867667518512168960> | \`${num}\` message(s) cleared!`)
        .then(message =>{
            message.delete({ timeout: 3000 })
        })
        .catch(console.error);
     }
   }
}