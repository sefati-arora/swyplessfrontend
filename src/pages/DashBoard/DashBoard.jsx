import{ useEffect, useState } from 'react';
 import{useNavigate,Link}from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndpoint from "../../components/ApiEndPoint";
import './DashBoard.css';
function DashBoard()
{
   const[count,setCount]=useState({})
   const{getData}=useApi();
   const dashBoard=async()=>
   {
    if(!count)
    {
        Swal.fire({
            icon:"error",
            title:"NOT FOUND!",
            text:"Counts are not available"
        })
    }
    try
    {
      const data=count;
      const response=await getData(ApiEndpoint.dashBoardDetails,data)
      console.log(response)
      setCount(response)
      if(!response)
      {
        Swal.fire({
            icon:"ERROR",
            text:"RESPONSE IS NOT FOUND!"
        })
        return;
      }
      if(response.message == "DASHBOARD DETAILS:")
      {
        console.log("SUCCESSFULLY!")
      }
    }
    catch(error)
    {
        Swal.fire({
            icon:"error",
            title:"ERROR WHILE FETCHING COUNT'S",
            text:"ERROR"
        })
    }
   }
   useEffect(()=>
{
    dashBoard()
},[])
    return(
        <>
        <div className="Dash-container">
            <div className="box-conatiner">
                <div className="box1"><span className="user-box"><Link to ="/UserProfile">USER:</Link>{count?.user || 0}</span></div>
                <div className="box2"><span className="booking-box"><Link to ="/booking">BOOKING:</Link>{count?.booking || 0}</span></div>
                <div className="box3"><span className="host-box"><Link to ="/hostlist">HOST:</Link>{count ?.host || 0}</span></div>
            </div>
        </div>
        </>
    )
}

export default DashBoard;