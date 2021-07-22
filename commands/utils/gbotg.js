const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = require('../../config.json').prefix;
const db = require('../../models/donations');

module.exports = {
    name: 'gbotg',
    /**
    * @param {Client} client,
    * @param {Message} message,
    * @param {String[]} args
    */
    async execute(client, message, args, Discord){
        const { author } = require('../../main');

      let donates;
  
      let winner = message.mentions.members.first();

      await db.findOne({ guildid: message.guild.id, user: winner.user.id }, async(err, data)=>{
        if(data){
          donates = parseInt(data.content.length);
        }
      });
  
      var DefaultTime = 10;
      var support = 0;
      var donate = 0;
      var boost = 0;
     
      const userRoles = winner.roles.cache.map((r) => r.name);
      
      if (userRoles.includes("୧🌱・supporter")) {
        support = 3;
      }
  
      if (userRoles.includes("୧🍂・donator")) {
        donate = donates * 5;
      }
      
      if (userRoles.includes("୧💐・booster")) {
        boost = 10;
      }
  
      let TotalTime = DefaultTime + support + donate + boost;
      if(winner.id === '794059310355185725' || winner.id === '838620835282812969') TotalTime = 'Infinite';
  
      message.channel
        .send(
          `🎉 Congratulations **${winner.user.tag}**! You have ${TotalTime} seconds to DM ${author}!`
        )
        .then((message) => {
          if(isNaN(TotalTime)) return;
          setTimeout(function () {
            message.channel.send(`${TotalTime} seconds up!`);
          }, TotalTime * 1000);
        });
      if(userRoles.includes("୧🌺・claimed")){
        return message.channel.send(`${winner.user.tag} has already claimed! Check \`.claims ${winner.id}\`.`)
      }
    }
}