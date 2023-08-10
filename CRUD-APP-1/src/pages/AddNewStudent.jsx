import React, { useState, useEffect } from "react";
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
            console.log(res)
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
            firstName, lastName, id, dob, classname, gender, parents, address, details
        })
        .then(res => {
            console.log(res)
            navigate("/StudentsPage")
        } )
        .catch(err => console.log(err))
        alert("Student added Successfully")

    }

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
                                <input className="formInput" placeholder="Enter ID"
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
                                {/* <img className="inputImage" src={iconCalendar} /> */}
                            </div>
                        </div>

                    </div>
                    <div className="nameSection">
                        <div>
                            <p>class</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Class"
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
                    <div className="buttonContainer">
                        <button  className="button">Add New Student</button>
                    </div>
                </form>

            </div>
            
        </div>
        
        
    );
  };
export default AddNewStudent;


























// import React from "react";
// import iconUser from "../images/iconUser.svg";
// import avatar from "../images/avatar.svg";
// import location from "../images/location.svg";
// import iconCalendar from "../images/iconCalendar.svg";
// import downArrow from "../images/downArrow.svg";
// import { Link } from 'react-router-dom';
// import Sidebar  from '../compnenets/Sidebar';
// import Navbar  from '../compnenets/Navbar';
// import './styles/AddNewStudent.scss'


// function AddNewStudent() {
//     return(
//         <div className="addNewStudentContainer">
//             <div className="leftSide">
//                 <Sidebar />
//             </div>
//             <div className="rightSide">
//                 <div className="navbarSection">
//                     <Navbar
//                     path="Add New Student"
//                     />
//                 </div>

//                 <form className="addStudent">
//                     <img className="image" src={avatar}/>
//                     <div className="nameSection">
//                         <div>
//                             <p>First Name</p>
//                             <div className="formRow">
//                                 <input className="formInput" placeholder="Enter First Name"/>
//                                 <img className="inputImage" src={iconUser} />
//                             </div>
//                         </div>
//                         <div>
//                             <p>Last Name</p>
//                             <div className="formRow">
//                                 <input className="formInput" placeholder="Enter Last Name"/>
//                                 <img className="inputImage" src={iconUser} />
//                             </div>
//                         </div>

//                     </div>
                   
//                     <div className="nameSection">
//                         <div>
//                             <p>ID</p>
//                             <div className="formRow">
//                                 <input className="formInput" placeholder="Enter Full Name"/>
//                             </div>
//                         </div>
//                         <div>
//                             <p>Date Of Birth</p>
//                             <div className="formRow">
//                                 <input className="formInput" placeholder="Enter Full Name"/>
//                                 <img className="inputImage" src={iconCalendar} />
//                             </div>
//                         </div>

//                     </div>
//                     <div className="nameSection">
//                         <div>
//                             <p>class</p>
//                             <div className="formRow">
//                                 <input className="formInput" placeholder="Enter Full Name"/>
//                             </div>
//                         </div>
//                         <div>
//                             <p>Gender</p>
//                             <div className="formRow">
//                                 <select className="formInput " placeholder="Enter Full Name">
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                 </select>

//                                 <img className="inputImage" src={downArrow} />
//                             </div>
//                         </div>

//                     </div>
//                     <div className="nameSection">
//                         <div>
//                             <p>Parent's Name</p>
//                             <div className="formRow">
//                                 <input className="formInput" placeholder="Enter Full Name"/>
//                                 <img className="inputImage" src={iconUser} />
//                             </div>
//                         </div>
//                         <div>
//                             <p>Address</p>
//                             <div className="formRow">
//                                 <input className="formInput" placeholder="Enter Last Name"/>
//                                 <img className="inputImage" src={location} />
//                             </div>
//                         </div>

//                     </div>
//                     <div className="details">
//                         <p>Details</p>
//                         <textarea className="detailsInput" placeholder="Enter details here..."/>
//                     </div>
//                     <div className="buttonContainer">
//                     <Link to="/" className="button">Add New Student</Link>
//                     </div>
//                 </form>

//             </div>
            
//         </div>
        
        
//     );
//   };
// export default AddNewStudent;
