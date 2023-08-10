import React ,{useState, useEffect} from "react";
import groupPhoto from "../images/groupPhoto.png";
import emailLogo from "../images/emailLogo.svg";
import mainLogo from "../images/mainLogo.svg";
import passwordImage from "../images/passwordImage.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';
import{useNavigate} from "react-router-dom";

import { Icon } from 'react-icons-kit';
import {locked} from 'react-icons-kit/iconic/locked';
import {unlocked} from 'react-icons-kit/iconic/unlocked'
import './styles/LoginPage.scss'



function LoginPage () {
    const navigate = useNavigate();
    const[email, setEmail]  = useState();
    const[password, setPassword]  = useState();
    const[type, setType] = useState("password")

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
                navigate("/")
            }
        } )
        .catch(err => console.log(err))
    },[])

    axios.defaults.withCredentials = true;
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
        .then(result => {
            console.log(result)

            if(result.data === "The password is incorrect"){
                alert("The Password is incorrect");

            }
            else if(result.data === "No record existed"){
                alert("No record existed\nPlease check the email you have entered or CREATE ACCOUNT first");

            }
            
            else if(result.data === "Success"){
                navigate("/DashboardPage")

            }
        } )
        .catch(err => console.log(err))

    }
    return(
        <div className="LoginPageContainer">
            <div className="mainLogo">
                <img className="logo" src={mainLogo}/>
                <p className="logoText">eSchool</p>
            </div>
            <div className="mainHeading">
                <p className="heading1">School Management Tool</p>
                <p className="heading2">For Improved Learning and <br/> Teaching experience !</p>
            </div>
            <div className="learnMoreSection">
                <button className="learnMoreButton">Learn More</button>
            </div>
            
            <div className="Loginpageform">
                <img className="mainImage" src={groupPhoto}/>
                
                <div className="accountSection">
                    <form className='form' action="POST" onSubmit={handleSubmit}>
                        <p className="formHeading">Welcome back</p>
                        <div className="subheading">
                            <p className="item1">Password</p>
                            <p className="item2">Mobile Id</p>
                            <p className="item2">Smart Id</p>
                        </div>
                        <div className="formRow">
                            <input className="formInput" placeholder="Email" 
                            onChange={(e)=>{setEmail(e.target.value)}}
                            />
                            <img className="inputImage" src={emailLogo} />
                        </div>
                        <div className="formRow">
                            <input className="formInput" placeholder="password"
                            type={type}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            />

                            {
                            type ==="password" ?(
                                <span onClick={()=>setType("text")}>
                                    <Icon className="inputImage" icon={locked} size={24}/>
                                </span>
                            ):(
                                <span onClick={()=>setType("password")}>
                                    <Icon className="inputImage" icon={unlocked} size={24}/>
                                </span>
                            )
                            }
                        </div>

                        <button  className="loginBtn" >Login</button>

                    </form>
                    <Link to="/RegisterPage" className="createAccountBtn" >Create an account ?</Link>
                </div>
            </div>     

        </div>
        
    );
  };
  export default LoginPage;
