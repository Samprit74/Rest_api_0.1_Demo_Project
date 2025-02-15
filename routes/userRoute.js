const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

// POST request to add new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            profession: req.body.profession
        });
        await newUser.save();
        console.log(`user added successfully: ${newUser.name}`);
        res.status(201).send('user added successfully');
    } catch (err) {
        res.status(500).send('error while adding user');
        console.error('Error while adding user:', err);

    }
});

// GET all user details
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// GET user details by ID in URL
router.get('/:id', (req, res) => {
    const userID = req.params.id;
    User.findById(userID)
        .then(user => {
            if (!user) {
                return res.status(404).json('user not found');
            }
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
});

// PATCH request to update user details by ID
router.patch('/:id', async (req, res) => {
    const userId = req.params.id;
    const updateFields = {};  // Empty object to store fields that will be updated

    // Check if specific fields are present in the request body, and if they are, add them to updateFields
    if (req.body.age) {
        updateFields.age = req.body.age;
    }
    if (req.body.name) {
        updateFields.name = req.body.name;
    }
    if (req.body.email) {
        updateFields.email = req.body.email;
    }
    if (req.body.phone_no) {
        updateFields.phone_no = req.body.phone_no;
    }
    if (req.body.profession) {
        updateFields.profession = req.body.profession;
    }

    try {
        // Update user based on the fields specified in updateFields
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).send('Error updating user');
    }
});

// DELETE request to delete user by ID
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
});

module.exports = router;