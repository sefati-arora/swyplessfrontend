import{ useEffect, useState } from 'react';
 import{useNavigate, useParams}from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from '../../components/ApiEndPoint';

import "./booking.css";
function BookingView()
{
      const[booking,setBooking]=useState({})
      const{postData}=useApi();
      const{id}=useParams();
      const bookingData=async()=>
      {
        try
        {
          const response=await postData(ApiEndPoint.viewBooking,{bookingId:id})
          console.log(response)
          console.log(response.booking)
          if(response.message == "BOOKING VIEW:")
          {
            setBooking(response.booking)
            console.log(setBooking)
          }
          else
          {
            Swal.fire({
                icon:"error",
                title:"ERROR",
                text:response.message
            })
          }
        }
        catch(error)
        {
            Swal.fire({
                icon:"error",
                title:"error!",
                text:"SERVER ERROR"
            })
        }
      }
      useEffect(()=>
    {
        if(id)

          {  bookingData()

          }
      
    },[id])
    return(
        <>
        <div className="bookingView-conatiner">
         <div className="bookingView-data">
            <h1>BOOKING VIEW</h1>
            <h5 className="providerId-view">providerId</h5>
            <input type="text" value={booking?.providerId || ""} placeholder='ENTER YOUR PROVIDER ID' disabled/>
            <h5 className="activityID-view">activityID</h5>
            <input type="text" value={booking?.activityId || ""} placeholder='ENTER YOUR ACTIVITY ID' disabled/>
            <h5 className="DateandTime-view">DateandTime</h5>
            <input type="text"  value={booking?.DateandTime || ""} placeholder='ENTER YOUR DateandTime' disabled/>
            <h5 className="duration-view">duration</h5>
            <input type="text" value={booking?.duration || ""} placeholder='ENTER YOUR duration' disabled/>
            <h5 className="meetingType-view">meetingType</h5>
            <input type="text" value={booking?.meetingType || ""} placeholder='ENTER YOUR meetingType' disabled/>
            <h5 className="location-view">location</h5>
            <input type="text" value={booking?.location || ""} placeholder='ENTER YOUR location' disabled/>
            <h5 className="comment-view">comment</h5>
            <input type="text" value={booking?.comment || ""} placeholder='ENTER YOUR comment' disabled/>
         </div>
        </div>
        </>
    )
}
export default BookingView;