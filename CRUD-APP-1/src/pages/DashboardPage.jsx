import React, { Fragment, useEffect, useState } from "react";
import bullet from "../images/bullet.svg";
import leftArrow from "../images/leftArrow.svg";
import { Link } from 'react-router-dom';
import Sidebar  from '../compnenets/Sidebar';
import Navbar  from '../compnenets/Navbar';
import axios from "axios";
import{useNavigate} from "react-router-dom"

import './styles/Dashboard.scss'


function Dashboard() {

    const navigate = useNavigate();
    axios.defaults.withCredentials=true;

    const[auth, setAuth] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:3001/getVerifiedUser')
        .then(res => {
            console.log(res)
            if(res.data === "Success"){
                setAuth(true)
                navigate("/DashboardPage")
            }else{
                setAuth(false)
                navigate("/authorizationFailed")
            }
        } )
        .catch(err => console.log(err))
    },[])

    const [data, setData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/getStudentsForChart')
        .then(res => {
            // setStudents(res.data);
            // console.log(students)
            setData(res.data);
        })
        .catch(err => console.log(err))
    },[])


    let female=0;
    let male = 0;
    data.map((item, index)=>{
        if(item.gender == "female" && item.classname == "6"){
            female++;    
        }
        else if(item.gender == "male"){
            male++;
        }
        return male , female;
    })    
    console.log(female,"ddddddddddddd");
    console.log(male,"ccccccccccc");

    return(
        <div className="ChangePasswordContainer">
            <div className="leftSide">
                <Sidebar />
            </div>
            <div className="rightSide">
                <div className="navbarSection">
                    <Navbar
                    path="Dashboard"
                    />
                </div>
            </div>    
        </div>       
        
    );
  };
export default Dashboard;
