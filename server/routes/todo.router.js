let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
    taskName: {type: String},
    taskType: {type: String, default: "Domestic"},
    taskDone: {type: Boolean, default: false}
});

let Todo = mongoose.model('todo', todoSchema);

// GET
router.get('/', (req, res) => {
    console.log('GET received by todo router');
    let searchCriteria = {}; // {} is everything (no search critera)

    Todo.find(searchCriteria, (err, foundTodo) => {
        if (err) {
            console.log('mongodb error from Todo.find in todo router', err);
            res.sendStatus(500);
        } else {
            res.send(foundTodo);
        }
    });
});

// POST
router.post('/', (req, res) => {
    console.log('POST /todo', req.body);
    let todoObject = req.body;
    let todoToAdd = new Todo(todoObject);

    todoToAdd.save((err, savedTodo) => {
        if (err) {
            console.log('mongodb error', err);
            res.sendStatus(500);
        } else {
            console.log('Saved todo', savedTodo);
            res.sendStatus(201);
        }
    });
});

// GET by id
router.get('/:id', (req, res) => {
    console.log('GET todo by id');
    Todo.findOne({ _id: req.params.id }, (err, foundTodo) => {
        if (err) {
            console.log('mongodb error', err);
            res.sendStatus(500);
        } else {
            res.send(foundTodo);
        }
    });
});

//PUT by id
router.put('/:id', (req, res) => {
    let todoId = req.params.id;
    let updates = req.body;
    Todo.findByIdAndUpdate(todoId, updates, { new: true }, (err, updatedItem) => {
        if (err) {
            console.log('Error updating item', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

//DELETE by id
router.delete('/:id', (req, res) => {
    let todoId = req.params.id;
    Todo.findByIdAndRemove(todoId, (err, itemRemoved) => {
            if (err) {
                console.log('Error deleting item: ', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        })
    })

//Return our router
module.exports = router;