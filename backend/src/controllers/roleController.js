const Role = require('../models/Role');

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        console.error('Error fetching roles:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        const role = new Role({ name, description });
        await role.save();

        res.status(201).json(role);
    } catch (err) {
        console.error('Error creating role:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
