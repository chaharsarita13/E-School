import React, { useEffect, useState } from "react";
import iconUser from "../images/iconUser.svg";
import avatar from "../images/avatar.svg";
import location from "../images/location.svg";
import iconCalendar from "../images/iconCalendar.svg";
import downArrow from "../images/downArrow.svg";
import { Link, useParams } from 'react-router-dom';
import Sidebar  from '../compnenets/Sidebar';
import Navbar  from '../compnenets/Navbar';
import axios from 'axios';
import{useNavigate} from "react-router-dom"
import './styles/AddNewStudent.scss'


function UpdateStudent() {

    

    const {id} = useParams();
    axios.defaults.withCredentials=true;
    const navigate = useNavigate();

    const[auth, setAuth] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:3001/getVerifiedUser')
        .then(res => {
            console.log(res)
            if(res.data === "Success"){
                setAuth(true)
                // navigate("/updateStudent/"+id)
            }else{
                setAuth(false)
                navigate("/authorizationFailed")
            }
        } )
        .catch(err => console.log(err))
    },[])


    const [ values , setvalues] = useState({
        firstName:'',
        lastName:'',
        dob:'',
        classname:'',
        gender:'',
        parents:'',
        address:'',
        details:''
    })

    useEffect(()=>{
        axios.get('http://localhost:3001/getStudents/'+id)

        .then( res => {
            console.log(res)
            console.log(res.data[0].firstName,"xxxxxxxxxx");
            setvalues({
                ...values , 
                firstName:res.data[0].firstName,
                lastName: res.data[0].lastName,
                dob: res.data[0].dob,
                classname:res.data[0].classname,
                gender:res.data[0].gender,
                parents:res.data[0].parents,
                address : res.data[0].address,
                details : res.data[0].details
            })
        })
        .catch(err => console.log(err))
    },[])

    
       


    const handleSubmit =(e)=>{
        e.preventDefault()

        axios.put('http://localhost:3001/students/'+id, values)
        .then(res => {
            console.log(res)
            navigate("/StudentsPage")
        } )
        .catch(err => console.log(err))
        alert("Details updated Successfully")
    }

    return(
        <div className="addNewStudentContainer">
            <div className="leftSide">
                <Sidebar />
            </div>
            <div className="rightSide">
                <div className="navbarSection">
                    <Navbar
                    path="Edit Student Details"
                    />
                </div>

                <form className="addStudent" onSubmit={handleSubmit}>
                    <img className="image" src={avatar}/>
                    <div className="nameSection">
                        <div>
                            <p>First Name</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter First Name"
                                    value={values.firstName}
                                    onChange={e=>{setvalues({...values, firstName : e.target.value})}}
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Last Name"
                                    value={values.lastName}
                                    onChange={e=>{setvalues({...values, lastName : e.target.value})}}
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>

                    </div>
                   
                    <div className="nameSection">
                        <div>
                            <p>ID</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter ID"
                                    value={id}
                                    
                                />
                            </div>
                        </div>
                        <div>
                            <p>Date Of Birth</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Date of Birth"
                                    value={values.dob}
                                    onChange={e=>{setvalues({...values, dob : e.target.value})}}
                                    type="date"
                                />
                                {/* <img className="inputImage" src={iconCalendar} /> */}
                            </div>
                        </div>

                    </div>
                    <div className="nameSection">
                        <div>
                            <p>class</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Class"
                                    value={values.classname}
                                    onChange={e=>{setvalues({...values, classname : e.target.value})}}
                                />
                            </div>
                        </div>
                        <div>
                            <p>Gender</p>
                            <div className="formRow">
                                <select className="formInput " placeholder="Enter Gender"
                                    value={values.gender}
                                    onChange={e=>{setvalues({...values, gender : e.target.value})}}
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
                                <input className="formInput" placeholder="Enter Parent's Name"
                                    value={values.parents}
                                    onChange={e=>{setvalues({...values, parents : e.target.value})}}
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>
                        <div>
                            <p>Address</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Address"
                                    value={values.address}
                                    onChange={e=>{setvalues({...values, address : e.target.value})}}
                                />
                                <img className="inputImage" src={location} />
                            </div>
                        </div>

                    </div>
                    <div className="details">
                        <p>Details</p>
                        <textarea className="detailsInput" placeholder="Enter details here..."
                            value={values.details}
                            onChange={e=>{setvalues({...values, details : e.target.value})}}
                        />
                    </div>
                    <div className="buttonContainer">
                        <button  className="button">Update</button>
                    </div>
                </form>

            </div>
            
        </div>
        
        
    );
  };
export default UpdateStudent;


