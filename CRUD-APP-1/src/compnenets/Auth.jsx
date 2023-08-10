import React ,{useState, useEffect} from "react";
import groupPhoto from "../images/groupPhoto.png";
import emailLogo from "../images/emailLogo.svg";
import mainLogo from "../images/mainLogo.svg";
import passwordImage from "../images/passwordImage.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';
import{useNavigate} from "react-router-dom"
import './styles/Auth.scss'

function AuthPage () {  


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
    return(
        <div className="authPage">
            <div className="main">
                <p className="main1">You are not authenticated to access this Page</p>
                <p className="main2">Please Login first!!!</p>
            </div>
            <Link  to="/" className="mainBtn">
                Login
            </Link>
            
            <img className="mainImage" src={groupPhoto}/>

        </div> 
    );
  };
  export default AuthPage;
