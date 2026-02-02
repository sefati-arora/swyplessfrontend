import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./UserProfile.css";

function UserProfileEdit()
{
   const[user,setUser]=useState({
    name:"",
    Email:"",
    phoneNumber:"",
    location:""
   })
   const{postData}=useApi();
   const{id}=useParams();
   const navigate=useNavigate();
   const userUpdate=async()=>
   {
    try
    {
      const response=await postData(ApiEndPoint.editUserProfile,{id:id,
        name:user.name,
        Email:user.Email,
        phoneNumber:user.phoneNumber,
        location:user.location
      })
      console.log(response)
      if(response.message=="USER EDIT")
      {
        setUser(response.user)
        Swal.fire({
            icon:"success",
            title:"SUCCESSFULLY!",
            text:response.text
        })
        navigate('/UserProfile')
      }
      else
      {
        Swal.fire({
            icon:"error",
            title:"ERROR",
            text:response.text
        })
      }
    }
    catch(error)
    {
        Swal.fire({
            icon:"error",
            title:"ERROR!",
            text:"SERVER ERROR!"
        })
    }
   }
    return(
        <>
        <div className="UserProfile-Edit">
            <div className="UserProfileEdit-view">
                <h1>EDIT USER PROFILE!</h1>
                <h3>NAME:</h3>
                <input type="text" className="user-Edit" placeholder="NAME:" value={user.name} onChange={(e)=>setUser({...user, name:e.target.value})}/>
                <h3>EMAIL:</h3>
                <input type="text" className="email-edit" placeholder="EMAIL:" value={user.Email} onChange={(e)=>setUser({...user,Email:e.target.value})}/>
                <h3>PHONE NUMBER:</h3>
                <input type="text" className="phone-edit" placeholder="PHONE NUMBER:" value={user.phoneNumber} onChange={(e)=>setUser({...user, phoneNumber:e.target.value})}/>
                <h3>LOCATION:</h3>
                <input type="text" className="location-edit" placeholder="LOCATION:" value={user.location} onChange={(e)=>setUser({...user, location:e.target.value})}/>
                <button className="btn-UserEdit" onClick={userUpdate}>UPDATE</button>
                </div>
        </div>
        </>
    )
}
export default UserProfileEdit;