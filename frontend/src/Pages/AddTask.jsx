import React,{useState,useContext} from 'react';
import '../styles/add-task.css';
import {Form, FormGroup} from 'reactstrap';
import {BASE_URL} from '../Utils/config.js';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import useFetch from '../hooks/useFetch.js';
import {AuthContext} from "../context/AuthContext";




const AddTask = ()=>{
   
    const navigate = useNavigate();
    const { user,dispatch } = useContext(AuthContext);//to get user id


    const [taskDetails, setTaskDetails] = useState ({
        user_id: user._id,
        title: "",
        description:"",
        date: "",
        time:"",
        type:"personal",
        repeat: false,
        important: false
    });

    const handleChange = e => {
        const { id, value } = e.target;
        let newValue = value;
        if (id === 'repeat' || id === 'important') {
            newValue = value === '1';
        }
        setTaskDetails(prevDetails => ({
            ...prevDetails,
            [id]: newValue
        }));
    }

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            const res = await fetch(`${BASE_URL}/task`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskDetails)
            });
            const result = await res.json();
    
            if (res.ok) {
                alert("Task added successfully!");                
            } else {
                alert(result.message);
            }
    
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSubmitting(false); 
        }
        navigate('/');
    }

return (
    <div className="add__main">
            
        <div className="add__container">
                            
                    <h2 className="text-center">Add your Task</h2>

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
                        <select id="repeat" required value={taskDetails.repeat?"1":"0"} onChange={handleChange}>
                            <option value="0">None</option>
                            <option value="1">Daily</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="important">Important:</label>
                        <select id="important" required value={taskDetails.important?"1":"0"} onChange={handleChange}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </FormGroup>
                    <button className="add__" type="submit" disabled={isSubmitting}>Add</button>
                    </Form>

        </div>
                
    </div>
)

};


export default AddTask;
