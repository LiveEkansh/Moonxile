module.exports = {
    name: 'purge',
    args: true,
    usage: '<number>',
    execute(client, message, args, Discord){
        const num = parseInt(args[0]);
        if(num < 1 || num > 100){
            return message.channel.send('Cannot clear messages less than `1` and more than `100`')
        };

        if(isNaN(num)){
            return message.channel.send('Enter a valid number! Eg : `;;purge 10`')
        };

        const number = num + 1;

        message.channel.bulkDelete(parseInt(number), true)
        .catch(console.error);

        message.channel.send(`<a:mx_check:858745251305226270> \`${num}\` messages cleared!`)
    }
}