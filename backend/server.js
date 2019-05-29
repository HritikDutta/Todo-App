const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

// Importing Todo schema
let Todo = require('./models/todo.model');

app.use(cors());
app.use(bodyParser.json());

// Connect to Mongodb Database
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

// Open connection
connection.once('open', () => {
    console.log('Mongodb database established successfully');
});

// To handle /todo routes
const todoRoutes = express.Router();

// Get all todos
todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

// Get specific todo
todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (err) {
            res.send(`No todo with id: ${id}`);
        }
        
        res.json(todo);
    });
});

// Add todo
todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
    .then(todo => {
        res.status(200).json({'todo': 'todo added successfully'});
    })
    .catch(err => {
        res.status(400).send('new todo couldn\'t be added');
    });
});

// Update todo
todoRoutes.route('/update/:id').post((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        if (!todo) {
            res.status(404).send('Todo not found');
        }
        
        // Update properties
        todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;
        
        // Save todo after changes
        todo.save()
        .then(todo => {
            res.json('Todo updated!');
        })
        .catch(err => {
            res.status(400).send('Update not possible');
        });
    });
});

// Use created routes
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});