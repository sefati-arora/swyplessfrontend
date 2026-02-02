import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./Subscription.css";
function SubscriptionEdit() {
  const [subEdit, setSubEdit] = useState({
    title: "",
    Amount: "",
    description: "",
    subscriptionType: "",
  });
  const { postData } = useApi();
  const { id } = useParams();
  const navigate = useNavigate();
  const EditSub = async () => {
    try {
      const response = await postData(ApiEndPoint.subscriptionEdit, {
        id,
        title: subEdit.title,
        subscriptionType: subEdit.subscriptionType,
        description: subEdit.description,
        Amount: subEdit.Amount,
      });
      console.log(response);
      if (response.message == "SUBSCRIPTION UPDATED!") {
        setSubEdit(response.subEdit);
        Swal.fire({
          icon: "success",
          text: response.message,
        });
        navigate("/subList");
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
        text: "ERROR!",
      });
    }
  };
  return (
    <>
      <div className="sub-editContainer">
        <div className="sub-DataContainer">
          <h1>
            <Link to="/subCreate"></Link>EDIT SUBSCRIPTION!
          </h1>
          <h3 className="title-edit">TITLE</h3>
          <input
            type="text"
            value={subEdit?.title}
            placeholder="ENTER TITLE:"
            onChange={(e) => setSubEdit({ ...subEdit, title: e.target.value })}
          />
          <h3 className="Amount-edit">AMOUNT</h3>
          <input
            type="text"
            value={subEdit?.Amount}
            placeholder="ENTER TITLE:"
            onChange={(e) => setSubEdit({ ...subEdit, Amount: e.target.value })}
          />
          <h3 className="DESCRIPTION-edit"> DESCRIPTION</h3>
          <input
            type="text"
            value={subEdit?.description}
            placeholder="ENTER TITLE:"
            onChange={(e) =>
              setSubEdit({ ...subEdit, description: e.target.value })
            }
          />
          <h3 className="type-edit">SUBSCRIPTION TYPE</h3>
          <select
            className="select-subType"
            value={subEdit?.subscriptionType}
            onChange={(e) =>
              setSubEdit({ ...subEdit, subscriptionType: e.target.value })
            }
          >
            <option value="">SELECT TYPE</option>
            <option value="0">WEEKLY</option>
            <option value="1">MONTHLY</option>
            <option value="2">YEARLY</option>
          </select>

          <button className="btn-Dataedit" onClick={EditSub}>
            UPDATE
          </button>
        </div>
      </div>
    </>
  );
}
export default SubscriptionEdit;
