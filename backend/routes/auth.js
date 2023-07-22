const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sanaullah129';

//Creating a user (POST): /api/auth/createuser (no authentication required)
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], 
//Checking for valid parameters
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    //Creating a new user
    try{
        //Checking whether the user with this email exists already
        let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //Creating a new user after validation
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
        })
        //Creating a token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({"Token": authToken });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
 });

module.exports = router;