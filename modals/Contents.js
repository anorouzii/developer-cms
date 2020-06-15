const mongoose = require('mongoose');
const ContentsSchema = mongoose.Schema({
    uniqueID: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    content:{
        type:Object || String,
        required:true
    },
    draft:{
        type:Boolean
    },
    clean_data : {
        type:Boolean
    },
    extra_fields : {
        type:Array,
    },
    thumbnail: {
        type:String,
    },
    date : {
        type:Number,
        default: + new Date()
    },
});
module.exports = mongoose.model('contents',ContentsSchema);
