'use strict';
const { Users, validate } = require('../model/User');
const bcrypt = require('bcrypt');
const Posts = require('../model/Post').Posts;
const Comments = require('../model/Comment').Comments;

/**
 * Verify Users 
 */
module.exports.profileFetch = async (req, res, next) => {

    try {
        const user = req.user;
        const profile = {

            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            city: user.city,
            occupation: user.occupation,
            bio: user.bio
        }
        console.log({ user: profile });
        // res.send({ user: profile })
        res.json({ user: profile });
    }
    catch{
        res.json({ message: "something went wrong during profile fetching" });
    }
}


module.exports.updateProfile = async (req, res) => {

    try {
        const user = req.user;
        // Update author name for post (updateMany(): MongoDB will update all documents that match criteria)
        await Posts.updateMany({ authorId: user._id },
            {
                $set: {
                    author: user.firstName + '' + user.lastName
                }
            });

        await Comments.updateMany({ authorId: user._id },
            {
                $set: {
                    author: user.firstName + '' + user.lastName
                }
            });

        const profile = {

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            occupation: req.body.occupation,
            bio: req.body.bio
        }
        const updateprofiles = await Users.findByIdAndUpdate(req.params._id,
            { $set: profile }, { new: true }
        );
        res.save(updateprofiles);

        updateprofiles = await updateprofiles.toObject();

        delete updateprofiles['_id'];
        delete updateprofiles['password'],
            delete updateprofiles['__v'];

        res.status(200).json({ message: "profile Updated Successfully" });
        res.send({ user: updateprofiles });
    }
    catch{
        res.json({ message: "something went wrong during profile update" });
    }
}