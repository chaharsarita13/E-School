import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import settingSidebar from "../images/settingSidebar.svg";
import upArrow from "../images/upArrow.svg";
import profileImage from "../images/profileImage.svg";
import globe from "../images/globe.svg";
import keyIcon from "../images/keyIcon.svg";
import logoutImage from "../images/logout.svg";
import profileIcon from "../images/profileIcon.svg";
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectUser} from '../redux/userSlice'
import{useNavigate} from "react-router-dom";
import './styles/Navbar.scss'

function Navbar({path , imageUrl, username}){

    const navigate = useNavigate();

    const user = useSelector(selectUser)
    const [profile, setProfile] = useState({});
    // username="Alma Lawson";
    username= profile.username;
    imageUrl=profileImage;
    const dispatch = useDispatch();

    const [showProfile, setShowProfile] = useState(false);

    const handleLogout=(e)=>{
        e.preventDefault()
        axios.get('http://localhost:3001/logout')
        .then(res=>{
            // location.reload(true)
            navigate("/")

        })
        .catch(err => console.log(err));


        // dispatch(logout());


    }

    
    // const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3001/getProfile' , {
            withCredentials: true,
          })
          .then(response => setProfile(response.data))
          .catch(error => console.error(error));
      }, []);

      



    // useEffect(() => {
    //     axios.get('http://localhost:3001/getProfile')
    //       .then(response => setUser(response.data))
    //       .catch(error => console.error(error));
    //   }, []);

    // console.log(profile,"abc");

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
            <Link className="items" to="/Profile"> 
                <img className="itemImage" src={profileIcon}/>
                <p className="itemPara">Profile</p>
            </Link>
            <Link to="/ChangePasswordPage" className="items"> 
                <img className="itemImage" src={keyIcon}/>
                <p className="itemPara">Change Password</p>
            </Link>
            <Link to="/" className="items" onClick={handleLogout}> 
                <img className="itemImage" src={logoutImage}/>
                <p className="itemPara">Log Out</p>
            </Link>
        </div>
    </div>
  );
}
  
  export default Navbar;