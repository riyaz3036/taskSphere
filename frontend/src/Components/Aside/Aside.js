import React,{useState,useContext} from 'react';
import './aside.css';
import home from '../../assets/home.png';
import plus from '../../assets/plus.png';
import user_logo from '../../assets/user_logo.png';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import {BASE_URL} from '../../Utils/config.js';
import useFetch from '../../hooks/useFetch.js';
import {AuthContext} from "../../context/AuthContext";



const Aside =()=>{

    const navigate = useNavigate();
    const [toggleProfile,setToggleProfile] = useState(false);

    const { user,dispatch } = useContext(AuthContext);//to get user id
    const { data: userData } = useFetch(user ? `${BASE_URL}/user/${user._id}` : null);//call us api. It has all user data


    //Logout
    const logout =()=>{
     
      dispatch({type:'LOGOUT'})
      navigate('/')
      alert("Successfully Logged out!!")
    }

    return (

    <aside className="menu ">
      
        <div className="home__menu flex justify-center items-center gap-1 py-3">
            <div className="home__menu__img w-6 h-6 relative"><img src={home} /></div>
            <h5><Link className="custom__link" to="/home">Home</Link></h5>
        </div>

        <div onClick={()=>{setToggleProfile(!toggleProfile)}} className="home__menu flex justify-center items-center gap-1 py-3">
            <div className="home__menu__img w-6 h-6 relative"><img src={user_logo} /></div>
            <h5>Profile</h5>
        </div>

       {toggleProfile?
        <>

        {
          user?
          <>
          <div className="user__name">
             <h5>Hi {userData.username}!</h5>
          </div>
          <div className="sec__btn ">
             <button onClick={logout} style={{backgroundColor: 'black'}} className="flex items-center justify-center"><h5>Logout</h5></button>
          </div>
          </>
          :
          <div className="sec__btn ">
             <button onClick={()=>{navigate('/login')}} style={{backgroundColor: '#5F69C7'}} className="flex items-center justify-center"><h5>Login</h5></button>
          </div>
          
        }
  
        </>
        :
        <></>
        }
 
        <div className="add__btn">
           {user ? (
              <button style={{backgroundColor:'#5F69C7'}} onClick={() => { navigate('/add-task') }} className="flex items-center justify-center">
                 <img className="h-3 w-3" src={plus} />
                 <h5>Add Task</h5>
              </button>
            ) : (
              <button  style={{backgroundColor:'black'}} className="flex items-center justify-center" disabled>
                 <img className="h-3 w-3" src={plus} />
                 <h5>Add Task</h5>
              </button>
            )}
        </div>

 
     </aside>

    )
    
};

export default Aside;
