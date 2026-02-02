import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, Eye, PencilIcon } from "lucide-react";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./faq.css";

function FaqList() {
  const [faqList, setFaqList] = useState([]);
  const { postData } = useApi();
  const navigate = useNavigate();
  const FetchFeq = async () => {
    try {
      const response = await postData(ApiEndPoint.fetchFaq);
      console.log(response);
      console.log(response.message);
      if (response.message === "FETCH FAQ:") {
        setFaqList(response.faq);
        Swal.fire({
          icon: "success",
          text: response.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "SERVER ERROR!",
      });
    }
  };
  const FaqDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This Question will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;
    try {
      console.log(">>>", id);
      const deleteFaq = await postData(ApiEndPoint.faqDeleted, { id });
      console.log(deleteFaq);
      if (deleteFaq.message == "FAQ DELETED!") {
        Swal.fire({
          icon: "success",
          title: "SUCCESSFULLY",
          text: deleteFaq.message,
        });
        setFaqList((prev) => prev.filter((item) => item.id !== id));
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
    FetchFeq();
  }, []);
  return (
    <>
      <div className="Faq-container">
        <div className="Faq-Data">
          <h1>FAQ LIST!</h1>
          <button className="btnFaq-add">
            <Link to="/faq">+ADD</Link>
          </button>
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Button:</th>
              </tr>
            </thead>
            <tbody>
              {faqList.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No User found
                  </td>
                </tr>
              ) : (
                faqList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => FaqDelete(item.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="btn-view"
                        onClick={() => navigate(`/faq/view//${item.id}`)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/faq/Edit/${item.id}`)}
                      >
                        <PencilIcon size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default FaqList;
