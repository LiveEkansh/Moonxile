const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Channel: String
});

module.exports = mongoose.model('chat-welcm', Schema);