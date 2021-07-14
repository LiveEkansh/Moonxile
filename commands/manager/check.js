const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json');
const dbG = require('../../models/greet');
const dbW = require('../../models/welcome');

module.exports = {
    name: 'check',
    usage: '<welcome|greet>',
    description: 'Check the channel where greet|welcome messages are enabled',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            return message.lineReply('Missing Permissions `MANAGE_CHANNELS`')
        };

        const toggle = args[0];
        if(!toggle) return message.reply(`Incorrect Usage, \`${prefix}check <welcome|greet>\``);
        if(toggle === 'greet'){
        dbG.findOne({ Guild: message.guild.id }, async(err, data)=>{
            if(!data){
                return message.lineReplyNoMention('<:red_cross:864755062684123146> | No greet channel set, use `greet <#channel>`.');
            } 
            if(data){
                message.lineReplyNoMention(`<:1_tick:864501120628949002> | Greet messages are enabled on <#${data.Channel}>.`)
            }
        });
    } else if(toggle === 'welcome'){
        dbW.findOne({ Guild: message.guild.id }, async(err, data) =>{
            if(!data){
                return message.lineReplyNoMention('<:red_cross:864755062684123146> | No welcome channel set, use `welcome <#channel>`.')
                }
            if(data){
                message.lineReplyNoMention(`<:1_tick:864501120628949002> | Welcome embed is enabled on <#${data.Channel}>.`)
            }
            });
        } 
    }
}