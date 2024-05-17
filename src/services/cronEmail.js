const cron = require('node-cron');
const db = require('../../models');
const StockInformation = db.StockInformation;
const transporter = require('../config/nodemailer');
const { generateCSV, saveCSV } = require('./csvGenerator');

const cronJob = cron.schedule('* * * * *', async () => {
    try {
        // Fetch all stock information records
        const records = await StockInformation.findAll();

        // Extract dataValues from each record
        const stockInfoArray = records.map(record => record.dataValues);

        // Generate CSV from the array of objects
        const csv = generateCSV(stockInfoArray);
        saveCSV(csv);

        // Define email options
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

        // Send the email with the CSV attachment
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Error sending email:', err);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error fetching stock information:', error);
    }
});

module.exports = cronJob;
