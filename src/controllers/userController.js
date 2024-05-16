const db = require('../../models');
const User = db.User;
const jwt = require('jsonwebtoken');


// Create and Save a new User
exports.create = async (req, res) => {
    try {
        const { username, email, password, name } = req.body;
        const user = await User.create({ username, email, password, name });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occurred while creating the User." });
    }
};

// Retrieve all Users
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message || "Some error occurred while retrieving Users." });
    }
};

// Find a single User by Id
exports.findOne = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `Cannot find User with id=${id}.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Error retrieving User with id=${id}.` });
    }
};

// Update a User by the Id
exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const { username, email, password, name } = req.body;
        const [updated] = await User.update({ username, email, password, name }, { where: { id } });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Error updating User with id=${id}.` });
    }
};

// Delete a User by the Id
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json({ message: "User was deleted successfully!" });
        } else {
            res.status(404).json({ message: `Cannot delete User with id=${id}. Maybe User was not found!` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || `Could not delete User with id=${id}.` });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY);
    res.json({ token });
}