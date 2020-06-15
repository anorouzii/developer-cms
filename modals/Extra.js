const mongoose = require('mongoose');
const ExtraSchema = mongoose.Schema({
    uniqueID: {
        type:String,
        required:true
    },
    key: {
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('extra-fields',ExtraSchema);
