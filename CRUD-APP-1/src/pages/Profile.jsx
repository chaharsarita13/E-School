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
            // console.log(res)
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

    const [additionalData, setAdditionalData] = useState('');
    const [message, setMessage] = useState('');

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Make an API call to fetch user data
        axios.get('http://localhost:3001/user-data')
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, []);


    console.log(userData,"zzzzzzzzzzz");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await axios.post('http://localhost:3001/additional-data', {
            userId: user._id,
            data: additionalData
          });
          setMessage(response.data.message);
        } catch (error) {
          console.error('Error adding additional data:', error);
          setMessage('Error adding additional data');
        }
      };


    return(
        <div className="addNewStudentContainer">
            <div className="leftSide">
                <Sidebar />
            </div>
            <div className="rightSide">
                <div className="navbarSection">
                    <Navbar
                    path="Profile"
                    />
                </div>

                <form className="addStudent" >
                    <img className="image" src={avatar}/>
                    <div className="nameSection">
                        <div>
                            <p>First Name</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter First Name"
                                    onChange={(e) => setAdditionalData(e.target.value)}
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Last Name"
                                    onChange={(e) => setAdditionalData(e.target.value)}
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>

                    </div>
                   
                   
                    <div className="nameSection">

                        <div>
                            <p>Email</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Email"
                                    // onChange={e=>{setvalues({...values, parents : e.target.value})}}
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>
                        <div>
                            <p>Phone</p>
                            <div className="formRow">
                                <input className="formInput" placeholder="Enter Phone"
                                    onChange={(e) => setAdditionalData(e.target.value)}
                                />
                                <img className="inputImage" src={iconUser} />
                            </div>
                        </div>
                        

                    </div>
                    
                    <div className="buttonContainer">
                        <button  className="button"  onClick={handleSubmit}>Update</button>
                    </div>
                    {/* <div className="buttonContainer">
                        <button  className="button" onClick={handleDelete}>Delete</button>
                    </div> */}
                </form>
                

            </div>
            
        </div>
        
        
    );
  };
export default UpdateStudent;
