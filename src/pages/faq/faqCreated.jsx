import { useState } from "react";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./faq.css";
function FaqCreation() {
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");
  const { postData } = useApi();
  const faqCreation = async () => {
    try {
      const data = { question, answer };
      const response = await postData(ApiEndPoint.faqAndHelp, data);
      console.log(response);
      if (response.message == "FAQANDHELP:") {
        Swal.fire({
          icon: "success",
          title: "SUCCESSFULLY!",
          text: response.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "error",
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "SERVER ERROR",
      });
    }
  };

  return (
    <>
      <div className="Faq-container">
        <div className="faqData-container">
          <h3>Frequently Asked Questions</h3>
          <h6 className="question-Data">QUESTION:</h6>
          <textarea
            value={question}
            placeholder="ENTER QUESTION"
            onChange={(e) => setquestion(e.target.value)}
          />
          <h6 className="answer-Data">ANSWER:</h6>
          <textarea
            value={answer}
            placeholder="ENTER ANSWER"
            onChange={(e) => setanswer(e.target.value)}
          />
          <button className="btn-faq" onClick={faqCreation}>
            SAVE
          </button>
        </div>
      </div>
    </>
  );
}

export default FaqCreation;
