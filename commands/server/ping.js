module.exports = {
    name: 'ping',
    aliases: [],
    usage: '',    
    execute(client, message, args){
        message.channel.send(client.ws.ping + ' ms')
    }
}