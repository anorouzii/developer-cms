const express = require('express');
const router = express.Router();
const auth = require('../auth');
const Contents =  require('../modals/Contents');
const { check, validationResult } = require('express-validator');
const shortid = require('shortid');


// Get all content
router.get('/',async (request,response)=> {
    try {
        const posts = await Contents.find({draft:false}).sort({date:-1}).select("-_id -__v");
        await response.json(posts);
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server error !');
    }
});
// Get all content
router.get('/admin',auth,async (request,response)=> {
    try {
        const posts = await Contents.find({}).sort({date:-1}).select("-_id -__v");
        await response.json(posts);
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server error !');
    }
});
// Get specific content
router.get('/:id',async (request,response)=> {
    try {
        const posts = await Contents.find({uniqueID:request.params.id,draft:false}).sort({date:-1}).select("-_id -__v");
        await response.json(posts);
    } catch (err) {
        console.error(err.message);
        response.status(500).send('Server error !');
    }
});

// Add new content
router.post('/',[auth,[
    check('title','title is require').not().isEmpty(),
    check('content','content is require').not().isEmpty(),
    check('draft','draft status is require').not().isEmpty(),
    check('clean_data','clean data status is require').not().isEmpty()
]],async (request,response)=> {
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({error:error.array()})
    }
    const {title,content,thumbnail,clean_data,draft,extra_fields} = request.body;
    const uniqueID = shortid.generate();
    try {
        const newPost = new Contents({
            uniqueID,title,content,draft,clean_data,thumbnail,extra_fields
        });
        const post = await newPost.save();
        await response.json(post);
    } catch (err) {
        console.error(err);
        response.status(500).send('Server error !')
    }
});

// Update a content
router.put('/:id',[auth,[
    check('title','title is require').not().isEmpty(),
    check('content','content is require').not().isEmpty()
]],async (request,response)=> {
    const error = validationResult(request);
    if (!error.isEmpty()) {
        return response.status(400).json({error:error.array()})
    }
    const {clean_data,draft,extra_fields,title,content,thumbnail} = request.body;
    const Fields = {};
    if (title) Fields.title = title;
    if (content) Fields.content = content;
    Fields.draft = draft;
    Fields.clean_data = clean_data;
    Fields.extra_fields = extra_fields;
    if (thumbnail) Fields.thumbnail = thumbnail;
    try {
        let post = await Contents.exists({uniqueID: request.params.id});
        if (!post) return response.status(404).json({msg:'Content id is not exist'});
        post = await Contents.findOneAndUpdate({uniqueID: request.params.id},
            {$set:Fields},{new:true});
        await response.json(post);

    } catch (err) {
        console.error(err);
        response.status(500).send('Server error !')
    }
});

// Delete a post
router.delete('/:id',auth,async (request,response)=> {
    try {
        let ex = await Contents.exists({uniqueID: request.params.id});
        if (!ex) return response.status(404).json('Content id is not exist');

        await Contents.findOneAndRemove({uniqueID: request.params.id});
        await response.json('Content removed !');
    } catch (err) {
        console.error(err);
        response.status(500).send('Server error !')
    }
});

module.exports = router;
