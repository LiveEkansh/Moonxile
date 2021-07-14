// const { Client, Message, MessageEmbed } = require('discord.js');
// const glob = require('glob');

// module.exports = {
//     name: 'reload',
//     /**
//     * @param {Client} client,
//     * @param {Message} message,
//     * @param {String[]} args
//     */
//     run: async(client, message, args) =>{
//         if(message.author.id !== '838620835282812969') return;
//         client.commands.sweep(() => true);
//         glob(`${__dirname}/../**/*.js`, async(err, filePaths) =>{
//             if(err) return console.log(err);
//             filePaths.forEach((file) =>{
//                 delete require.cache[require.resolve(file)];

//                 const pull = require(file);

//                 if(pull.name){
//                     console.log(`Reloaded ${pull.name}`)
//                     client.commands.set(pull.name, pull)
//                 }

//                 if(pull.aliases && Array.isArray(pull.aliases)){
//                         pull.aliases.forEach((alias) =>{
//                             client.aliases.set(alias, pull.name)
//                         });
//                 }

//             })
//         });
//         await message.lineReplyNoMention(`<:1_tick:864501120628949002> | Reloaded all commands!`)
//     }
// }