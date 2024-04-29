import React,{useState} from 'react';
import './task-card.css';
import {Link,useNavigate,useLocation} from 'react-router-dom'
import calender from '../assets/calender.png';
import edit from '../assets/edit.png';
import arrows from '../assets/arrows.png';
import bin from '../assets/bin.png';
import one from '../assets/one.png';
import star from '../assets/star.png';
import {BASE_URL} from '../Utils/config.js';


const TaskCard =({task,isCompleted})=>{
   
    const navigate = useNavigate(); 
    const [deletePopup, setDeletePopup] = useState(false);

    const toggleDelete = () => {
        setDeletePopup(!deletePopup);
    };

    const deleteTask = async () =>{


        try {
            // Sending DELETE request to API endpoint
            const response = await fetch(`${BASE_URL}/task/${task._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            
            if (response.ok) {
                alert("Task Deleted Successfully")
            } else {
                alert('Failed to delete task');
            }
        } catch (error) {
            alert('Error deleting task:', error);
        }

         navigate('/');
    }



  
return (

<div className="task__card p-2 rounded-xl grid gap-y-3 grid-cols-1">

{/* top section of card starts here */}
<div className="task__card__top flex justify-between items-center">

    <div className="card__top__left flex items-center gap-1">

       
        {
            (!task.repeat && isCompleted) ? // Check if task's date is less than today's date or if the date is today and time is less than or equal to current time
            <div className="tag__a" style={{ backgroundColor: '#F7F7F7' }}>
                <h5 style={{ color: '#00A441' }}>Completed</h5>
            </div>
            :
            <div className="tag__a" style={{ backgroundColor: '#F7F7F7' }}>
                <h5 style={{ color: '#CC2610' }}>Upcoming</h5>
            </div> 
            
       }
       
       {
         (task.repeat) ?
         <div className="tag__b"><div className="tag__b__img"><img src={arrows} alt="Arrows Icon" /></div></div>
        :
        <div className="tag__b"><div className="tag__b__img"><img src={one} alt="One Icon" /></div></div>
       }

    
    </div>
 
    
    <div className="card__top__right flex justify-center items-center h-5 w-10 py-0.5 px-2">
               
        {
           (task.important) ?
           <img src={star}/>
           :
           <></>
        }

    </div>

    

</div>



{/* Title and type of task (personall/ professional) */}
<div className="task__card__title flex justify-between items-center">

    <h4 className="m-0 font-semibold">{task.title}</h4>

    {
      task.type==="personal"?
      <div className="tag__a" style={{ backgroundColor: '#F7F7F7' }}>
            <h5 style={{ color: '#DC5B19' }}>Personal Task</h5>
      </div>
      :
      <div className="tag__a" style={{ backgroundColor: '#F7F7F7' }}>
            <h5 style={{ color: '#5F69C7' }}>Professional Task</h5>
      </div>
    }

</div>


{/* date and time section */}
<div className="task__card__date flex justify-between items-center">
    <div className="date__ flex items-center">
        <div className="date__img w-4 h-4 relative"><img src={calender} /></div>
        
        <p>{task.repeat ? "Daily" : task.date}</p>
    </div>

    <p className="time__ m-0 font-medium">{task.time}</p>
</div>



{/* Description */}
{
(task.description)?
<div className="desc">
<p>{task.description}</p>     
</div>
:
<></>
} 


{/* Edit Task section */}
<button onClick={() => navigate(`/edit-task/${task._id}`)} className="edit_task flex justify-center items-center gap-2 py-2 px-3">
    <div className="edit__img w-5 h-5 relative"><img src={edit} /></div>
    <h5>Edit Task</h5>
</button>



{/* Delete Task section */}


{deletePopup?
<div className="delete__main">
    <h5>Are you sure you want to delete the task?</h5>
    <div className="yes__no">
        <div>
        <button onClick={deleteTask} style={{backgroundColor: '#CC2610', color: '#fff'}}>Yes</button>
        <button onClick={toggleDelete}>No</button>
        </div>
    </div>
</div>
:
<button onClick={toggleDelete} className="delete_task flex justify-center items-center gap-2 py-2 px-3">
    <div className="delete__img w-5 h-5 relative"><img src={bin} /></div>
    <h5>Delete Task</h5>
</button>
}
    
</div>

)
};

export default TaskCard;