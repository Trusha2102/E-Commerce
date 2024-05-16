// config/nodemailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.CONFIG_EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

module.exports = transporter;
