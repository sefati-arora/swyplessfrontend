import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./Subscription.css";
function SubscriptionCreated() {
  const [title, setTitle] = useState("");
  const [Amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const { postData } = useApi();
  const navigate = useNavigate();
  const subscriptionCreated = async () => {
    if (!title) {
      Swal.fire({
        icon: "info",
        text: "TITLE MUST BE REQUIRED!",
      });
    }
    if (!Amount) {
      Swal.fire({
        icon: "info",
        text: "Amount MUST BE REQUIRED!",
      });
    }
    if (!description) {
      Swal.fire({
        icon: "info",
        text: "description MUST BE REQUIRED!",
      });
    }
    if (!subscriptionType) {
      Swal.fire({
        icon: "info",
        text: "subscriptionType MUST BE REQUIRED!",
      });
    }
    try {
      const Data = { title, Amount, description, subscriptionType };
      const subCreate = await postData(ApiEndPoint.subscriptionCreated, Data);
      if (subCreate.message == "SUBSCRIPTION CREATED!") {
        navigate("/subList");
      } else {
        Swal.fire({
          icon: "error",
          text: subCreate.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "ERROR!",
      });
    }
  };
  return (
    <>
      <div className="subscription-container">
        <div className="subscription-data">
          <h1>SUBSCRIPTION !</h1>
          <h4 className="title-container">title</h4>
          <input
            type="text"
            value={title}
            placeholder="ENTER TITLE:"
            onChange={(e) => setTitle(e.target.value)}
          />
          <h4 className="Amount-container">Amount</h4>
          <input
            type="text"
            value={Amount}
            placeholder="ENTER Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <h4 className="description-conatiner">description</h4>
          <input
            type="text"
            value={description}
            placeholder="ENTER description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <h4 className="subscriptionType-container">Subscription Type</h4>
          <select
            className="select-subType"
            value={subscriptionType}
            onChange={(e) => setSubscriptionType(e.target.value)}
          >
            <option value="">SELECT TYPE</option>
            <option value="0">WEEKLY</option>
            <option value="1">MONTHLY</option>
            <option value="2">YEARLY</option>
          </select>
          <button className="btn-sub" onClick={subscriptionCreated}>
            SAVE
          </button>
        </div>
      </div>
    </>
  );
}
export default SubscriptionCreated;
