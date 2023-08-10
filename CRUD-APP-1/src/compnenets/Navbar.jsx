import React, { useState } from "react";
import { Link } from 'react-router-dom';
import settingSidebar from "../images/settingSidebar.svg";
import upArrow from "../images/upArrow.svg";
import profileImage from "../images/profileImage.svg";
import globe from "../images/globe.svg";
import keyIcon from "../images/keyIcon.svg";
import logout from "../images/logout.svg";
import profileIcon from "../images/profileIcon.svg";
import axios from 'axios';

import './styles/Navbar.scss'

function Navbar({path , imageUrl, username}){
    username="Alma Lawson";
    imageUrl=profileImage;

    const [showProfile, setShowProfile] = useState(false);

    const handleLogout=()=>{
        axios.get('http://localhost:3001/logout')
        .then(res=>{
            location.reload(true)
        })
        .catch(err => console.log(err));
    }

  return(
    
    <div className='navbar'>
        <div className="path">
            {path}
        </div>
        <div className="navbarProfile">
            <img className="globe" src={globe}/>
            <img className="profileImage" src={imageUrl}/>
            <div className="usernamAdmin" onClick={()=>setShowProfile(!showProfile)}>
                <div className="username">
                    <div className="name">{username}</div>
                    <img className={`arrow ${showProfile ?"uparrow":""}`} src={upArrow}/>
                </div>
                <p className="admin">Admin</p>
            </div>
        </div>
        <div className={`profileModal ${showProfile? "show": "hide"}`}>
            <Link className="items"> 
                <img className="itemImage" src={profileIcon}/>
                <p className="itemPara">Profile</p>
            </Link>
            <Link to="/ChangePasswordPage" className="items"> 
                <img className="itemImage" src={keyIcon}/>
                <p className="itemPara">Change Password</p>
            </Link>
            <Link to="/" className="items" onClick={handleLogout}> 
                <img className="itemImage" src={logout}/>
                <p className="itemPara">Log Out</p>
            </Link>
        </div>
    </div>
  );
}
  
  export default Navbar;