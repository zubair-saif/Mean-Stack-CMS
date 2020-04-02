const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({

    title: {
        type: String
    },
    content: {
        type: String
    },
    readTime: {
        type: Number
    },
    preview: {
        type: String
    },
    like: {
        type: Number,
        default: 0
    },
    imageLink: {
        type: String
    },
    imagesContent: {
        type: Array
    },
    tag: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: String,
    authorId: String,

});

schema.methods.likes = function (cb) {
    this.like += 1;
    this.save(cb);
}

const Posts = mongoose.model('posts', schema);
module.exports.Posts = Posts;