module.exports = {
    name: 'server',
    execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('Missing Permissions `MANAGE_MESSAGES`.')
        };
        message.delete();
        const user = message.mentions.users.first() || message.author;
        const embed = new Discord.MessageEmbed()
        .setColor('00ffcc')
        .addField('<:1_gift:857846495046402088> **GG! STAY IN THAT SERVER!**', `
        <:1_dotline:857846544128802826> Only those who joined with ${user}'s link can win.
                
        <:1_info:857846561714208819> **LATE? make sure to follow tips below:**
        <:1_dots:857846478587428904> Be fast coming to giveaway channels because we delete link in a few minutes, putting as above all other servers will help you see the pings easily!
        <:1_dots:857846478587428904> Be active in **drops/giveaways** for you to win **NITRO & ROBUX**
                
        <:1_sign:857846611397050369> **Stay in channel so you won't miss the giveaway**`)
        .setImage('https://i.imgur.com/PZyF3Qu.gif')
        .setTimestamp()

        message.channel.send(embed)
    }
}