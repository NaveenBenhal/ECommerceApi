const express = require('express');
const router = express.Router();
const credentialList = require('../Models/AuthModal');

console.log('AUTH API WOEKED!!!...');


// Create User Route    
router.post('/Create', async (req, res) => {
    try {

        console.log('req.body->', req.body);

        if (!req.body.name || !req.body.contact || !req.body.email || !req.body.password) {
            console.log('MISSING');
            return res.status(400).json({ message: "Missing required fields", Status: 400 });
        }
        else {
            let EmailExist = await credentialList.findOne({ email: req.body.email });
            let NumberExist = await credentialList.findOne({ contact: req.body.contact });

            if (EmailExist) {
                return res.status(400).json({ message: "Email already exists", Status: 400 });
            }
            if (NumberExist) {
                return res.status(400).json({ message: "Contact already exists", Status: 400 });
            }

            const newUser = await credentialList.create({
                name: req.body.name,
                contact: req.body.contact,
                age: req.body.age,
                email: req.body.email,
                password: req.body.password, // Save hashed password
            });

            // const savedUser = await newUser.save();
            console.log('Create User RESPONSE-->', newUser);

            if (newUser) {
                return res.status(200).json({ message: "User created successfully", Status: 200 });
            }

        }

    } catch (error) {
        console.log('error', error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
});


// Login 
router.post('/login', async (req, res) => {
    try {
        const user = await credentialList.findOne({ contact: req.body.contact });
        console.log('user', user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({Status:200, message: "User found successfully",
            loginData : user
        })
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message })
    }
})

module.exports = router;
