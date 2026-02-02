import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./faq.css";

function FaqView() {
  const [view, setView] = useState({});
  const { postData } = useApi();
  const { id } = useParams();
  const navigate = useNavigate();
  const viewData = async () => {
    try {
      const response = await postData(ApiEndPoint.faqView, { id });
      console.log(response);
      if (response.message == "FAQ VIEW:") {
        setView(response.view);
        Swal.fire({
          icon: "success",
          title: "SUCCESSFULLY",
          text: response.message,
        });
        navigate("/FaqList");
      } else {
        Swal.fire({
          icon: "error",
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "ERROR",
      });
    }
  };
  useEffect(() => {
    if (id) {
      viewData();
    }
  }, [id]);
  return (
    <>
      <div className="faqView-container">
        <div className="faqView-data">
          <h5 className="question-data">QUESTION:</h5>
          <textarea
            className="question-view"
            value={view?.question || ""}
            disabled
          />
          <h5 className="answer-data">ANSWER:</h5>
          <textarea
            className="answer-view"
            value={view?.answer || ""}
            disabled
          />
        </div>
      </div>
    </>
  );
}

export default FaqView;
