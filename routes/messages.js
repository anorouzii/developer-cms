const express = require('express');
const router = express.Router();
const auth = require('../auth');
const Messages =  require('../modals/Messages');
const { check, validationResult } = require('express-validator');
const shortid = require('shortid');

// Submit message
router.post('/',[
    check('name','Name is require').isLength({ min: 3 }).trim().escape(),
    check('email','Email is require').isEmail().normalizeEmail(),
    check('message','Message is require').escape().trim().not().isEmpty(),
],async (request,response)=> {
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({error:error.array()})
    }
    const {name,email,message} = request.body;
    const uniqueID = shortid.generate();
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    try {
        const newMessage = new Messages({
            uniqueID,name,email,message,ip
        });
        const messages = await newMessage.save();
        await response.send(messages);
    } catch (err) {
        console.error(err);
        response.status(500).send('Server error !')
    }
});

// Get all received messages
router.get('/',auth,async (request,response)=> {
    try {
        const messages = await Messages.find({}).sort({date:-1}).select("-_id -__v");
        await response.json(messages);
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server error !');
    }
});
// Delete Message
router.delete('/:id',auth,async (request,response)=> {
    try {
        let message = await Messages.exists({uniqueID: request.params.id});
        if (!message) return response.status(404).json({msg:'Message id is not exist'});

        await Messages.findOneAndRemove({uniqueID: request.params.id});
        await response.json({msg:'Message removed !'});
    } catch (err) {
        console.error(err);
        response.status(500).send('Server error !')
    }
});

module.exports = router;
