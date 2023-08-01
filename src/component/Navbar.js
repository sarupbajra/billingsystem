import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { Button } from 'react-bootstrap';

export default function Navbar() {
    const [sidebar, setSidebar]= useState(false);
    const showSidebar= () => 
    {
        if(!sidebar)
        {

            setSidebar(true);
        }
        else
        {
            setSidebar(false);
        }
    }
    
  return (
    <>
        <IconContext.Provider value={{ color: '#fff'}}>
        <div className='navbar'>
    <Link to ="#" className='menu-bars'>
    <FaIcons.FaBars onClick={showSidebar} />
    </Link>
    <img src='logo-ghasa.png' alt="Logo" className="logo-image" />
    </div>
    <nav className={sidebar ? 'nav-menu active': 'nav-menu'} style={{zIndex: 1000}}>
    
        <ul className='nav-menu-items' onClick={showSidebar} >
            <li className='navbar-toggle'>
                <Button to="#" className='menu-bars'>
                    <AiIcons.AiOutlineClose/>
                </Button>
            </li>
            {SidebarData.map((item, index) => {
                return(
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                    
                );
                
            })}
        </ul>  
    </nav>
    </IconContext.Provider>
    
    </>
  )
}

