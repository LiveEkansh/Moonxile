module.exports = {
    name: 'drop',
    execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('Missing Permissions `MANAGE_MESSAGES`.')
        };
        message.delete();
        const user = message.mentions.users.first() || message.author;
        const embed = new Discord.MessageEmbed()
        .setColor('00ffcc')
        .setDescription(`<:1_tada:857846692233478154> **MOONXILE DROP!**

        <:1_dotline:857846544128802826> Must join with ${user}'s link!
                
        <:1_info:857846561714208819> **PRO TIP!**
        <:1_dots:857846478587428904> If the bot doesn't trace you, make sure to **REJOIN**!
        <:1_dots:857846478587428904> Copy the link so that you can rejoin as many times you want!
        <:1_dots:857846478587428904> Be fast coming to giveaway channels because we delete link in a few minutes, putting as above all other servers will help you see the pings easily!
        <:1_dots:857846478587428904> Be active in **drops/giveaways** for you to win **NITRO & ROBUX**
                
        <:1_sign:857846611397050369>**Stay in channel so you won't miss the giveaway**`)
        .setTimestamp()

        message.channel.send(embed)
    }
}