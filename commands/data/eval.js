const { Client, Message, MessageEmbed } = require('discord.js');
const { type } = require('os');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    hidden: true,
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(message.author.id !== "838620835282812969") return message.lineReplyNoMention(`Eval command may only be used by the bot owner.`);
        
        const code = args.join(" ");
        if(!code) return message.reply("Provide a code to evaluate.");
        if(code.includes("token")) return message.lineReply(`~~You Tried~~`, { code: 'js' })
        try {
            const result = await eval(code);
            let output = result;
            if(typeof result !== "string"){
                output = inspect(result);
            }

            message.lineReplyNoMention(output, { code: 'js' })
        } catch (error) {
            console.log(error)
            message.lineReplyNoMention('Failed to evaluate.')
        }
    }
}