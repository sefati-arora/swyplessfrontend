import{ useState } from 'react';
 import{useNavigate}from "react-router-dom";
 import { Bell, UserCog2 } from "lucide-react";
import Swal from "sweetalert2";
import useApi from "./useApi";
import './navBar.css';
function NavBar()
{
     const navigate = useNavigate();
    const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    })
    
      navigate("./");
  };
    return(
        <>
        <div className="nav-bar">
            <label className="notify">
          <Bell size={25} />
        </label>
         <label className="Admin-controller">
          <UserCog2 size={18} />
          Admin
          <select className="select-row"
            onChange={(e) => {
              if (e.target.value) {
                
                navigate(e.target.value);
                
              }
              if(e.target.value=="logout")
              {
                handleLogout();
              }
            }}
          >
            <option value="logout">Logout</option>
            <option value="/password">Password Change</option>
            <option>Setting</option>
            <option value="/ProfileUpdate">Profile Update</option>
            <option value="/AdminProfile">Complete Profile</option>
          </select>
          </label>
        </div>
        </>
    )
}

export default NavBar;