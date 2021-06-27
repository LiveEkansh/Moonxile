/*module.exports = {
    name: 'status',
    async execute(client, message, args, Discord){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        var support = 0;
        var donate = 0;
        var boost = 0;
        var time = 10;

        const { donates } = require('./donations');

        if(member.roles.cache.find(r => r.name == '୨・supporter')){
            support = 3;
        };
        if(member.roles.cache.find(r => r.name == '୨・booster')){
            boost = 10;
        };
        if(member.roles.cache.find(r => r.name == '୨・donator')){
            donate = donates * 5;
        };        

        const TotalTime = time + support + donate + boost;

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username}'s status`, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription([
            `<:1_dots:857846478587428904> Supporting Moonxile : \`+${support}\`s`,
            `<:1_dots:857846478587428904> Donated \`${donates}\` : \`+${donate}\`s`,
            `<:1_dots:857846478587428904> Boosting Moonxile : \`+${boost}\`s`,
            `<:1_dots:857846478587428904> Default : \`10\`s`,
        ])
        .setFooter(`${TotalTime} seconds`, message.guild.iconURL({ dynamic: true }))

        message.channel.send(embed)
    }
}*/