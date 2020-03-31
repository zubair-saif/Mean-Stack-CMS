const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    message: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now()
    },
    postId: String,
    createdBy: String,

});

const Comments = mongoose.model('comment', schema);
module.exports.Comments = Comments;
