module.exports = {
    name: 'thegiveawaybotmsg',
    description: 'The new winner is',
    execute(client, message){

      const { author } = require('./../../main');
  
      let winner = message.mentions.members.first();
  
      var DefaultTime = 10;
      var support = 0;
      var donate = 0;
      var boost = 0;
     
      const userRoles = winner.roles.cache.map((r) => r.name);
      
      if (userRoles.includes("୨・supporter")) {
        support = 3;
      }
  
      if (userRoles.includes("୨・donator")) {
        donate = 5;
      }
      
      if (userRoles.includes("୨・booster")) {
        boost = 10;
      }
  
      const TotalTime = DefaultTime + support + donate + boost;
  
      message.channel
        .send(
          `🎉 Congratulations **${winner.user.tag}**! You have ${TotalTime} seconds to DM ${author}!`
        )
        .then((message) => {
          setTimeout(function () {
            message.channel.send(`${TotalTime} seconds up!`);
          }, TotalTime * 1000);
        });
    },
  };