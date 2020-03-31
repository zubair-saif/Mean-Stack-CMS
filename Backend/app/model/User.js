const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type: String
    },
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
    }

});

function validate(users) {
    const schema = {
        firstName: joi.string().optional(),
        lastName: joi.string().optional(),
        email: joi.string().email().required(),
        phone: joi.number().required(),
        password: joi.string().required(),
    }
    return joi.validate(users, schema);
}

module.exports.getUserById = async (id, callback) => {
    await Users.findById(id, callback);
};

const Users = mongoose.model('users', schema);
module.exports.validate = validate;
module.exports.Users = Users;
