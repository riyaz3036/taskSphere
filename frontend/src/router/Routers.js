import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../Pages/Home';
import Login from './../Pages/Login';
import Register from './../Pages/Register';
import EditTask from './../Pages/EditTask';
import AddTask from './../Pages/AddTask';





const Routers = () =>{
return (
    <Routes>

        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/edit-task/:id' element={<EditTask/>} />
        <Route path='/add-task' element={<AddTask/>} />
    
    </Routes>
);
};

export default Routers;