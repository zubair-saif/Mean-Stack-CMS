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
            preview: form.preview,
            like: form.like,
            imageLink: form.imageLink,
            imagesContent: form.imagesContent,
            tag: form.tag.split(','),
            authorId: user._id,
            author: user.firstName + '' + user.lastName
        });
        posts.save();

        return res.json({ message: "Successfully Created" });
    }
    catch (err) {
        res.json({ message: "something went wrong" + err });
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
 * update Post
 * Check if current post can be updated or deleted by the authenticated user: 
 * The author can only make change to his/her own posts
 */


module.exports.updatePost = async (req, res) => {

    try {

        const result = validate(req.body);
        if (result.error) {
            res.status(400).json({ message: result.error.details[0].message });
        }

        const postData = {
            title: form.title,
            content: form.content,
            readTime: form.readTime,
            preview: form.preview,
            imageLink: form.imageLink,
            imagesContent: form.imagesContent,
            tag: form.tag,
            lastModified: new Date(),
        }

        const updatePosts = await Posts.findByIdAndUpdate(req.params._id,
            { $set: postData }, { new: true }
        );

        if (!user._id.equals(updatePosts.authorId)) {
            res.send({ allowChange: false });
            res.save(updatePosts);
        }
        res.send({ allowChange: true });
        return res.json({ message: "Post Updated successfully !" });
    }
    catch{

    }
}

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
 * fetch post by user Id
 */

module.exports.fetchPostbyUserId = async (req, res) => {

    try {
        const user = req.user;

        const posts = await Posts.find({ authorId: user._id })
            .select({})
            .limit(100)
            .sort({ createdAt: -1 }).exec();
        if (!posts) {
            res.status(422).json({ message: "Could not retrieve posts." });
        }
        res.json(posts);
    }
    catch{
        res.json({ message: "something went wrong during  " });
    }


}

module.exports.getLatestPost = async (req, res) => {

}

/**
 * Post Deleted with comment 
*/

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