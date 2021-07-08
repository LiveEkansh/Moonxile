const pagination = require('discord.js-pagination');
const { prefix } = require('../../main');

module.exports = {
    name: 'help',
    execute(client, message, args, Discord){
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Prefix - ${prefix}`, message.author.displayAvatarURL( {dynamic: true} ))
        .setColor('00ffcc')

        .addFields(
            {name: '<:1_sign:857846611397050369> Manager', value: '**Page `2`**'},
            {name: '<:1_dotdot:857846709950349312> Moderator', value: '**Page `3`**'},
            {name: '<:1_stock:857846661937234000> Utility', value: '**Page `4`**'},
            {name: '<:1_box:857846673430282250> Server', value: '**Page `5`**'},
            {name: '<:1_tada:857846692233478154> Giveaway', value: '**Page `6`**'},
            {name: '🔗 discord.gg/moonxile', value: '*`Developer : .Ninnn.#0008`*'}
        )

        .setThumbnail(message.guild.iconURL( {dynamic: true} ))
        .setTimestamp()
        .setFooter('Developer : .Ninnn.#0008')
    
        const manager = new Discord.MessageEmbed()
        .setAuthor('Manager Commands', message.author.displayAvatarURL({ dynamic: true }))
        .setColor('00ffcc')
        .setDescription('`<` `>` is mandatory, `[` `]` is optional.')
        .addField('\u200b', [
            '`-` nuke',
            'Usage : `;;nuke`',
            '\u200b',
            '`-` slowmode',
            'Usage : `;;slowmode <seconds>`',
            '\u200b',
            '`-` purge',
            'Usage : `;;purge <number>`',
            '\u200b',
            '`-` greet',
            'Usage : `;;greet [channel]`',
            '\u200b',
            '`-` check',
            'Usage : `;;check`',
            '\u200b'
        ])
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setFooter('Developer : .Ninnn.#0008')

        const utility = new Discord.MessageEmbed()
        .setAuthor('Utility Commands', message.author.displayAvatarURL({ dynamic: true }))
        .setColor('00ffcc')
        .setDescription('`<` `>` is mandatory, `[` `]` is optional.')
        .addField('\u200b', [
            '`-` embed',
            'Usage : `;;embed <message>`',
            '\u200b',
            '`-` snowflake',
            'Usage : `;;snowflake <ID1> <ID2>`',
            '\u200b',
            '`-` info',
            'Usage : `;;info [@user]`',
            '\u200b',
            '`-` members',
            'Usage : `;;members`',
            '\u200b' 
        ])
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setFooter('Developer : .Ninnn.#0008')

        const server = new Discord.MessageEmbed()
        .setAuthor('Server Commands', message.author.displayAvatarURL({ dynamic: true }))
        .setColor('00ffcc')
        .setDescription('`<` `>` is mandatory, `[` `]` is optional.')
        .addField('\u200b', [
            '`-` claims',
            'Usage : `;;claims [@user]`',
            '\u200b',
            '`-` donations',
            'Usage : `;;donations [@user]`',
            '\u200b',
            '`-` help',
            'Usage : `;;help [category]`',
            '\u200b',
            '`-` ping',
            'Usage : `;;ping`',
            '\u200b'
        ])
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setFooter('Developer : .Ninnn.#0008')

        const giveaway = new Discord.MessageEmbed()
        .setAuthor('Giveaway Commands', message.author.displayAvatarURL({ dynamic: true }))
        .setColor('00ffcc')
        .setDescription('`<` `>` is mandatory, `[` `]` is optional.')
        .addField('\u200b', [
            '`-` No Requirement Template',
            'Usage : `;;no-req`',
            '\u200b',
            '`-` Quick Drop Template',
            'Usage : `;;drop [@user]`',
            '\u200b',
            '`-` Server Template',
            'Usage : `;;server [@user]`',
            '\u200b',
            '`-` Claim Template (NO LOG, NO ROLE)',
            'Usage : `;;winner <@user>`',
            '\u200b',
            '`-` Claim Template + Log',
            'Usage : `;;claim <@user> <reward>`',
            '\u200b',
            '`-` Claim Log',
            'Usage : `;;log <@user> <reward>`',
            '\u200b',
            '`-` Donation Log',
            'Usage : `;;donate <@user> <donation>`',
            '\u200b',
            '`-` Delete Claim',
            'Usage : `;;delclaim <@user> <claimID>`\nClaim ID can be found in `;;claims`',
            '\u200b',
            '`-` Delete Donation',
            'Usage : `;;deldonate <@user> <donationID>`\nDonation ID can be found in `;;donations`',
            '\u200b',
        ])
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setFooter('Developer : .Ninnn.#0008')

        const moderator = new Discord.MessageEmbed()
        .setAuthor('Moderator Commands', message.author.displayAvatarURL({ dynamic: true }))
        .setColor('00ffcc')
        .setDescription('`<` `>` is mandatory, `[` `]` is optional.')
        .addField('\u200b', [
            '`-` warn',
            'Usage : `;;warn <@user> <reason>`',
            '\u200b',
            '`-` delwarn',
            'Usage : `;;delwarn <@user> <warnID>`',
            '*WarnID can be found in `;;warnings <@user>`*',
            '\u200b',
            '`-` clearwarn',
            'Usage : `;;clearwarn <@user>`',
            '\u200b',
            '`-` mute',
            'Usage : `;;mute <@user> [reason]`',
            '\u200b',
            '`-` unmute',
            'Usage : `;;unmute <@user>`',
            '\u200b',
        ])
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setTimestamp()
        .setFooter('Developer : .Ninnn.#0008')

        const pages = [
            embed,
            manager,
            moderator,
            utility,
            server,
            giveaway
        ];

        const emojiList = ['◀️', '▶️'];

        const timeout = 120000;

        if(!args.length){
            return pagination(message, pages, emojiList, timeout);
        };

        const data = [];
        const { commands } = message.client;

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command){
            return message.channel.send(`Couldn't find a command with the name or alias, \`${name}\``);
        };

        data.push(`Command: **${command.name}**\n`);

        if(command.aliases) data.push(`Aliases: **${command.aliases.join('**, **')}**\n`);
        if(command.usage) data.push(`Usage: **${prefix}${command.name} ${command.usage}**\n`);

        message.channel.send(new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription(data)
            .setFooter(`Requested by ${message.author.tag}`)
            .setColor("00FFCC")
            .setThumbnail(message.author.displayAvatarURL({ dynamic:true }))
        )
    }
}