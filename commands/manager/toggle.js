const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const dbGreet = require('../../models/greet');
const dbWelcm = require('../../models/welcome');        

module.exports = {
    name: 'toggle',
    description: 'Toggles off greet or welcome',
    usage: '<welcome|greet>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_CHANNELS') && message.author.id !== client.dev){
            return message.lineReply('Missing Permissions `MANAGE_CHANNELS`.')
        };

        let toggle = args[0];
        if(!toggle) return message.lineReply(`Incorrect Usage, \`${prefix}toggle <welcome|greet>\``);
        if(toggle === 'welcome'){
            dbWelcm.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(err) throw err;
                if(data){
                    await dbWelcm.findOneAndDelete({ Guild: message.guild.id })
                    message.lineReplyNoMention('<:mw_tick:867667518512168960> | Welcome Embed toggled off. [To enable it back, use `welcome <#channel>`]')
                } else {
                    message.lineReplyNoMention('<:mw_cross:867667594505224192> | Welcome Embed is already toggled off. Enable it using `welcome <#channel>`.')
                }
            });
        } else if (toggle === 'greet'){
            dbGreet.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(err) throw err;
                if(data){
                    await dbGreet.findOneAndDelete({ Guild: message.guild.id });
                    message.lineReplyNoMention('<:mw_tick:867667518512168960> | Greet messages toggled off. To enable it use `greet <#channel>`.')
                } else {
                    message.lineReplyNoMention('<:mw_cross:867667594505224192> | Greet messages are toggled off. Enable it using `greet <#channel>`')
                }
            })
        }
    }
}