const { SnowflakeUtil } = require('discord.js');

module.exports = {
    name: 'snowflake',
    aliases: ["timedif"],
    args: 2,
    usage: '<ID1> <ID2>',
    async execute(client, message, args, Discord){
        const id1 = args[0];
        const id2 = args[1];
        if(!id2 || !id1){
            return message.lineReply(`Incorrect usage : \`;;snowflake <ID1> <ID2>\``)
        };

        if(isNaN(id1) || isNaN(id2)){
            return message.lineReply(`Enter a valid ID`)
        };

        const diff1 = await SnowflakeUtil.deconstruct(id1);
        const diff2 = await SnowflakeUtil.deconstruct(id2);

        const time = (diff2.timestamp - diff1.timestamp) / 1000;

        message.channel.send(`The time difference between both the ID's is **${Math.abs(time)}** seconds!`);
    }
}