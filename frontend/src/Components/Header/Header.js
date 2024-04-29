import React,{useState} from 'react';
import { NavLink, Link,useNavigate } from 'react-router-dom';
import './Header.css';
import notification from '../../assets/notification.png';
import notification_b from '../../assets/notification_b.png';
import search from '../../assets/search.png';
import cross from '../../assets/cross.png';
import FilterButton from "../Buttons/FilterButton.js"






const Header = ()=>{

  
return (
    <>
    {/* Header for mobile */}
    <header className="header__mob justify-between">
       
       <h5 className="m-0 font-semibold">taskSphere</h5>

       <div className="header__mob__right flex items-center gap-4">
        <div className="search relative w-6 h-6"><img className="absolute" src={search} /></div>
        <div className="notification_b relative w-6 h-6"><img className="absolute" src={notification_b} /></div>
        </div>
       
    </header>

    {/* Header for desktop */}
    <header className="header__desk flex justify-between items-center h-26 mb-8 py-6 px-8" >

     
        <h1 className="header__title font-semibold m-0">taskSphere</h1>
   

    <div className="header__right flex justify-between items-center h-12">
        <div className="bell relative w-12 h-12 pt-1 pl-2 cursor-pointer">
            <img className="bell__img absolute" src={notification} />
            <div className="dot__ w-2 h-2 rounded absolute"></div>
        </div>       
    </div>

    

    </header>

    </>   
  
)
};


export default Header;