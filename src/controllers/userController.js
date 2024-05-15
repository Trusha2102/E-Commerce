const { User } = require('../../models');

const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.create({ username, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createUser, getUsers };
