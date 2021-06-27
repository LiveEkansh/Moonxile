module.exports = {
    name: 'slowmode',
    args: true,
    usage: '<seconds>',
    execute(client, message, args, Discord){
        const num = parseInt(args[0]);
        if(args[0] === '0' || args[0] == 'off'){
            return message.channel.setRateLimitPerUser(0).then(ch =>{
                ch.send(`**<#${message.channel.id}>**'s slowmode has been removed!`)
            });
        };
        if(num > 3600){
            return message.reply('Slowmode cannot last more than 1 hour!')
        };
        if(num < 1){
            return message.reply('Slowmode must be more than 1 second!')
        };
        if(isNaN(num)){
            return message.reply('Enter a valid Number!')
        };
        message.channel.setRateLimitPerUser(parseInt(num));
        message.channel.send(`**<#${message.channel.id}>** now has a slowmode of **${num}** seconds!`)
    }
}