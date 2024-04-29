import React from 'react';
import './filter-button.css';

const FilterButton =({button_text,active,setActive})=>{


    const toggleSelected=()=>{
        setActive(!active);
    };
 
  
    return (
    <button className="filter_button h-7 font-medium py-1 px-2" style={active ? { backgroundColor: '#DC5B19', color: '#fff', border: '1px solid #DC5B19' } :
     { backgroundColor: '#fff', color: '#767676', border: '1px solid #767676' }} 
    onClick={toggleSelected}>
        {button_text}
    </button>
    )
    
};

export default FilterButton;
