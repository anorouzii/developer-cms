const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
    uniqueID: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    ip: {
        type:String
    },
    date : {
        type:Number,
        default: + new Date()
    },
});
module.exports = mongoose.model('messages',MessageSchema);