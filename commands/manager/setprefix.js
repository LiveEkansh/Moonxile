const prefix = require('discord-prefix');

module.exports = {
    name: 'setprefix',
    args: true,
    usage: '<newPrefix>',
    async execute(client, message, args, Discord){
        const pre = args[0];
        await prefix.setPrefix(pre, message.guild.id);

        await message.channel.send(`Successfully changed prefix to \`${pre}\`.`)
    }
}