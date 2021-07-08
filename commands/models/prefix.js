const mongoose = require('mongoose');

let prefixSchema = new mongoose.Schema({
    Prefix: String,
    Guild: String
});

module.exports = mongoose.model("prefix", prefixSchema);