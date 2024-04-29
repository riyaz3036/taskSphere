import React, { useState, useEffect } from 'react';
import '../styles/edit-task.css';
import { Form, FormGroup } from 'reactstrap';
import { useParams,useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Utils/config.js';
import useFetch from '../hooks/useFetch.js';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: taskData } = useFetch(`${BASE_URL}/task/${id}`);
    
    const [taskDetails, setTaskDetails] = useState({
        user_id: '',
        title: '',
        description: '',
        date: '',
        time: '',
        type: '',
        repeat: false,
        important: false
    });

    useEffect(() => {
        if (taskData) {
            setTaskDetails(taskData);
        }
    }, [taskData]);

    const handleChange = e => {
        const { id, value } = e.target;
        setTaskDetails(prevDetails => ({
            ...prevDetails,
            [id]: id === 'repeat' || id === 'important' ? (value === '1') : value
        }));
    };

    const handleSubmit = async e => {
        
        e.preventDefault();

        try {
            console.log("fffff")
            const res = await fetch(`${BASE_URL}/task/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskDetails)
            });
            
            const result = await res.json();

            if (res.ok) {
                alert("Task edited successfully!");                
            } else {
                alert(result.message);
            }
            navigate('/')
        } catch (err) {
            alert(err.message);
        }
        
    };

    return (
        <div className="edit__main">
            <div className="edit__container">
                <h2 className="text-center">Edit your Task</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="title">Title:</label>
                        <input type="text" placeholder="Add Title" required id="title" value={taskDetails.title} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="date">Date:</label>
                        <input type="date" required id="date" value={taskDetails.date} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="time">Time:</label>
                        <input type="time" required id="time" value={taskDetails.time} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" placeholder="Add Description" value={taskDetails.description} onChange={handleChange}></textarea>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="type">Type:</label>
                        <select id="type" required value={taskDetails.type} onChange={handleChange}>
                            <option value="personal">Personal</option>
                            <option value="professional">Professional</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="repeat">Repeat:</label>
                        <select id="repeat" required value={taskDetails.repeat ? '1' : '0'} onChange={handleChange}>
                            <option value="0">None</option>
                            <option value="1">Daily</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="important">Important:</label>
                        <select id="important" required value={taskDetails.important ? '1' : '0'} onChange={handleChange}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </FormGroup>
                    <button className="edit__" type="submit">Update</button>
                </Form>
            </div>
        </div>
    );
};

export default EditTask;
