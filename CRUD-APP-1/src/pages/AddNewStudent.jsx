
import React, { useState, useEffect, Fragment } from "react";
import iconUser from "../images/iconUser.svg";
import avatar from "../images/avatar.svg";
import location from "../images/location.svg";
import iconCalendar from "../images/iconCalendar.svg";
import downArrow from "../images/downArrow.svg";
import { Link } from 'react-router-dom';
import Sidebar  from '../compnenets/Sidebar';
import Navbar  from '../compnenets/Navbar';
import axios from 'axios';
import{useNavigate} from "react-router-dom";
// import Auth  from '../compnenets/Auth';
import './styles/AddNewStudent.scss'


function AddNewStudent() {

    axios.defaults.withCredentials=true;
    const navigate = useNavigate();

    const[auth, setAuth] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:3001/getVerifiedUser')
        .then(res => {
            // console.log(res)
            if(res.data === "Success"){
                setAuth(true)
                navigate("/AddNewStudent")
            }else{
                setAuth(false)
                navigate("/authorizationFailed")
            }
        } )
        .catch(err => console.log(err))
    },[])


    
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [id, setId] = useState();
    const [dob, setDob] = useState();
    const [classname, setClassname] = useState();
    const [gender, setGender] = useState();
    const [parents, setParents] = useState();
    const [address, setAddress] = useState();
    const [details, setDetails] = useState();

   

    const handleSubmit =(e)=>{

        e.preventDefault()

        axios.post('http://localhost:3001/students', {
            firstName, lastName, id, dob, classname, gender, parents, address, details, customFields
        })
        .then(res => {
            // console.log(res)
            alert("Student added Successfully")
            navigate("/StudentsPage")
        } )
        .catch(err =>{
            
            console.log(err)
            alert("Failed : Fill details according to the requirement")
            
        })

    }


   
    const [customData , setCustomData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/getSettings')
        .then(res => {
            // console.log(res.data, "1111111111");

            setCustomData(res.data)            
        })
        .catch(err => console.log(err))
    },[])

   

    // console.log(customData, "vvvvvvvvvv");


    const organizeData  = (data )=> {
        const groupedData = {};
      
        data.forEach(item => {
          const { group, section, label } = item;
      
          if (!groupedData[group]) {
            groupedData[group] = {};
          }
      
          if (!groupedData[group][section]) {
            groupedData[group][section] = [];
          }
      
          if (!groupedData[group][section].includes(label)) {
            groupedData[group][section].push(label);
          }
        });
      
        return groupedData;
    }


    const [groupedData, setGroupedData] = useState({});
    const [customFields, setcustomFields] = useState({});
    const handleInputChange = (group, section, label, newValue) => {
        setcustomFields(prevcustomFields => ({
          ...prevcustomFields,
          [group]: {
            ...prevcustomFields[group],
            [section]: {
              ...prevcustomFields[group]?.[section],
              [label]: newValue
            }
          }
        }));
    };
    const testButtonFunction=()=>{
        console.log(customFields,'ssss')
    }


    useEffect(() => {
        const newData = organizeData(customData);
        setGroupedData(newData);
    }, [organizeData]);


    return(
        <div className="addNewStudentContainer">
            <div className="leftSide">
                <Sidebar />
            </div>
            <div className="rightSide">
                <div className="navbarSection">
                    <Navbar
                    path="Add New Student"
                    />
                </div>

                <form className="addStudent" onSubmit={handleSubmit}>
                    <img className="image" src={avatar}/>
                    <div className="nameSection">
                        <div>
                            <p>First Name</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter First Name"
                                    onChange={(e)=>{setFirstName(e.target.value)}}
                                    required
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Last Name"
                                    onChange={(e)=>{setLastName(e.target.value)}}
                                    required
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>

                    </div>
                   
                    <div className="nameSection">
                        <div>
                            <p>ID</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter ID (numeric value)"
                                    onChange={(e)=>{setId(e.target.value)}}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <p>Date Of Birth</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter DOB"
                                    onChange={(e)=>{setDob(e.target.value)}}
                                    required
                                    type="date"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="nameSection">
                        <div>
                            <p>class</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Class (numeric value)"
                                    onChange={(e)=>{setClassname(e.target.value)}}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <p>Gender</p>
                            <div className="formRow">
                                <select className="formInput " 
                                    
                                    onChange={(e)=>{setGender(e.target.value)}}
                                    required
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                                {/* <img className="inputImage" src={downArrow} /> */}
                            </div>
                        </div>

                    </div>
                    <div className="nameSection">
                        <div>
                            <p>Parent's Name</p>
                            <div className="formRow">
                                <input className="formInput" 
                                    onChange={(e)=>{setParents(e.target.value)}}
                                    required
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>
                        <div>
                            <p>Address</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Address"
                                    onChange={(e)=>{setAddress(e.target.value)}}
                                    required
                                />
                                <img className="inputImage" src={location} />
                            </div>
                        </div>

                    </div>
                    <div className="details">
                        <p>Details</p>
                        <textarea className="detailsInput" placeholder="Enter details here..."
                            onChange={(e)=>{setDetails(e.target.value)}}
                            required
                        />
                    </div>

                    <div >
                        {Object.entries(groupedData).map(([group, sections]) => (
                            <div className="group" key={group}>
                                <span className="groupHeading">{group}</span>
                                {Object.entries(sections).map(([section, labels]) => (
                                    <div className="section" key={section}>
                                        <span className="sectionHeading">{section}</span>
                                        {labels.map(label =>(
                                            <div className="label" key = {label}>
                                                <span className="labelHeading" >{label}</span>
                                                <input className="labelInput" placeholder="date" 
                                                    value={customFields?.[group]?.[section]?.[label] || ''}
                                                    onChange={(e) => handleInputChange(group, section, label, e.target.value)}
                                                />
                                            </div >
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    
                    <div className="buttonContainer">
                        <button  className="button" onClick={testButtonFunction}>Add New Student</button>
                    </div>
                </form>

            </div>
            
        </div>
        
        
    );
  };
export default AddNewStudent;








