import{ useState } from 'react';
 import{useNavigate}from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import './Login.css'
import ApiEndpoint from "../../components/ApiEndPoint";
import { useAuth } from "../../context/authProvider";
function Login()
{
      const { login } = useAuth();
    const[phoneNumber,setPhoneNumber]=useState("");
    const[countryCode,setCountryCode]=useState("");
    const[error,setError]=useState("");
    const { postDataWithOutToken } = useApi();
    const navigate = useNavigate();
   const handleSubmit=async(e)=>
   {
      e.preventDefault();
      console.log(">>",phoneNumber)
      setError("")
      if(!phoneNumber) setError("PHONE NUMBER REQUIRED!")
      if(!countryCode) setError("COUNTRY CODE REQUIRED!")
        if(!phoneNumber || !countryCode)
        {
            Swal.fire({
                icon:"info",
                title:"Required",
                text:"PHONE NUMBER AND COUNTRY CODE REQUIRED!"
            })
        }
        const data={phoneNumber,countryCode}
        console.log(data)
        console.log(">>>",phoneNumber)
        try
        {
          const response=await postDataWithOutToken(ApiEndpoint.adminLogin,data)
          console.log(response)
          if(!response)
          {
            Swal.fire({
                icon:"error",
                title:"ERROR",
                text:"ERROR WHILE FETCHING DATA"
            })
              return;
          }
        
          if(response.message=="ADMIN LOGIN!")
          {
             login({ admin: response.admin, token: response.token });
             Swal.fire({
                icon:"success",
                 title: "Login Successful",
                 text: response.message,
                  confirmButtonText: "OK",
             })
             navigate("./Dash");
          }
        }
        catch(error)
        {
            Swal.fire({
                icon:"error",
                title:"ERROR",
                text:"ERROR IN LOGIN PAGE!"
            })
        }

   }

    return(
        <>
        <div className="container">
            <div className="login-container">
                <h1>LOGIN PAGE!</h1>
                 <h1 className="country-code">CountryCode:</h1>
                 <input type="text" placeholder='ENTER COUNTRYCODE'value={countryCode} onChange={(e)=>setCountryCode(e.target.value)}/>
                <h1 className="phone-number">PhoneNumber:</h1>
                <input type="tel" placeholder='ENTER PHONENUMBER' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                <button className="btn-save" onClick={handleSubmit}>SAVE</button>
            </div>
        </div>
        </>
    )
}
export default Login;