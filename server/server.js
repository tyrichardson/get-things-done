//Require express -- find the express code that you need and assign it to a variable "app"
const express = require('express');
const app = express();

//Set up the port; if on Heroku, us port 4001; otherwise, use 5000
const PORT = process.env.PORT || 5000;

//Require body-parser -- find the body-parser code you need and assign it to a variable "bodyParser"
const bodyParser = require('body-parser');

//Require -- look in this file for code related to todo
const todoRouter = require('./routes/todo.router');

//Mongo code
const mongoose = require('mongoose');
const databaseURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/hadar';

//Connect to Mongo DB
mongoose.connect(databaseURL);

mongoose.connection.on('connected', () => {
    console.log('mongoose connected pleasingly to mongod');
});

mongoose.connection.on('error', (error) => {
console.log('error connecting to the displeased mongod ', error);
});

//Configure body-parser for jQuery, then Angular
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Point to public folder containing static files
app.use(express.static('server/public'));

//Routes
app.use('/todo', todoRouter);

//Spin up server
app.listen(PORT, () => {
    console.log('server listening on port: ', PORT);
});

