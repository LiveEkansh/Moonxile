const config = require('../../config.json');
const prefixModel = require('../models/prefix');
const { dev } = require('../../main');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    usage: '[command]',
    async execute(client, message, args, Discord){
        const Model = await prefixModel.findOne({ Guild: message.guild.id });
        let Prefix;
        if(Model){
            Prefix = Model.Prefix;
        } else {
            Prefix = config.prefix;
        };
        

        const embed = new Discord.MessageEmbed()
        .setTitle(`<a:mx_moon:862697339377680394>・Prefix - ${Prefix}`)
        .setDescription(`To change the prefix use \`${Prefix}setprefix\``)
        .setColor('00ffcc')

        .addField('<:1_dotline:857846544128802826> Manager', '`nuke`, `slowmode`, `purge`, `greet`, `check`, `welcome`, `turnoff`')
        .addField('<:1_dotline:857846544128802826> Moderator', '`warn`, `delwarn`, `clearwarn`, `mute`, `unmute`')
        .addField('<:1_dotline:857846544128802826> Utility', '`embed`, `snowflake`, `info`, `members`')
        .addField('<:1_dotline:857846544128802826> Server', '`claims`, `donations`, `help`, `ping`')
        .addField('<:1_dotline:857846544128802826> Giveaway', '`no-req`, `drop`, `stay`, `winner`, `claim`, `log`, `donate`, `delclaim`, `deldonate`')

        .setThumbnail(message.guild.iconURL( {dynamic: true} ))
        .setFooter(`Developer・${dev.tag}`, dev.displayAvatarURL())
    
        if(!args.length){
            return message.channel.send(embed)
        };

        const data = [];
        const { commands } = message.client;

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command){
            return message.channel.send(`Couldn't find a command with the name or alias, \`${name}\``);
        };

        data.push(`**Command: \`${command.name}\`**\n`);

        if(command.aliases) data.push(`**Aliases: \`${command.aliases.join('`**, **`')}\`**\n`);
        if(command.usage) data.push(`**Usage: \`${Prefix}${command.name} ${command.usage}\`**\n\n`);

        message.channel.send(new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription(data)
            .setFooter(`Requested by ${message.author.username}`)
            .setColor("00FFCC")
        )
    }
}