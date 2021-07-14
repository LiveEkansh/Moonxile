const Discord = require('discord.js');
const { Client, Collection, Message, MessageEmbed } = require('discord.js');
const { readydirSync, readdirSync } = require('fs');
require('discord-reply')
const client = new Client();

const config = require('./config.json')
const prefix = config.prefix;
const token = process.env.TOKEN;
const mongo = process.env.MONGO;

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


client.login(token)

