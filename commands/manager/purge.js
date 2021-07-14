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
        const num = parseInt(args[0]);
        if(num < 1 || num > 100){
            return message.lineReplyNoMention('<:red_cross:864755062684123146> | Cannot clear messages less than `1` and more than `100`')
        };

        if(isNaN(num)){
            return message.lineReplyNoMention('<:red_cross:864755062684123146> | Enter a valid number!')
        };

        const number = num + 1;

        await message.channel.bulkDelete(
            (await message.channel.messages.fetch({ limit: number }))
            .filter(m => !m.pinned)
        ).catch(console.error)

        message.channel.send(`<:1_tick:864501120628949002> | \`${num}\` message(s) cleared!`)
        .then(message =>{
            message.delete({ timeout: 3000 })
        })
        .catch(console.error);
    }
}