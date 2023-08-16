import React ,{useState, useEffect}from "react";
import bullet from "../images/bullet.svg";
import leftArrow from "../images/leftArrow.svg";
import { Link } from 'react-router-dom';
import Sidebar  from '../compnenets/Sidebar';
import Navbar  from '../compnenets/Navbar';
import{useNavigate} from "react-router-dom";
import axios from 'axios';
import './styles/ChangePasswordPage.scss';

function ChangePasswordPage() {


    axios.defaults.withCredentials=true;
    const navigate = useNavigate();

    const[auth, setAuth] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:3001/getVerifiedUser')
        .then(res => {
            console.log(res)
            if(res.data === "Success"){
                setAuth(true)
                navigate("/ChangePasswordPage")
            }else{
                setAuth(false)
                navigate("/authorizationFailed")
            }
        } )
        .catch(err => console.log(err))
    },[])

    const [profile, setProfile] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3001/getProfile' , {
            withCredentials: true,
          })
          .then(response => setProfile(response.data))
          .catch(error => console.error(error));
    }, []);

    console.log(profile);

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valid , setValid] = useState(false);


    const handlePassword = (event) => {

        const validPassword = event.target.value;
    
        const hasLowercase = /[a-z]/.test(validPassword);
        
        const hasUppercase = /[A-Z]/.test(validPassword);
        
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(validPassword);

        const isValidPassword = hasLowercase && hasUppercase && hasSpecialChar && validPassword.length >= 8;
    
        setNewPassword(validPassword);
        setValid(isValidPassword);
      };

    const handleChangePassword = () => {
        

        if(valid ==false){
            alert("Password requirements not matched");
        }

        if (newPassword != confirmPassword ) {
            alert("password not matched")
            return
        }

        axios.post(
        'http://localhost:3001/change-password',
        { password, newPassword }
        )
        .then(response => {
        console.log('Password changed successfully');
        alert("Password Changed Successfully");
        navigate("/DashboardPage")
        })
        .catch(error => {
        console.error('Error changing password:', error);
        });
    };


    return(
        <div className="ChangePasswordContainer">
            <div className="leftSide">
                <Sidebar />
            </div>
            <div className="rightSide">
                <div className="navbarSection">
                    <Navbar
                    path="Profile>Change Password"
                    />
                </div>

                <div className="password">
                    <div className="heading">
                        <img className="hadingImage" src={leftArrow}/>
                        <p className="headingText">Manage your Security Settings</p>
                    </div>
                    <p className="subheading">Change your password.</p>
                    <div className="input">
                        <p className="inputHeading">Old Password</p>
                        <input className="inpputText" placeholder="Old Password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                    </div>
                    <div className="input">
                        <p className="inputHeading">New Password</p>
                        <input  className="inpputText" placeholder="New Password"
                            // onChange={(e)=>{setNewPassword(e.target.value)}}
                            onChange={handlePassword}
                        />
                    </div>
                    <div className="input">
                        <p className="inputHeading">Confirm Password</p>
                        <input  className="inpputText" placeholder="Confirm Password"
                            onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        />
                    </div>
                    
                    <div className="bulletList">
                        <div className="list">
                            <img className="listImage" src={bullet}/>
                            <p className="listPara">Atleast 1 Special characters</p>
                        </div>
                        <div className="list">
                            <img className="listImage" src={bullet}/>
                            <p className="listPara">Atleast 1 Lowercase letter</p>
                        </div>
                        <div className="list">
                            <img className="listImage" src={bullet}/>
                            <p className="listPara">Atleast 1 Uppercase letter</p>
                        </div>
                        <div className="list">
                            <img className="listImage"  src={bullet}/>
                            <p className="listPara">Atleast 1 Digit</p>
                        </div>
                        <div className="list">
                            <img className="listImage" src={bullet}/>
                            <p className="listPara">Atleast 8 characters</p>
                        </div>
                    </div>
                    <div >
                        <div className="button">
                            <Link className="cancel">Cancel</Link>
                            <Link className="save" onClick={handleChangePassword} >Save</Link>
                        </div>

                    </div>

                </div>

            </div>
            
        </div>
        
        
    );
  };
export default ChangePasswordPage;

