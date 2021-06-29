const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Connected MongoDB'));

const config = require('./config.json');
const prefix = config.prefix;

const Schema = require('./commands/models/welcome');

client.models = new Discord.Collection();
client.commands = new Discord.Collection();
const load_dir = (dirs) =>{
    const commandFiles = fs.readdirSync(`./commands/${dirs}/`).filter(file => file.endsWith('.js'));

    for(const file of commandFiles){
        const command = require(`./commands/${dirs}/${file}`);
        if(command.name){
            client.commands.set(command.name, command)
        } else {
            continue;
        }
    }
}

['data', 'giveaway', 'manager', 'server', 'utility', 'models'].forEach(e => load_dir(e));

client.on('ready', () =>{
    console.log(`${client.user.tag} is online!`);
    client.user.setPresence({
        status: 'idle',
        activity: {
            name: `${client.users.cache.size} users in .gg/moonxile!`,
            type: 'WATCHING'
        }
    })
});

client.on('message', message =>{
    if(message.content.startsWith('!greroll') || message.content.startsWith('g!reroll') || message.content.startsWith('q!reroll') || message.content.startsWith('m!reroll') || message.content.startsWith('$reroll')){
        const author = message.author;

        module.exports.author = author;
    }
    if(message.content.startsWith('🎉 The new winner is ') || message.content.startsWith('Congratulations ') || message.content.startsWith('**Congratulations ') || message.content.startsWith('🎉 New winner(s): ')){
        if(!message.author.bot) return;
        client.commands.get('thegiveawaybotmsg').execute(client, message, Discord);
    };

    if(message.channel.type == 'dm') return;
    if(message.author.bot) return;
     
    if(message.content == '<@!857984815579136030>'){
         message.channel.send('Prefix - `;;`. Commands - `;;help`.')
     }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);
    if(command) command.execute(client, message, args, Discord);

    if(cmd.length == 0) return;
    if(cmd.includes(prefix)) return;
    if(!command){
        return message.reply(`Command '${cmd}' not found. \`;;help\` for the list of commands.`)
    };

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
    
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
    
        return message.channel.send(reply);
    };
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {

    const role = newPresence.guild.roles.cache.find(r => r.name == '୨・supporter');
    if(!role) return;
    const member = newPresence.member
    if(!member) return;
    const activities = member.user.presence.activities[0];
    if(!activities) return;
  
    if (activities &&  activities.state && (activities.state.includes( ".gg/moonxile" ) || activities.state.includes("discord.gg/moonxile" ) || activities.state.includes("moonxile" ))) {
      return newPresence.member.roles.add(role)
      .catch(err => {
      console.log(err)
      return;
      })

    } else {
    if(member.roles.cache.get(role.id)) {
      newPresence.member.roles.remove(role)
      .catch(err => {
      console.log(err)
      return;

      })
      }
    }
});

client.on('guildMemberAdd', async (member) =>{
    Schema.findOne({ Guild: member.guild.id }, async(e, data)=>{
        if(!data) return;
        const channel = member.guild.channels.cache.get(data.Channel);

        channel.send(`Welcome to **${member.guild.name}**, ${member}!`)
            .then(message =>{
                message.delete({ timeout: 5000 })
        })
            .catch(console.error);
    });
    const welcome = member.guild.channels.cache.get('₊ʚ🍀・general');
    if(!welcome) return;
    const embed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
    .setColor('00FFCC')
    .setImage("https://cdn.discordapp.com/attachments/855652245025587200/859457356509347870/Welcome.gif")
    .addField(`<a:mx_welcome:859458029111476224>・Welcome to Moonxile, ${member.user.username}!`, [
        '<:1_sign:857846611397050369> Make sure to read our <#857632920089264198>',
        '<:1_announce:857846579376947220> Get yourself some spicy roles from <#859072030686707763>',
    ])
    .setFooter(`You are our ${member.guild.users.cache.size}th member!`, member.guild.iconURL())
    welcome.send(embed) 
});

client.login(process.env.TOKEN) 