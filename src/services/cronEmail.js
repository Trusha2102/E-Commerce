const cron = require('node-cron');
const transporter = require('../config/nodemailer');
const { generateCSV, saveCSV } = require('./csvGenerator');

const cronJob = cron.schedule('* * * * *', async () => {
    const records = [];
    const csv = generateCSV(records);
    saveCSV(csv);

    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIEVER_EMAIL,
        subject: 'Stock Information',
        text: 'Please find attached the latest stock information.',
        attachments: [
            {
                filename: 'stock_info.csv',
                path: './stock_info.csv'
            }
        ]
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sending email:', err);
        } else {
            console.log('Email sent:', info.response);
        }
    });
});

module.exports = cronJob;
