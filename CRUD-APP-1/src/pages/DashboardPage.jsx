import React, { Fragment, useEffect, useState } from "react";
import bullet from "../images/bullet.svg";
import leftArrow from "../images/leftArrow.svg";
import { Link } from 'react-router-dom';
import Sidebar  from '../compnenets/Sidebar';
import Navbar  from '../compnenets/Navbar';
import axios from "axios";
import{useNavigate} from "react-router-dom";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'

import './styles/Dashboard.scss'


function Dashboard() {

    const navigate = useNavigate();
    axios.defaults.withCredentials=true;

    const[auth, setAuth] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:3001/getVerifiedUser')
        .then(res => {
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


    let 
    female1 =0 , male1 = 0,
    female2 =0 , male2 = 0,
    female3 =0 , male3 = 0,
    female4 =0 , male4 = 0,
    female5 =0 , male5 = 0,
    female6 =0 , male6 = 0,
    female7 =0 , male7 = 0,
    female8 =0 , male8 = 0,
    female9 =0 , male9 = 0,
    female10 =0 , male10 = 0,
    female11 =0 , male11= 0,
    female12 =0 , male12 = 0;


    data.map(item =>{
        if(item.gender == "male" && item.classname == "1"){
            male1++;
        }
        else if(item.gender == "female" && item.classname == "1"){
            female1++;
        }

        else if(item.gender == "male" && item.classname == "2"){
            male2++;
        }
        else if(item.gender == "female" && item.classname == "2"){
            female2++;
        }

        else if(item.gender == "male" && item.classname == "3"){
            male3++;
        }
        else if(item.gender == "female" && item.classname == "3"){
            female3++;
        }

        else if(item.gender == "male" && item.classname == "4"){
            male4++;
        }
        else if(item.gender == "female" && item.classname == "4"){
            female4++;
        }

        else if(item.gender == "male" && item.classname == "5"){
            male5++;
        }
        else if(item.gender == "female" && item.classname == "5"){
            female5++;
        }

        else if(item.gender == "male" && item.classname == "6"){
            male6++;
        }
        else if(item.gender == "female" && item.classname == "6"){
            female6++;
        }

        else if(item.gender == "male" && item.classname == "7"){
            male7++;
        }
        else if(item.gender == "female" && item.classname == "7"){
            female7++;
        }

        else if(item.gender == "male" && item.classname == "8"){
            male8++;
        }
        else if(item.gender == "female" && item.classname == "8"){
            female8++;
        }

        else if(item.gender == "male" && item.classname == "9"){
            male9++;
        }
        else if(item.gender == "female" && item.classname == "9"){
            female9++;
        }

        else if(item.gender == "male" && item.classname == "10"){
            male10++;
        }
        else if(item.gender == "female" && item.classname == "10"){
            female10++;
        }
        else if(item.gender == "male" && item.classname == "11"){
            male11++;
        }
        else if(item.gender == "female" && item.classname == "11"){
            female11++;
        }
        else if(item.gender == "male" && item.classname == "12"){
            male12++;
        }
        else if(item.gender == "female" && item.classname == "12"){
            female12++;
        }

        
    })

    // console.log(male1, female1 , "11111111");
    // console.log(male2, female2 , "222222");
    // console.log(male3, female3 , "3333");
    // console.log(male4, female4 , "44444444");

    
    const graphData = {
         labels : ["class 1", "class 2",  "class 3", "class 4","class 5", "class 6",  "class 7", "class 8","class 9", "class 10",  "class 11", "class 12"],
        datasets :[
            {
                label:"Male",
                backgroundColor : "#90A1FD",
                borderWidth : 1  ,
                data :[male1,male2,male3,male4 , male5 , male6, male7 , male8,male9 , male10 , male10 , male11 , male12]
            },
            {
                label:"Female",
                backgroundColor : "#FEE0E8",
                borderWidth : 1  ,
                data :[female1,female2,female3, female4 , female5 ,female6, female7, female8, female9, female10, female11, female12]
            },
        ]
        
    }

    return(
        <div className="ChangePasswordContainer">
            <div className="leftSide">
                <Sidebar />
            </div>
            <div className="rightSide">
                <div className="navbarSection">
                    <Navbar
                    path="Students's Capacity  "
                    />
                </div>
                <div>
                    <Bar data={graphData} />
                </div>
            </div>    
        </div>       
        
    );
  };
export default Dashboard;
