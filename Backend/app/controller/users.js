'use strict';
const { Users, validate } = require('../model/User');
const bcrypt = require('bcrypt');

/**
 * Signup For Users
 */

module.exports.signUp = async (req, res, next) => {

    try {
        const form = req.body;
        const result = validate(form);

        if (result.error) {
            res.status(400).json({ message: result.error.details[0].message });
        }

        const checkEmail = await Users.findOne({ email: form.email });

        if (checkEmail) {
            res.json({ message: "Email Already in use please try with other" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const register = await Users.create({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: await bcrypt.hash(form.password, salt),
            phone: form.phone
        });
        register.save();
        res.json({ message: "Register Successfully" });

    }
    catch (err) {
        res.json({ message: "something went wrong " + err });
    }
}

/**
 * Verify Users 
 */
module.exports.VerifyUser = async (req, res, next) => {

    res.json({ user: req.user });
}