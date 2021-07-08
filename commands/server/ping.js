module.exports = {
    name: 'ping',
    description: 'Bot\'s latency',
    
    execute(client, message, args){
        message.channel.send(client.ws.ping + ' ms')
    }
}