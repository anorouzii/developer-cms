const mongoose = require('mongoose');
const MediasSchema = mongoose.Schema({
    uniqueID: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    size: {
        type: Number,
        required:true
    },
    mimeType: {
        type: String,
        required:true
    },
    uploadDate : {
        type:Number,
        default: + new Date()
    },
});
module.exports = mongoose.model('medias',MediasSchema);
