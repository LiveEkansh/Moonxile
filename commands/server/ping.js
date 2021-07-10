module.exports = {
    name: 'ping',
    aliases: [],
    usage: '',    
    execute(client, message, args){
        message.lineReplyNoMention(client.ws.ping + ' ms')
    }
}