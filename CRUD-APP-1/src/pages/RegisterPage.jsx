import React, { useState } from "react";
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
import './styles/RegisterPage.scss';



function RegisterPage () {

    const navigate = useNavigate();
    const[email, setEmail]  = useState();
    const[password, setPassword]  = useState();
    const[confirmPassword, setConfirmPassword]  = useState();
    const[type2, setType2]  = useState("password");
    const[type1, setType1] = useState("password")

    const [isValid, setIsValid] = useState(false);

    const handlePasswordChange = (event) => {

        const newPassword = event.target.value;
    
        const hasLowercase = /[a-z]/.test(newPassword);
        
        const hasUppercase = /[A-Z]/.test(newPassword);
        
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword);

        const isValidPassword = hasLowercase && hasUppercase && hasSpecialChar && newPassword.length >= 8;
    
        setPassword(newPassword);
        setIsValid(isValidPassword);
      };


   
    const handleSubmit =(e)=>{

        e.preventDefault()
        if(isValid){
            if(email==null){
                alert("please fill your e-mail")
            }
            else if (password==null){
                alert("Please Enter Password")
            }
            else if (password != confirmPassword ) {
                alert("password not matched")
            }
            else if(password === confirmPassword && email!=null){
    
                axios.post('http://localhost:3001/register', {email, password})
                .then(res => {
                    console.log(res)
                    if(res.data === "Existing user"){
                        alert("User Already Exist \n Please Login or try creating account with another Email")
                    }
                    else if( res.data === 'Registration failed'){
                        alert("Facing Technical issue\n Kindly try Again")
                    }
                    else if(res.data=== 'Registration successful'){
                        alert("Account Created Successfully")
                        navigate("/")
                    }
                } )
                .catch(err => console.log(err))
            }
        }
        else{
            alert("Password must contain at least 8 characters, \nincluding lowercase, uppercase, and special characters.")
        }
    }








    return(
        <div className="LoginPageContainer">
            <div className="mainLogo" >
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
                    <form className='form' onSubmit={handleSubmit} >
                        <p className="formHeading2">Create Account</p>
                        <div className="formRow">
                            <input className="formInput" placeholder="Email" 
                            onChange={(e)=>{setEmail(e.target.value)}}
                            type="email"
                        
                            />
                            <img className="inputImage" src={emailLogo} />
                        </div>
                        <div className="formRow">
                            <input className="formInput" placeholder="password"
                            id="password"
                            type={type1}
                            // onChange={(e)=>{setPassword(e.target.value)}}
                            onChange={handlePasswordChange}
                            />
                            {
                            type1 ==="password" ?(
                                <span onClick={()=>setType1("text")}>
                                    <Icon className="inputImage" icon={locked} size={24}/>
                                </span>
                            ):(
                                <span onClick={()=>setType1("password")}>
                                    <Icon className="inputImage" icon={unlocked} size={24}/>
                                </span>
                            )
                            }
                        </div>
                        {isValid ? (
                            <p className="validMessage">Password meets all criteria.</p>
                            ) : (
                            // <p className="validMessage">Password must contain at least 8 characters,including lowercase, uppercase, and special characters.</p>
                            <span className="validMessage">Password must contain at least 8 characters,<br/>including lowercase, uppercase, and special characters.</span>

                        )}
                        <div className="formRow">
                            <input className="formInput" placeholder="Confirm Password" 
                            id="confirmPassword"
                            onChange={(e)=>{setConfirmPassword(e.target.value)}}
                            type={type2}
                            />
                            {/* <img className="inputImage" src={passwordImage} /> */}
                            {
                            type2 ==="password" ?(
                                <span onClick={()=>setType2("text")}>
                                    <Icon className="inputImage" icon={locked} size={24}/>
                                </span>
                            ):(
                                <span onClick={()=>setType2("password")}>
                                    <Icon className="inputImage" icon={unlocked} size={24}/>
                                </span>
                            )
                            }

                        </div>

                        <button className="loginBtn"  type="submit">Create</button>

                    </form>
                    <div className="alreadyPara">Already have an account ? 
                        <Link to="/" className="LoginButton" >Login</Link>
                    </div>   
                </div>
            </div>     

        </div>
        
    );
  };
  export default RegisterPage;
