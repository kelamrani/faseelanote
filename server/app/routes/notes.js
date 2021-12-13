import express from "express";
var router = express.Router();
import Note from "../models/note";
require('dotenv').config();
const withAuth = require('../middlewares/auth')

router.post('/', withAuth, async (req, res) => {
    const {title, body} = req.body;

    try {
        let note = new Note({title: title, body: body, author: req.user._id});
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({error: 'Problem to create a new note.'});
    }
})

router.get('/search', withAuth, async (req, res) => {
    const {query} = req.query;

    try {
        let notes = await Note
            .find({author: req.user._id})
            .find({$text: {$search: query}});
        res.json(notes).status(200)
    } catch (error) {
        res.json({error: error}).status(500)
    }
});


router.get('/', withAuth, async (req, res) => {
    try {
        let notes = await Note.find({author: req.user._id, archive: 0})
        res.json(notes)
    } catch (error) {
        res.json({error: error}).status(500);
    }
})
router.get('/trash', withAuth, async (req, res) => {
    try {
        let notes = await Note.find({author: req.user._id, archive: 1});

        res.json(notes)

    } catch (error) {
        res.json({error: error}).status(500);
    }
})

router.get('/shared-with-me', withAuth, async (req, res) => {
    try {
        let notes = await Note.find({sharedwith: req.user._id});

        res.json(notes)

    } catch (error) {
        res.json({error: error}).status(500);
    }
})

router.get('/:id', withAuth, async (req, res) => {
    try {
        const {id} = req.params;
        let note = await Note.findById(id);
        if(isOwner(req.user, note)) {
            res.json(note);
        } else {
            res.status(403).json({error: 'Permission denied.'});
        }
    } catch (error) {
        res.status(500).json({error: 'Problem to get a note.'});
    }
})

router.put('/share-note', withAuth, async (req, res) => {
    console.log("share-note ENDPOINT => ", req.body);


    try {
        let note = await Note.findById(req.body.id)
        if(isOwner(req.user, note)) {
            let note = await Note.findByIdAndUpdate(
            req.body.id,
            {
            $addToSet: { sharedwith: req.body.user._id },
            }
            );
            console.log(note);
            res.json(note);
        } else {
            res.status(403).json({error: 'Permission denied.'});
        }
    } catch (err) {
        console.log(err);
    }
})

router.put('/:id', withAuth, async (req, res) => {
    // const {title, body, archive} = req.body;
    const {title, archive} = req.body;
    const {id} = req.params;

    try {
        let note = await Note.findById(id);
        if(isOwner(req.user, note)) {
            let note = await Note.findOneAndUpdate({_id: id}, {$set: {title: title, archive: archive}}, {upsert: true, 'new': true})
            res.json(note);
        } else {
            res.status(403).json({error: 'Permission denied.'});
        }

    } catch (error) {
        res.status(500).json({error: 'Problem to update a note.'});
    }
})



router.delete('/:id', withAuth, async (req, res) => {
    const {id} = req.params;

    try {
        let note = await Note.findById(id);
        if(isOwner(req.user, note)) {
            await note.delete();
            res.json({message: 'Ok, note deleted'}).status(204)
        } else {
            res.status(403).json({error: 'Permission denied.'});
        }
    } catch (error) {
        res.status(500).json({error: 'Problem to delete a note.'});
    }
})

const isOwner = (user, note) => {
    if(JSON.stringify(user._id) == JSON.stringify(note.author._id)) {
        return true;
    } else {
        return false
    }
}



module.exports = router;
