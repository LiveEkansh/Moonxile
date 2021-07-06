const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Message: String
});

module.exports = mongoose.model("welcome", Schema);