import React, { useState, useEffect } from "react";
import plus from "../images/plus.svg";
import edit from "../images/edit.svg";
import leftArrow from "../images/leftArrow.svg";
import actionIcon from "../images/actionIcon.svg";
import downArrow from "../images/downArrow.svg";
import { Link } from 'react-router-dom';
import Sidebar  from '../compnenets/Sidebar';
import Navbar  from '../compnenets/Navbar';
import axios from 'axios';
import{useNavigate} from "react-router-dom"
import './styles/Settings.scss'



function Settings() {

    const navigate = useNavigate();

    axios.defaults.withCredentials=true;

    const[auth, setAuth] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:3001/getVerifiedUser')
        .then(res => {
            console.log(res)
            if(res.data === "Success"){
                setAuth(true)
                navigate("/SettingsPage")
            }else{
                setAuth(false)
                navigate("/authorizationFailed")
            }
        } )
        .catch(err => console.log(err))
    },[])
    const [group, setGroup] = useState();
    const [section, setSection] = useState();
    const [label, setLabel] = useState();
    const [type, setType] = useState();
    const [settingData, setSettingData] = useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:3001/getSettings')
        .then(settings => setSettingData(settings.data))
        .catch(err => console.log(err))
    },[])

    const handleSubmit =(e)=>{
        e.preventDefault()
        setShowProfile(false)
        window.location.reload();

        axios.post('http://localhost:3001/settings', {
            group, section , label, type
        })
        .then(res => {
            console.log(res)
            navigate("/SettingsPage")
            alert("Custom's fields added Successfully")
        } )
        .catch(err => console.log(err))
        


    }


    const listData = [
        {
            id: "001",
            firstName:"Sarita",
            lastName:"Chahar",
            dob:"10-10-10",
        },
        {
            id: "001",
            firstName:"Sarita",
            lastName:"Chahar",
            dob:"10-10-10",
        },
       
        {
            id: "001",
            firstName:"Sarita",
            lastName:"Chahar",
            dob:"10-10-10",
        },
       ,
        
    ]
    const tableHeader = ["Group", "Section", "Label", "Type","Action"]
    

    const [showProfile, setShowProfile] = useState(false);
    return(
        <div className="settingContainer">
            <div className="leftSide">
                <Sidebar />
            </div>
            <div className="rightSide">
                <div className="navbarSection">
                    <Navbar
                    path="Settings"
                    />
                </div>

                <div className="settings">
                    <div className="topbar">
                        <p className="heading">Student’s Custom Fields</p>
                        <Link  className="addNew" onClick={()=>setShowProfile(true)}>
                            <img className="image " src={plus}/>
                            <p className="para">Add New</p>
                        </Link>
                    
                    </div>
                    <div className="settingList">
                        <table className="tableContainer">
                            <tr className="tableHeader">
                                {tableHeader.map((item) =>{
                                    return(
                                        <th className="header">{item}</th>
                                    )
                                })}
                            </tr>
                            {settingData.map(item=>{
                                return(
                                <tr className="tableHeader">
                                    <td className="listItems">{item.group}</td>
                                    <td className="listItems">{item.section}</td> 
                                    <td className="listItems">{item.label}</td> 
                                    <td className="listItems">{item.type}</td>   
                                    <td className="listItems"><Link><img src={actionIcon}/></Link></td> 
                                </tr>
                                )
                            })}
                        </table>
                    </div>

                    {showProfile && 
                    <div className="customField">
                        <div className="heading">
                            <img className="hadingImage" src={leftArrow} onClick={()=>setShowProfile(false)}/>
                            <p className="headingText">Manage your Security Settings</p>
                        </div>
                        <div className="topHeader">
                            <p className="headerItems">Group</p>
                            <p className="headerItems">Section</p>
                            <p className="headerItems">Label</p>
                            <p className="headerItems">Type</p>

                        </div>
                        
                        <form className="inputField" onSubmit={handleSubmit} >
                            
                            <input className="inputItems"
                                onChange={(e)=>{setGroup(e.target.value)}}
                                required
                            />
                            <input className="inputItems"
                                onChange={(e)=>{setSection(e.target.value)}}
                                required
                            />
                            <input className="inputItems"
                                onChange={(e)=>{setLabel(e.target.value)}}
                                required
                            />
                            <input className="inputItems"
                                onChange={(e)=>{setType(e.target.value)}}
                                required
                            />
                            <button className="saveBtn" >Save</button>
                        </form>
                    </div>
                    }
                    
                </div>

            </div>
            
        </div>
        
        
    );
  };
export default Settings;




