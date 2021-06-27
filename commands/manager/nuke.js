module.exports = {
    name: 'nuke',
    description: 'nukes a channel',
    execute(client, message, args){
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send('Insufficient Permissions : `manage_channels`');
        };

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
        return message.channel.send('I\'m missing the permissions : `manage_channels`');
        };
                
           message.channel.clone({ parent: message.channel.parentID, position: message.channel.rawPosition }).then((ch) => {
      ch.send(`**${message.author.tag}** nuked the channel!`);
    });

        message.channel.delete()
        }   
    }
