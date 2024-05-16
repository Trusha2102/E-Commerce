const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');
const path = require('path')
require('dotenv').config();

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the E-Commerce Platform" });
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.use('/api', routes);

// Sync database
// sequelize.sync()
//     .then(() => {
//         console.log('Database synced');
//     })
//     .catch((err) => {
//         console.error('Unable to sync database:', err);
//     });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
