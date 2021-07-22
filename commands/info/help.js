const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const prefix = require('../../config.json').prefix;

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: 'Shows all available commands',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        const dev = message.guild.members.cache.get('838620835282812969');
        const rColor = message.guild.me.displayHexColor === '#000000'
            ? "#ffffff"
            : message.guild.me.displayHexColor;
        
            if(!args[0]){
                let categories = [];
                
                const ignored = ['utils'];
                readdirSync("./commands/").forEach((dir) => {
                    if(ignored.includes(dir)) return;
                    
                    const commands = readdirSync(`./commands/${dir}/`)
                        .filter(file => file.endsWith('.js'));
                    
                    const cmds = commands.filter((command) => {
                        let file = require(`../../commands/${dir}/${command}`);

                        return !file.hidden;
                    }).map((command) => {
                        let file = require(`../../commands/${dir}/${command}`);

                        if(!file.name) return "`.`";
                        
                        let name = file.name.replace(".js", "");

                        return `\`${name}\``;
                    });
                    let data = new Object();

                    data = {
                        name: `<:mw_dotline:867654933100232784> ${dir.toUpperCase()}`,
                        value: cmds.length === 0
                            ? "In Progress"
                            : cmds.join(" ")
                    }
                    
                    categories.push(data);
                });

                const embed = new MessageEmbed()
                    .setTitle("<a:hoshi_moon:863681905781637150>・Milkyway Commands")
                    .setDescription(`Use \`${prefix}help <command>\` for additional information about a specific command`)
                    .addFields(categories)
                    .setFooter(`Developer・${dev.user.tag}`, dev.user.displayAvatarURL())
                    .setColor(rColor)
                return message.lineReplyNoMention(embed);
            } else {
                const command = client.commands.get(args[0].toLowerCase()) ||
                                client.commands.find(
                                    (c) => c.aliases && c.aliases.includes(args[0]).toLowerCase()
                                );
                
            if (!command) {
                     const embed = new MessageEmbed()
                      .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
                     .setColor("FF0000");
                    return message.channel.send(embed);
                 }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor(rColor);
      return message.channel.send(embed);
            }
    }
}