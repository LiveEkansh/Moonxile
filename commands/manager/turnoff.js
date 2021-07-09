const dbGreet = require("../models/welcome");
const dbWelcm = require("../models/wembed");

module.exports = {
    name: 'turnoff', 
    args: true,
    usage: '<welcome|greet>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_CHANNELS')){
            return message.lineReply('Missing Permissions `MANAGE_CHANNELS`.')
        };

        let toggle = args[0];
        if(toggle === 'welcome'){
            dbWelcm.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(err) throw err;
                if(data){
                    await dbWelcm.findOneAndDelete({ Guild: message.guild.id })
                    message.lineReplyNoMention('Welcome Embed toggled off. [To enable it back, use `welcome <#channel>`]')
                } else {
                    message.lineReplyNoMention('Welcome Embed is already toggled off. Enable it using `welcome <#channel>`.')
                }
            });
        } else if (toggle === 'greet'){
            dbGreet.findOne({ Guild: message.guild.id }, async(err, data) =>{
                if(err) throw err;
                if(data){
                    await dbGreet.findOneAndDelete({ Guild: message.guild.id });
                    message.lineReplyNoMention('Greet messages toggled off. To enable it use `greet <#channel>`.')
                } else {
                    message.lineReplyNoMention('Greet messages are toggled off. Enable it using `greet <#channel>`')
                }
            })
        }
    }
}