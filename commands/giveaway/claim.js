const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json');

module.exports = {
    name: 'claim',
    description: 'Claim Template with log',
    usage: '<user> <reward>',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.lineReply('Missing Permissions `MANAGE_MESSAGES`.') // check permissions for user
        };
        message.delete();

        const member = message.mentions.members.first() //|| await message.guild.members.fetch(args[0]).catch(() => null);
        
        const reward = args.slice(1).join(' ').toUpperCase();
        if(!member || !reward){
            return message.lineReply(`Incorrect Usage, \`${prefix}claim <user> <reward>\``)
        };
        if(member.user.bot){
            return message.lineReply('The user mentioned is a bot') // ignore bots
        };
        // database 
        db.findOne({ guildid: message.guild.id, user: member.user.id }, async(err, data) =>{
            if(err) throw err;
            if(!data){
                data = new db({
                    guildid: message.guild.id,
                    user: member.user.id,
                    content: [
                        {
                            date : moment(message.createdAt).format("MMM Do YYYY"),
                            reward : reward
                        }
                    ]
                })
            } else {
                const obj = {
                    date : moment(message.createdAt).format("MMM Do YYYY"),
                    reward : reward
                }
                data.content.push(obj)
            }
            data.save();
        });
        const role = message.guild.roles.cache.find(r => r.name == '・claimed');
        if(!role) return;
        member.roles.add(role);

        const channel = message.guild.channels.cache.get('857989744701210675')
        channel.send(`[${member}] claimed **${reward}**! Ask them if legit!`).then(sentMessage =>{
            sentMessage.react('<a:mx_trophy:863765662346641409>')
        });

        message.channel.send(`╭<:1_tada:857846692233478154> **[${member}] won!** you may ask them if we're **LEGIT**.
**・━━━━━━━━━━━━━━━━━━━━━━━━━━━・**
<:1_info:857846561714208819> **PRO TIP!**
<:1_dots:857846478587428904> Be quick coming to our giveaway channels because we often delete the invite for the requirement after a few minutes, putting us above all other servers will allow you to be notified much easier!
<:1_dots:857846478587428904> <#857633375543885884> for +3s claim time!
**・━━━━━━━━━━━━━━━━━━━━━━━━━━━・**
╰<:1_sign:857846611397050369> Stay in **Moonxile** for more!`)
        .then(sentMessage =>{
            sentMessage.react('<a:mx_trophy:863765662346641409>')
        })
    }
}