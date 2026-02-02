import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import './faq.css';

function FaqEdit()
{
     const[question,setQuestion]=useState("")
     const[answer,setAnswer]=useState("")
     const{postData}=useApi();
     const navigate=useNavigate();
     const{id}=useParams();

     const faqUpdate=async()=>
     {
        try
        {
          const response=await postData(ApiEndPoint.faqEdit,{id,
            question,answer
          })
          console.log(response)
          if(response.message=="FAQ UPDATED!")
          {
            Swal.fire({
                icon:"success",
                title:"SUCCESSFULLY!",
                text:response.message
            })
            navigate('/FaqList')
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
                title:"ERROR",
                text:"ERROR"
            })
        }
     }
    return(
        <>
        <div className="faq-Edit">
          < div className="faq-data">
          <h1>EDIT FAQ!</h1>
            <h5 className="question-data">QUESTION:</h5>
            <textarea className="question-text" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
            <h5 className="answer-data">ANSWER:</h5>
            <textarea className="answer-text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
            <button className="faqEdit-btn" onClick={faqUpdate}>UPDATE</button>
          </div>
        </div>
        </>
    )
}
export default FaqEdit;