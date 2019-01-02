const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    votes: {type: Number, default: 0},
    added: {type: Date, default: Date.now},

});

module.exports =  mongoose.model("Post", postSchema);