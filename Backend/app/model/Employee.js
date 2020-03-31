const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    designation: {
        type: String
    },
    phoneNumber: {
        type: Number
    }
});

const Employee = mongoose.model('employee', schema);
function validate(employee) {
    const schema = {
        name: Joi.string().optional(),
        email: Joi.string().email().required(),
        designation: Joi.string().required(),
        phoneNumber: Joi.number()
    };
    return Joi.validate(employee, schema);
}
module.exports.validate = validate;
module.exports.Employee = Employee;
