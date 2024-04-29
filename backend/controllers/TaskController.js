const Task = require('../models/Task.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');


//creating a new task (tested)
const createTask = async(req,res)=>{

    const newTask = new Task(req.body)

    try{

        const savedTask = await newTask.save()
        let ObjId = new mongoose.Types.ObjectId(savedTask._id);
        await User.updateOne(
            {
               _id: savedTask.user_id
            },
            {
                $push:{
                    tasks: ObjId
                },
            },
            {
                upsert: false, new:true
            }
        )

        res.status(200).json({success:true, message: 'Succesfully created', data:savedTask});

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to create. please try again!!'});
    }
}




//getSingle  task (Testes)
const singleTask = async (req,res)=>{

    const id= req.params.id;
    console.log("get task")

         try{
            const task = await Task.findById(id);
            res.status(200).json({success:true, message: 'Succesfully shown', data: task});
    
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }  
}


//getAll  tasks (tested)
const allTask = async (req,res)=>{
    
         try{
            const task = await Task.find({});
            res.status(200).json({success:true, message: 'Succesfully shown', data: task});
    
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }  
     
}


//updating a task (tested)
const updateTask = async (req,res)=>{

    const id=req.params.id

    try{
        const updatedTask = await Task.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message: 'Succesfully updated', data:updatedTask});
    }catch(err){
        res.status(500).json({success:false, message: 'Failed to updat please try again!!'});
    }
}

//deleting a task (Tested)
const deleteTask = async (req,res)=>{

    const id= req.params.id;
    try{
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        
        // Remove the task ID from the tasks array in the User schema
        await User.updateOne(
            { tasks: id }, 
            { $pull: { tasks: id } } 
        );
      

        res.status(200).json({success:true, message: 'Succesfully deleted', data:deletedTask})

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to delete please try again!!'});
    }
}




module.exports = {createTask,singleTask,allTask,updateTask,deleteTask};