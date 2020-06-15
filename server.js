const express = require('express');
const app = express();
const connectDB = require('./modals/connect');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

// Connect to database
connectDB();
// Authentication middleware
app.use(express.json({extended: false}));
// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 104857600 //100MB max file(s) size
    },
}));
//add other middleware for file upload
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// Routes
app.use('/api/check-access', require('./routes/check-access'));
app.use('/api/contents', require('./routes/contents'));
app.use('/api/extra-fields', require('./routes/extra-fields'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/medias', require('./routes/medias'));

// make uploads available
app.use(express.static('medias'));

// Serve static assets
app.use(express.static('admin/build'));
app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'admin', 'build', 'index.html'))
);
app.get('*', function(req, res){
    res.redirect('/')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runs on port : ${PORT}`));
