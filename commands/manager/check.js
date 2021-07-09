const dbG = require('../models/welcome');
const dbW = require('../models/wembed');

module.exports = {
    name: 'check',
    args: true,
    usage: '<greet|welcome>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            return message.lineReply('Missing Permissions `MANAGE_CHANNELS`')
        };

        const toggle = args[0];
        if(toggle === 'greet'){
        dbG.findOne({ Guild: message.guild.id }, async(err, data)=>{
            if(!data){
                return message.lineReplyNoMention('No greet channel set, use `greet <#channel>`.');
            } 
            if(data){
                message.lineReplyNoMention(`Greet messages are enabled on <#${data.Channel}>.`)
            }
        });
    } else if(toggle === 'welcome'){
        dbW.findOne({ Guild: message.guild.id }, async(err, data) =>{
            if(!data){
                return message.lineReplyNoMention('No welcome channel set, use `welcome <#channel>`.')
                }
            if(data){
                message.lineReplyNoMention(`Welcome embed is enabled on <#${data.Channel}>.`)
            }
            });
        } else {
            message.lineReply('Incorrect Usage, command checks for `greet` and `welcome` only.')
        }
    }
}