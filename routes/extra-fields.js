const express = require('express');
const router = express.Router();
const auth = require('../auth');
const ExtraFields =  require('../modals/Extra');
const { check, validationResult } = require('express-validator');
const shortid = require('shortid');

// Get all extra fields
router.get('/',async (request,response)=> {
    try {
        const extraFields = await ExtraFields.find({}).sort({date:-1}).select("-_id -__v");
        await response.json(extraFields);
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server error !');
    }
});

// Get specific extra field
router.get('/:key',async (request,response)=> {
    try {
        const extraField = await ExtraFields.find({key:request.params.key}).sort({date:-1}).select("-_id -__v");
        await response.json(extraField);
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server error !');
    }
});

// Add/Update extra fields
router.post('/',[auth,[
    check('inputFields','inputFields array is required.').isArray(),
]],async (request,response)=> {
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({error:error.array()})
    }
    try {
        const {inputFields} = request.body;
        if (inputFields.length > 0 ) {
            inputFields.map(async item => {
                const uniqueID = item.uniqueID;
                const key = item.key;
                const value = item.value;
                if (uniqueID) {
                    const newExtraField =  {uniqueID,key,value};
                    await ExtraFields.findOneAndUpdate({uniqueID: uniqueID},
                        {$set:newExtraField},{new: true});
                } else {
                    const uniqueID = shortid.generate();
                    const newExtraField = new ExtraFields({
                        uniqueID,key,value
                    });
                    await newExtraField.save();
                }
            });
            await response.json('Extra fields saved.');
        }
    } catch (err) {
        console.error(err);
        response.status(500).send('Server error !')
    }
});

// Delete extra field
router.delete('/:id',auth,async (request,response)=> {
    try {
        const ex = await ExtraFields.exists({uniqueID: request.params.id});
        if (!ex) return response.status(404).json('Extra field is not exist');
        await ExtraFields.findOneAndRemove({uniqueID: request.params.id});
        await response.json('Extra field removed !');
    } catch (err) {
        console.error(err);
        response.status(500).send('Server error !')
    }
});
module.exports = router;
