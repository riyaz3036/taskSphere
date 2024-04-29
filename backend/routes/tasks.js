const express= require('express');
const Task = require('../models/Task.js');
const {createTask,singleTask,allTask,updateTask,deleteTask} = require( "../controllers/TaskController.js");

const router = express.Router()

//to create a new task
router.post('/', createTask);

//to get single task
router.get('/:id', singleTask);

//to get all tasks
router.get('/', allTask);

//to update task
router.put('/:id', updateTask);

//to update task
router.delete('/:id', deleteTask);



module.exports = router;

