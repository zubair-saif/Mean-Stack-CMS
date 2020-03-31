'use strict';
const mongoose = require('mongoose');
const _ = require('lodash');
const Posts = require('../model/Post').Posts;
const Users = require('../model/User').Users;
const Comments = require('../model/Comment').Comments;

module.exports.create = async (req, res) => {

    try {
        const user = req.user;
        const form = req.body;
        const posts = await Posts.create({
            title: form.title,
            content: form.content,
            readTime: form.readTime,
            like: form.like,
            tag: form.tag,
            createdBy: user._id
        });

        posts.save();
        return res.json({ message: "Successfully Created" });
    }
    catch{
        res.json({ message: "something went wrong" });
    }


}

// module.exports.getPost = async (req, res) => {

// const getOne = await Posts.aggregate([

//     {
//         $lookup: {
//             from: 'comment',
//             localField: "comments",
//             foreignField: "_id",
//             as: "comment"
//         },
//     },
//     {
//         $unwind: "$comment"
//     },
//     {
//         $lookup: {
//             from: 'users',
//             localField: 'createdBy',
//             foreignField: '_id',
//             as: 'users',
//         },
//     },
//     {
//         $unwind: "$users"
//     }

// ]);

/**
 * Get single Post By (Post ID)
 */

module.exports.getSinglePost = async (req, res) => {
    try {
        const post = await Posts.findOne({ _id: req.params.id });
        if (!post) {
            res.json({ message: "not found" });
        }
        return res.json(post);
    }
    catch {
        res.json({ message: "error " });
    }

};

/**
 * Get Signle post with All Comment By (Comment Id);
 */

module.exports.SinglePostWithAllComment = async (req, res) => {

    try {
        const comment = await Comments.find({ postId: req.params.id })
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

module.exports.commentOnPost = async (req, res) => {
    try {
        const post = await Posts.findOne({ _id: req.params.id });
        const comment = new Comments({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            postId: post._id,
        });
        comment.save();
        res.send(comment);

    }
    catch {
        res.json({ message: "something Wrong" });
    }

}

module.exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find(res.body);
        if (!posts) {
            return res.json({ message: "Fetching Error OR Post Not found" });
        }
        return res.status(200).json(posts);
    }
    catch{
        res.json({ message: "Something went Wrong" });
    }
}

/**
 * Post Deleted with comment 
 * */

module.exports.deletePost = async (req, res) => {
    try {
        const post = await Posts.findByIdAndRemove(req.params.id);
        if (!post) {
            return res.json({ message: "Post Id not found with this id" });
        }
        const comment = await Comments.remove({ postId: post._id });
        if (!comment) {
            return res.json({ message: "Comment not found with associated Post Id " });
        }
        res.json({ message: "post Deleted" });
    }
    catch{
        res.json({ message: "Something Went Wrong while deleting Post " });
    }
}

