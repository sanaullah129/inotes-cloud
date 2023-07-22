const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');

//ROUTE 1: Get all the notes using: GET "/api/notes/allnotes". Login required
router.get('/allnotes', fetchUser, async(req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(500).send("INTERNAL SERVER ERROR");
    }
    
});

//ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchUser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 8 characters').isLength({ min: 8 }),
],
async(req, res)=>{
    try {
        const {title, description, tag} = req.body;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    //Creating a new note`
    const note = new Note({
        user: req.user.id,
        title, description, tag
    });
    //Saving the note to the database
    const savedNotes = await note.save();
    res.json(savedNotes);   
    } catch (error) {
        res.status(500).send("INTERNAL SERVER ERROR");
    }
    
});

module.exports = router;