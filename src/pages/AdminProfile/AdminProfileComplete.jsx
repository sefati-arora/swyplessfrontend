import{ useEffect, useState } from 'react';
 import{useNavigate}from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from '../../components/ApiEndPoint';
import './AdminProfile.css';
function AdminProfileComplete()
{
   const[name,setName]=useState("")
   const [Email,setEmail]=useState("")
   const[location,setlocation]=useState("")
      const navigate = useNavigate();
        const {postData}=useApi();
        const AdminProfile=async(e)=>
            {
                 e.preventDefault();
              if(!name )
             {
            Swal.fire({
                icon:"error",
                title:"REQUIRED!",
                text:"NAME MUST BE FILED!"
            })
            return;
             } 
              if(!Email )
             {
            Swal.fire({
                icon:"error",
                title:"REQUIRED!",
                text:"EMAIL MUST BE FILED!"
            })
            return;
             } 
              if(!location )
             {
            Swal.fire({
                icon:"error",
                title:"REQUIRED!",
                text:"LOCATION MUST BE FILED!"
            })
            return;
             } 
                try
                {
                  const data={name,Email,location}
                  const response=await postData(ApiEndPoint.adminProfile,data)
                  console.log(response)
                  if(!response)
                  {
                    Swal.fire({
                        icon:"error",
                        text:"ERROR WHILE FETCHING DATA!"
                    })
                    return;
                  }
                  if(response.message == "ADMIN PROFILE COMPLETED")
                  {
                    Swal.fire({
                        icon:"success",
                        text:response.message,
                        confirmButtonText:"OK",
                    })
                     navigate("/Dash");
                  }
                  
                }
                catch(error)
                {
                    Swal.fire({
                        icon:"ERROR!",
                        title:"ERROR!",
                        text:"ERROR..........."
                    })
                }
            }   
    return(
        <>
         <div className="profile-container">
            <div className="data-container">
                 <h2>PROFILE COMPLETE</h2>
            <h3>NAME:</h3>
           <input
            className="name-input"
            type="text"
            value={name}
            placeholder="ENTER YOUR NAME"
            onChange={(e) => setName(e.target.value)} required
          />
            <h3>EMAIL:</h3>
             <input
            className="email-input"
            type="email"
            value={Email}
            placeholder="ENTER YOUR MAIL ADDRESS"
            onChange={(e) => setEmail(e.target.value)} required
          />
          <h3>LOCATION:</h3>
           <input
            className="location-input"
            type="text"
            value={location}
            placeholder="ENTER YOUR LOCATION"
            onChange={(e) => setlocation(e.target.value)} required
          />
            <button className="btn-save" onClick={AdminProfile}>SAVE</button>
            </div>
         </div>
        </>
    )
}

export default AdminProfileComplete;