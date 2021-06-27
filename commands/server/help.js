module.exports = {
    name: 'help',
    execute(client, message, args, Discord){
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + ' | Prefix - ;;', message.author.displayAvatarURL( {dynamic: true} ))
        .setColor('00ffcc')

        .addFields(
            {name: '<:1_sign:857846611397050369> Manager', value: '**`;;help manager`**'},
            {name: '<:1_stock:857846661937234000> Utility', value: '**`;;help utility`**'},
            {name: '<:1_box:857846673430282250> Server', value: '**`;;help server`**'},
            {name: '<:1_tada:857846692233478154> Giveaway', value: '**`;;help giveaway`**'}
        )

        .setThumbnail(message.guild.iconURL( {dynamic: true} ))
        .setTimestamp()
        .setFooter('Developer : .Ninnn.#0008')
        
        if(!args.length){
        return message.channel.send(embed)
        };
        const manager = new Discord.MessageEmbed()
        .setAuthor('Manager Commands', message.author.displayAvatarURL({ dynamic: true }))
        .setColor('00ffcc')
        .setDescription('`<` `>` is mandatory, `[` `]` is optional.')
        .addField('\u200b', [
            '`-` nuke',
            'Usage : `;;nuke`',
            '\u200b',
            '`-` mute',
            'Usage : `;;mute <@user> [reason]`',
            '\u200b',
            '`-` unmute',
            'Usage : `;;unmute <@user>`',
            '\u200b',
            '`-` slowmode',
            'Usage : `;;slowmode <seconds>`',
            '\u200b',
            '`-` purge',
            'Usage : `;;purge <number>`',
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
            '`-` Claim Template',
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

        const name = args[0].toLowerCase();
        if(name == 'manager'){
            return message.channel.send(manager)
        } else if(name == 'utility'){
            return message.channel.send(utility)
        } else if(name == 'server'){
            return message.channel.send(server)
        } else if(name == 'giveaway'){
            return message.channel.send(giveaway)
        } else {
            message.channel.send(`No such category named '${name}'`)
        };

    }
}