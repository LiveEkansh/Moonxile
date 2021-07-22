const Discord = require('discord.js');
const { Client, Collection, Message, MessageEmbed } = require('discord.js');
const { readydirSync, readdirSync } = require('fs');
require('discord-reply')
const client = new Client();

const config = require('./config.json')
const prefix = config.prefix;
const token = process.env.TOKEN;
const mongo = process.env.MONGO;
const Schema = require('./models/greet');
const Welcm = require('./models/welcome');

const mongoose = require('mongoose');
mongoose.connect(mongo, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Connected Mongooose'));

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/");
["command"].forEach((handler) =>{
    require(`./handlers/${handler}`)(client)
});

client.on('ready', () => {
    console.log(`${client.user.username} ✅`);
    client.user.setActivity(`${prefix}help`, { type: 'LISTENING' });
});

client.on('message', message =>{
    if(message.content.startsWith('!greroll') 
    || message.content.startsWith('g!reroll') 
    || message.content.startsWith('q!reroll') 
    || message.content.startsWith('m!reroll') 
    || message.content.startsWith('!gstart')
    || message.content.startsWith('g!start')
    || message.content.startsWith('q!quickstart')
    || message.content.startsWith('q!start')
    ){
        const author = message.author;

        module.exports.author = author;
    }
    if(message.content.startsWith('🎉 The new winner is ') || message.content.startsWith('Congratulations ') || message.content.startsWith('**Congratulations ') || message.content.startsWith('🎉 New winner(s): ')){
        if(!message.author.bot) return;
        if(message.author.id === '716390085896962058') return;
        client.commands.get('gbotg').execute(client, message, Discord);
    };
    if(message.content === '<@!859270085403344976>') return message.lineReply(`My prefix is \`${prefix}\`.`)
    if(
        message.author.bot ||
        !message.guild || 
        !message.content.startsWith(prefix) 
    ) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if(!command) return;
    if(command) command.execute(client, message, args, Discord);
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {

    const role = newPresence.guild.roles.cache.find(r => r.name == '୧🌱・supporter');
    if(!role) return;
    const member = newPresence.member
    if(!member) return;
    const activities = member.user.presence.activities[0];
    if(!activities) return;
  
    if (activities &&  activities.state && (activities.state.includes( ".gg/milkywaycm" ) || activities.state.includes("discord.gg/milkywaycm" ) || activities.state.includes("milkywaycm" ))) {
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
    if(member.user.bot){
        const role = member.guild.roles.cache.find(r => r.name === '୧・Bots');
        if(!role) return;
        member.roles.add(role).catch(console.error);
    };
    if(member.user.bot) return;
    Schema.findOne({ Guild: member.guild.id }, async(e, data)=>{
        if(!data) return;
        const channel = member.guild.channels.cache.get(data.Channel);

        if(member.user.bot) return;
        channel.send(`Welcome to **${member.guild.name}**, <@!${member.user.id}>!`)
            .then(message =>{
                message.delete({ timeout: 5000 })
        })
            .catch(console.error);
    });
    Welcm.findOne({ Guild: member.guild.id }, async(e, data) =>{
        if(!data) return;
        const well = member.guild.channels.cache.get(data.Channel);
        if(!well) return;

        if(member.user.bot) return;

        const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setColor('9933ff')
        .setImage("https://i.imgur.com/n3JWlLk.png")
        .addField(`<a:mx_welcome:859458029111476224>・Welcome to ${member.guild.name}, ${member.user.username}!`, [
            '<:mw_sign:867655009844068383> Make sure to read our <#866879389178396672>',
            '<:mw_announce:867654975446450226> Get yourself some spicy roles from <#866879390167597067>',
        ])
        .setFooter(`You are our ${member.guild.memberCount}th member!`, member.guild.iconURL())
        well.send(`**Welcome**, <@!${member.user.id}>`, embed);
    })

    // const welcome = member.guild.channels.cache.find(ch => ch.name == '₊ʚ🍀・general');
    // if(!welcome) return;

    // welcome.send(`<@!${member.user.id}>`, embed) 
});

client.login(token)

