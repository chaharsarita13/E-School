import React , {useState, useEffect} from "react";
import plus from "../images/plus.svg";
import edit from "../images/edit.svg";
import search from "../images/search.svg";
import actionIcon from "../images/actionIcon.svg";
import downArrow from "../images/downArrow.svg";
import { Link } from 'react-router-dom';
import Sidebar  from '../compnenets/Sidebar';
import Navbar  from '../compnenets/Navbar';
import { Icon } from 'react-icons-kit';
import {bin} from 'react-icons-kit/ikons/bin';
import axios from 'axios';
import{useNavigate} from "react-router-dom";
import './styles/StudentsPage.scss'



function StudentsPage() {

    axios.defaults.withCredentials=true;
    const navigate = useNavigate();
    
    const[auth, setAuth] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:3001/getVerifiedUser')
        .then(res => {
            // console.log(res)
            if(res.data === "Success"){
                setAuth(true)
                navigate("/StudentsPage")
            }else{
                setAuth(false)
                navigate("/authorizationFailed")
            }
        } )
        .catch(err => console.log(err))
    },[])

    const [students, setStudents] = useState([]);
    const [filtered,setFiltered]=useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        fetchItems(currentPage);
      }, [currentPage]);
    
    const fetchItems = async (page) => {
    try {
        const response = await axios.get(`http://localhost:3001/getStudents?page=${page}`);
        setStudents(response.data.students);
        setFiltered(response.data.students);
        setTotalCount(response.data.totalCount);
        //  console.log(students,'aaaa')
        // console.log(filtered,'bbb')
        // console.log('ccc')
    } catch (error) {
        console.error('Error fetching items:', error);
    }
    };


    const [seacrhData, setSearchData]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/getStudentsForChart')
        .then(res => {
            setSearchData(res.data);
        })
        .catch(err => console.log(err))
    },[])

    const Filter =(e)=>{
        setFiltered(seacrhData.filter(val => val.firstName?.toLowerCase().includes(e.target.value)))

    }


    const tableHeader = ["ID", "First Name", "Last Name", "Date of Birth", "Class", "Parent's Name", "Address","Actions" ,"DELETE"]



    const handlePrev =()=>{
        setCurrentPage((page)=>{
            if(page===1)return page;
            return page-1;
        })
    }
    const handleNext =()=>{
        setCurrentPage((page)=>{
            if(page=== totalCount)return page;
            return page+1;
        })
    }


    const handleDelete =(id)=>{
        axios.delete('http://localhost:3001/getStudentsForChart/'+id)
        .then(res =>{
            location.reload();
        })
        .catch(err=>console.log(err))
        
    }
    
    return(
        <div className="addNewStudentContainer">
            <div className="leftSide">
                <Sidebar />
            </div>
            <div className="rightSide">
                <div className="navbarSection">
                    <Navbar
                        path="Students"
                    />
                </div>

                <div className="studentListContainer">
                    <div className="topbar">

                        <div className="search">
                            <img className="image" src={search}/>
                            <input className="input" placeholder="Search for Students..." onChange={Filter}/>
                        </div>
                        <div className="rightBtn">
                            <Link className="edit">
                                <img className="image " src={edit}/>
                                <p className="para">Edit Student Details</p>
                            </Link>
                            <Link to="/AddNewStudent" className="addNew">
                                <img className="image " src={plus}/>
                                <p className="para">Add New</p>
                            </Link>
                        </div>
                    </div>
                    <div className="studentsList">
                        <table className="tableContainer">
                            <tr className="tableHeader">
                                {tableHeader.map((item) =>{
                                    return(
                                        <th className="header">{item}</th>
                                    )
                                })}
                            </tr>

                            
                            {filtered.map((item, index)=>{
                                return(
                                <tr className="tableHeader" key={index}>
                                    <td className="listItems">{item.id}</td>
                                    <td className="listItems">{item.firstName}</td> 
                                    <td className="listItems">{item.lastName}</td> 
                                    <td className="listItems">{item.dob}</td> 
                                    <td className="listItems">{item.classname}</td>  
                                    <td className="listItems">{item.parents}</td>    
                                    <td className="listItems">{item.address}</td>  
                                    <td className="listItems">
                                        <Link to={`/updateStudent/${item._id}`}><img src={actionIcon}/></Link>

                                    </td> 
                                    <td className="listItems">
                                        <Icon  className="deleteButton" onClick={()=>handleDelete(item._id)} icon={bin} size={20}/>

                                    </td> 
                                </tr>
                                )
                            })}
                        </table>
                            
                        <button
                            disabled={currentPage === 1}
                            onClick={handlePrev}
                            >
                            Previous
                            </button>
                            <button
                            disabled={currentPage *5 >= totalCount}
                            onClick={handleNext}
                            >
                            Next
                        </button>

                    </div>
                </div>

            </div>
            
        </div>
        
        
    );
  };
export default StudentsPage;




