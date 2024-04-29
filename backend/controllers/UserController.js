const User = require('../models/User.js');
const Task = require('../models/Task.js');


//creating a new user (done) (tested)
const createUser = async(req,res)=>{

    const newUser = new User(req.body)

    try{

            const savedUser = await newUser.save();
        

        res.status(200).json({success:true, message: 'Succesfully created', data:savedUser});

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to create. please try again!!'});
    }
}


//updating a user (done) (testes)
const updateUser = async (req,res)=>{

    const id=req.params.id

    try{
        const updatedUser = await User.findByIdAndUpdate(id,{
            $set: req.body
        },{new:true})

        res.status(200).json({success:true, message: 'Succesfully updated', data:updatedUser});
    }catch(err){
        res.status(500).json({success:false, message: 'Failed to updat please try again!!'});
    }
}


//deleting a user (done)
const deleteUser = async (req,res)=>{

    const id= req.params.id;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({success:true, message: 'Succesfully deleted', data:deletedUser})

    }catch(err){
        res.status(500).json({success:false, message: 'Failed to delete please try again!!'});
    }
}

//getSingle  user(done) 
const singleUser = async (req,res)=>{

    const id= req.params.id;
    

        //populate with activity and send
        try{

            const user = await User.findById(id).populate({path:'tasks' , model:'Task'});
    
            res.status(200).json({success:true, message: 'Succesfully shown', data: user});
        }catch(err){
            res.status(404).json({success:false, message: 'Failed to show please try again!!'});
        }


        
}

//getAll  users (done) (tested)
const allUsers = async (req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({success:true, message: 'Succesfully shown', data: users});
    }catch(err){
        res.status(404).json({success:false, message: 'Failed to show please try again!!'});
    }
}



module.exports = {createUser,updateUser,deleteUser,singleUser,allUsers};