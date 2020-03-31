const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({

    title: String,
    content: String,
    readTime: Number,
    imgeUrl: {
        type: String
    },
    like: {
        type: Number,
        default: 0
    },
    tag: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: String,

});

schema.methods.likes = function (cb) {
    this.like += 1;
    this.save(cb);
}

const Posts = mongoose.model('posts', schema);
module.exports.Posts = Posts;