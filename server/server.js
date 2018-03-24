const express = require('express');
const app = express();
//if on Heroku, us port 4001; otherwise, use 5000
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const todoRouter = require('./routes/todo.router');

const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/hadar';

mongoose.connect(databaseUrl);
mongoose.connection.on('connected', () => {
    console.log('mongoose connected pleasingly to mongod');
});

mongoose.connection.on('error', (error) => {
console.log('error connecting to the displeased mongod ', error);
});

app.use('/todo', todoRouter);

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('server listening on port: ', PORT);
});

