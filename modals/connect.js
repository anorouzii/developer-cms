const mongoose = require('mongoose');
const config = require('config');
const connect = config.get('database.content');
const connectDB = async ()=> {
    try {
        mongoose.connect(connect,{ userNewUrlParse:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology: true});
        console.log('Connected to mongodb');
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
};
module.exports = connectDB;
