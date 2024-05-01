import React,{useState, useContext} from 'react';
import '../styles/home.css'
import FilterButton from "../Components/Buttons/FilterButton.js";
import TaskCard from '../shared/TaskCard';
import {BASE_URL} from '../Utils/config.js';
import useFetch from '../hooks/useFetch.js';
import {AuthContext} from "../context/AuthContext";



const Home = ()=>{

    const { user,dispatch } = useContext(AuthContext);//to get user id
    const { data: userData } = useFetch(user ? `${BASE_URL}/user/${user._id}` : null);//call us api. It has all user data

    const [today,setToday]= useState(false);
    const [personal, setPersonal] = useState(false);
    const [professional, setProfessional] = useState(false);
    const [important, setImportant] = useState(false);
    const [completed,setCompleted] = useState(false);
    const [upcoming, setUpcoming] = useState(false);
    

    
return (
    
    
   <main className="my__tasks">    
        
        <div className="tasks__title"><h5>My Tasks</h5></div>
   {
    user?
    <>
        <div className="filters flex items-center gap-2">
        <FilterButton button_text="Today" active={today} setActive={setToday} />
        <FilterButton button_text="Personal" active={personal} setActive={setPersonal} />
        <FilterButton button_text="Professional" active={professional} setActive={setProfessional} />
        <FilterButton button_text="Important" active={important} setActive={setImportant} />
        <FilterButton button_text="Completed" active={completed} setActive={setCompleted} />
        <FilterButton button_text="Upcoming" active={upcoming} setActive={setUpcoming} />
        </div>
      
    <div className="my__tasks__main">

    <div className="section__a flex flex-col gap-6">
            {userData.tasks?.map((task, index) => {
        if(index%3 !==0) return null;        
        // Get current date and time
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        
        // Extract year, month, and day from task's date
        const [taskYear, taskMonth, taskDay] = task.date.split('-').map(Number);

        // Extract hour and minute from task's time
        const [taskHour, taskMinute] = task.time.split(':').map(Number);

        // Check if task is completed
        const isCompleted = (
            new Date(taskYear, taskMonth - 1, taskDay) < new Date(currentYear, currentMonth - 1, currentDay) ||
            (new Date(taskYear, taskMonth - 1, taskDay) === new Date(currentYear, currentMonth - 1, currentDay) && 
            (taskHour < currentHour || (taskHour === currentHour && taskMinute <= currentMinute)))
        );

        const isToday = (new Date(taskYear, taskMonth - 1, taskDay) === new Date(currentYear, currentMonth - 1, currentDay));

        if ( !(personal || professional || today || important || completed || upcoming) || (((today && (isToday || task.repeat)) || (!today)) && ((personal && task.type==="personal") || (!personal)) && ((professional && task.type==="professional") || (!professional)) && ((important && task.important) || (!important)) && ((completed && (isCompleted && !task.repeat)) || (!completed)) && ((upcoming && (!isCompleted || task.repeat)) || (!upcoming)) )) {
            return <div className="task__card__cont"><TaskCard key={task._id} task={task} isCompleted={isCompleted} /></div>;
        } else {
            return null; 
        }

    })}
    </div>


    <div className="section__b flex flex-col gap-6">
            {userData.tasks?.map((task, index) => {
                if(index%3 !==1) return null;
        // Get current date and time
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        
        // Extract year, month, and day from task's date
        const [taskYear, taskMonth, taskDay] = task.date.split('-').map(Number);

        // Extract hour and minute from task's time
        const [taskHour, taskMinute] = task.time.split(':').map(Number);

        // Check if task is completed
        const isCompleted = (
            new Date(taskYear, taskMonth - 1, taskDay) < new Date(currentYear, currentMonth - 1, currentDay) ||
            (new Date(taskYear, taskMonth - 1, taskDay) === new Date(currentYear, currentMonth - 1, currentDay) && 
            (taskHour < currentHour || (taskHour === currentHour && taskMinute <= currentMinute)))
        );

        const isToday = (new Date(taskYear, taskMonth - 1, taskDay) === new Date(currentYear, currentMonth - 1, currentDay));

        if ( !(personal || professional || today || important || completed || upcoming) || (((today && (isToday || task.repeat)) || (!today)) && ((personal && task.type==="personal") || (!personal)) && ((professional && task.type==="professional") || (!professional)) && ((important && task.important) || (!important)) && ((completed && (isCompleted && !task.repeat)) || (!completed)) && ((upcoming && (!isCompleted || task.repeat)) || (!upcoming)) )) {
            return <div className="task__card__cont"><TaskCard key={task._id} task={task} isCompleted={isCompleted} /></div>;
        } else {
            return null; 
        }

    })}
    </div>


    <div className="section__c flex flex-col gap-6">
            {userData.tasks?.map((task, index) => {
                if(index%3 !==2) return null;
        // Get current date and time
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        
        // Extract year, month, and day from task's date
        const [taskYear, taskMonth, taskDay] = task.date.split('-').map(Number);

        // Extract hour and minute from task's time
        const [taskHour, taskMinute] = task.time.split(':').map(Number);

        // Check if task is completed
        const isCompleted = (
            new Date(taskYear, taskMonth - 1, taskDay) < new Date(currentYear, currentMonth - 1, currentDay) ||
            (new Date(taskYear, taskMonth - 1, taskDay) === new Date(currentYear, currentMonth - 1, currentDay) && 
            (taskHour < currentHour || (taskHour === currentHour && taskMinute <= currentMinute)))
        );

        const isToday = (new Date(taskYear, taskMonth - 1, taskDay) === new Date(currentYear, currentMonth - 1, currentDay));

        if ( !(personal || professional || today || important || completed || upcoming) || (((today && (isToday || task.repeat)) || (!today)) && ((personal && task.type==="personal") || (!personal)) && ((professional && task.type==="professional") || (!professional)) && ((important && task.important) || (!important)) && ((completed && (isCompleted && !task.repeat)) || (!completed)) && ((upcoming && (!isCompleted || task.repeat)) || (!upcoming)) )) {
            return <TaskCard key={task._id} task={task} isCompleted={isCompleted} />;
        } else {
            return null; 
        }

    })}
    </div>
            
    
        {userData.tasks && userData.tasks.length === 0 && <div><h5 style={{color:'#6e7074'}}>(No tasks)</h5></div>}
        </div> 
    </>

    :

    <div className="no__login"><h5>(Click on Profile and Login to Start your Journey)</h5></div>
   }
      
   
   </main>
)

};


export default Home;
