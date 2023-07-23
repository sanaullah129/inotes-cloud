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
    const {title, description, tag} = req.body; //Destructuring the request body
    try {
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

//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchUser, async(req, res)=>{
    const {title, description, tag} = req.body;
    try {
    //Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("No notes found")};
    //Checking whether the user owns this note or not
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("You are not authorized to update this note");
    };
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}); //new: true is used to return the updated note, set: newNote is used to set the newNote object to the note, req.params.id is used to find the note to be updated
    res.json({note});
    } catch (error) {
        res.status(500).send("INTERNAL SERVER ERROR");
    }
});

//ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchUser, async(req, res)=>{
    const {title, description, tag} = req.body;
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("No notes found")};
        //Checking whether the user owns this note or not
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("You are not authorized to delete this note");
        }
        note = await Note.findByIdAndDelete(req.params.id); //req.params.id is used to find the note to be deleted
        res.json({"Success": "Note has been deleted"});
    } catch (error) {
        res.status(500).send("INTERNAL SERVER ERROR");
    }    
});

module.exports = router;