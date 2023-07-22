const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

//This should be kept secret, it is used to encrypt the token
const JWT_SECRET = 'sanaullah129'; //put this in .env file

//ROUTE 1: Creating a user (POST): /api/auth/createuser (no authentication required)
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
        res.status(500).send("INTERNAL SERVER ERROR");
    }
 });

 //ROUTE 2: Authenticate a user (POST): /api/auth/login (no authentication required)
 router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], 

async (req, res)=>{
    //Checking for valid parameters
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        //Checking whether the user with this email exists already
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        //Checking whether the password matches
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        //Returning the user data if the credentials are correct
        const data={
            user:{
                id: user.id
            }
        }
        //Creating a token
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({"Token": authToken });
    } catch (error) {
        res.status(500).send("INTERNAL SERVER ERROR");
    }

});

//ROUTE 3: Get loggedin user details (POST): /api/auth/getuser (authentication required)
router.post('/getuser', fetchUser,async (req, res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);    
} catch (error) {
    res.status(500).send("INTERNAL SERVER ERROR");
}
});

module.exports = router;