module.exports = {
    name: 'purge',
    args: true,
    usage: '<number>',
    async execute(client, message, args, Discord){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('Missing Permissions `MANAGE_MESSAGES`')
        };
        const num = parseInt(args[0]);
        if(num < 1 || num > 100){
            return message.channel.send('Cannot clear messages less than `1` and more than `100`')
        };

        if(isNaN(num)){
            return message.channel.send('Enter a valid number! Eg : `;;purge 10`')
        };

        const number = num + 1;

        await message.channel.bulkDelete(
            (await message.channel.messages.fetch({ limit: number }))
            .filter(m => !m.pinned)
            .catch(console.error)
        )
        // message.channel.bulkDelete(parseInt(number), true)
        // .catch(console.error);

        message.channel.send(`<a:mx_check:858745251305226270> \`${num}\` messages cleared!`)
        .then(message =>{
            message.delete({ timeout: 3000 })
        })
        .catch(console.error);
    }
}
/*
message.channel.fetchMessages({ limit: 100 })
  .then(fetched => {
    const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

    message.channel.bulkDelete(notPinned, true);
  })
  .catch(console.error);
*/