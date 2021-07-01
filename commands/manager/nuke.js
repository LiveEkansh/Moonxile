module.exports = {
    name: 'nuke',
    description: 'nukes a channel',
    execute(client, message, args){
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send('Missing Permissions `MANAGE_CHANNELS`');
        };
                
           message.channel.clone({ parent: message.channel.parentID, position: message.channel.rawPosition }).then((ch) => {
      ch.send(`**${message.author.tag}** nuked the channel!`);
    });

        message.channel.delete()
        }   
    }
