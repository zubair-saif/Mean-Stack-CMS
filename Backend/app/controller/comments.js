'use strict';
const mongoose = require('mongoose');
const _ = require('lodash');
const Posts = require('../model/Post').Posts;
const Users = require('../model/User').Users;
const Comments = require('../model/Comment').Comments;

module.exports.commentOnPost = async (req, res) => {

    try {
        const user = req.user;
        if (!user) {
            return res.status(422).json({
                message: 'You must sign in before you can post new comment.'
            });
        }
        const post = await Posts.findOne({ _id: req.params.postId });
        const comment = new Comments({
            author: user.firstName + "" + user.lastName,
            message: req.body.message,
            postId: post._id,
            authorId: user._id
        });
        comment.save();
        res.send(comment);

    }
    catch {
        res.json({ message: "something Wrong" });
    }

}


/**
 * Get Signle post with All Comment By (Comment Id);
 */

module.exports.fetchCommentsByPostId = async (req, res) => {

    try {
        const comment = await Comments.find({ postId: req.params.postId })
            .select({})
            .limit(100)
            .sort({ time: 1 })
        if (!comment) {
            res.json({ message: "comment not found with this post" });
        }
        res.send(comment);
    }
    catch{
        res.json({ message: "something went wrong" });
    }

}