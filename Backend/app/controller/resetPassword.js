const moment = require('moment');
const bcrypt = require('bcrypt');
const Users = require('../model/User').Users;
const { sendResetPassEmail } = require('../../helper_functions/sendResetPass');
const { URPTicket } = require('../model/userResetPass');

module.exports.sendResetEmailPass = async (req, res) => {

    try {
        const user = await Users.findOne({ email: req.body.email }).select('firstName email');

        if (!user) {
            res.status(404).json({ message: 'User not Found!' })
            return;
        }

        const randomNum = Math.round(Math.random() * 1000);
        const expirationDate = moment(new Date()).add(2, 'hours');

        const ticket = await URPTicket.create({
            userID: user._id,
            expirationDate: expirationDate,
            pin: randomNum
        });
        const ticketCreated = await ticket.save()
        if (!ticketCreated) {
            return res.status(400).send('Ticket Not Created!');
        }

        try {
            sendResetPassEmail(ticketCreated.pin, user);
            res.json({ _id: ticketCreated._id });

        } catch (ex) {

            throw ex;
        }
    } catch (error) {

        res.status(400).json({ message: error })

    }

}