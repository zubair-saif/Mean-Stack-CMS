const Joi = require('joi');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    expirationDate: {
        type: Date,
        required: true
    },
    pin: {
        type: Number,
        required: true
    }

});

const URPTicket = mongoose.model('user-reset-pass-ticket', schema);
module.exports.URPTicket = URPTicket;
