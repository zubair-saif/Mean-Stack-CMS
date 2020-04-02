'use strict';

const { Users } = require('../model/User');
const config = require('../../config/db');
// const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');

/**
 * signin User
 */
module.exports.sigIn = async (req, res) => {

    try {

        const result = Validate(req.body);
        if (result.error) {
            res.status(400).json({ message: result.error.details[0].message });
            return;
        }
        const user = await Users.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            res.json({ message: "email not found" });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(validPassword);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid  password!' });
            return;
        }
        const token = jwt.sign({
            _id: user._id,

        }, config.secret, {
            expiresIn: 604800 // 1 week, 
        });

        res.json({ token: token, userData: user });
    }
    catch (err) {
        res.json({ message: "Something Went Wrong" + err });
    }

}

function Validate(user) {
    const schema = {
        email: Joi.required(),
        password: Joi.required()
    };
    return Joi.validate(user, schema);

}