const express = require('express');
const router = express.Router();
const auth = require('../auth');
const shortid = require('shortid');
const Medias =  require('../modals/Medias');
var fs = require('fs');

// upload a new media
router.post('/',auth, async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No media uploaded'
            });
        } else {
            let item = req.files.file;
            item.mv('./medias/' + item.name);
            // add upload file to database
            try {
                const newMedia = new Medias({
                    uniqueID : shortid.generate(),
                    name : item.name,
                    size: item.size,
                    mimeType: item.mimetype,
                    uploadDate: + new Date()
                });
                const media = await newMedia.save();
                await res.json(media);
            } catch (err) {
                console.error(err);
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// get all medias
router.get('/',auth, async (req, res) => {
    try {
        const medias = await Medias.find({}).sort({date:-1}).select("-_id -__v");
        await res.json(medias);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
});

// get specific media
router.get('/:id',auth, async (req, res) => {
    try {
        const media = await Medias.find({ uniqueID: req.params.id }).sort({date:-1}).select("-_id -__v");
        await res.json(media);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
});

// delete specific media
router.delete('/:id',auth, async (req, res) => {
    try {
        const posts = await Medias.findOneAndRemove({ uniqueID: req.params.id });
        fs.unlink('./medias/' + posts.name, (err) => {
            if (err) console.log('file was NOT deleted');
            console.log('file was deleted');
        });
        await res.json({msg:'Media was removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error !');
    }
});

module.exports = router;
