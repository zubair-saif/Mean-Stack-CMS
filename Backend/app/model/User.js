const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({

    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    occupation: {
        type: String
    },
    bio: {
        type: String
    },

});

function validate(users) {
    const schema = {
        firstName: joi.string().optional(),
        lastName: joi.string().optional(),
        email: joi.string().email().required(),
        phone: joi.number().required(),
        password: joi.string().required(),
        bio: joi.String().optional(),
        city: joi.string().optional(),
        Occupation: joi.string().optional(),
    }
    return joi.validate(users, schema);
}

module.exports.getUserById = async (id, callback) => {
    await Users.findById(id, callback);
};

const Users = mongoose.model('users', schema);
module.exports.validate = validate;
module.exports.Users = Users;
