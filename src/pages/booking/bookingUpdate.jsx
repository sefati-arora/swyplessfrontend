import{ useEffect, useState } from 'react';
 import{useNavigate, useParams}from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from '../../components/ApiEndPoint';
import './booking.css';

function BookingUpdate()
{
    const[booking,setBooking]=useState({
        DateandTime:"",
        duration:"",
        meetingType:"",
        location:"",
        comment:""
    });
    const{postData}=useApi();
    const{id}=useParams();
    const navigate=useNavigate();
    const bookingUpdate=async()=>
    {
        try
        {
            console.log(id)
           const response=await postData(ApiEndPoint.updateBooking,{id:id,
            DateandTime:booking.DateandTime,
            duration:booking.duration,
            meetingType:booking.meetingType,
            location:booking.location,
            comment:booking.comment
           });
           console.log(response);
           if(response.message=="BOOKING UPDATED!")
           {
            setBooking(response.booking)
             Swal.fire({
                icon:"success",
                title:"SUCCESSFULY!",
                text:"success!"
             })
             navigate('/booking')
           }
           else
           {
            Swal.fire({
                icon:"error",
                title:"ERROR!",
                text:response.message
            })
           }
        }
        catch(error)
        {
            Swal.fire({
                icon:"error",
                title:"ERROR!",
                text:"ERROR."
            })
        }
    }

    return(
        <>
        <div className="booking-edit">
            <div className="bookingEdit-view">
                <h1>BOOKING EDIT</h1>
                <h3>DateandTime</h3>
                <input type="text" value={booking?.DateandTime} placeholder='ENTER DATE AND TIME' onChange={(e)=>setBooking({...booking, DateandTime:e.target.value})}/>
                <h3>duration</h3>
                <input type="text" value={booking?.duration} placeholder='ENTER DURATION' onChange={(e)=>setBooking({...booking,duration:e.target.value})}/>
                <h3>meetingType</h3>
                <input type="text" value={booking?.meetingType}placeholder='ENTER MEETING TYPE' onChange={(e)=>setBooking({...booking ,meetingType:e.target.value})}/>
                <h3>location</h3>
                <input type="text" value={booking?.location} placeholder='ENTER LOCATION' onChange={(e)=>setBooking({...booking, location:e.target.value})}/>
                <h3>comment</h3>
                <input type="text" value={booking?.comment} placeholder='ENTER COMMENT'onChange={(e)=>setBooking({...booking,comment:e.target.value})}/>
                <button className="btn-bookingEdit" onClick={bookingUpdate}>UPDATE</button>
            </div>
        </div>
        </>
    )
}

export default BookingUpdate;