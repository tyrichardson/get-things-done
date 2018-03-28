//Require express -- find the express code that you need and assign it to a variable "app"
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Set up the port; if on Heroku, us port 4001; otherwise, use 5000
const PORT = process.env.PORT || 5000;

//Require body-parser -- find the body-parser code you need and assign it to a variable "bodyParser"
const bodyParser = require('body-parser');

//Configure body-parser for jQuery, then Angular
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Require -- look in this file for code related to todo
const todoRouter = require('./routes/todo.router');

//Routes
app.use('/todo', todoRouter);

//Mongo code
let mongoURI = '';

if(process.env.MONGODB_URI != undefined) {
    mongoURI = process.env.MONGODB_URI;
} else {
    mongoURI = 'mongodb://localhost:27017/hadar'
}

//Connect to Mongo DB
mongoose.connect(mongoURI, {
    useMongoClient: true
});

mongoose.connection.on('error', function (err) {
    if (err) {
        console.log("MONGO ERROR: ", err);
    }
    res.sendStatus(500);
});

mongoose.connection.on('open', function () {
    console.log("Connected to Mongo!");
});

module.exports = mongoose;


//Point to public folder containing static files
app.use(express.static('server/public'));


//Spin up server
app.listen(PORT, () => {
    console.log('server listening on port: ', PORT);
});

