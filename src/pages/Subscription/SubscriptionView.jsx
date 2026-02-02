import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./Subscription.css";

function SubscriptionView() {
  const [subView, setSubscriptionView] = useState({});
  const { postData } = useApi();
  const { id } = useParams();
  const viewSub = async () => {
    try {
      const response = await postData(ApiEndPoint.SubscriptionView, { id });
      console.log(response);
      console.log(">>>", response.subView);
      if (response.message == "SUBSCRIPTION VIEW") {
        Swal.fire({
          icon: "success",
          title: "SUCCESSFULLY!",
          text: response.message,
        });
        setSubscriptionView(response.subView);
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
      });
    }
  };
  useEffect(() => {
    if (id) {
      viewSub();
    }
  }, [id]);
  return (
    <>
      <div className="subView-container">
        <div className="subViewData-conatiner">
          <h1>
            <Link to="/subList">:--</Link> SUBSCRIPTION VIEW!
          </h1>
          <h3 className="title-view">title</h3>
          <input
            type="text"
            value={subView?.title || ""}
            placeholder="ENTER YOUR TITLE"
            disabled
          />
          <h3 className="Amount-view">Amount</h3>
          <input
            type="text"
            value={subView?.Amount || ""}
            placeholder="ENTER YOUR AMOUNT"
            disabled
          />
          <h3 className="description-view">description</h3>
          <input
            type="text"
            value={subView?.description || ""}
            placeholder="ENTER YOUR DESCRIPTION"
            disabled
          />
          <h3 className="subscriptionType-view">subscriptionType</h3>
          <select className="select-subType" value={subView?.subscriptionType}>
            <option value="">SELECT TYPE</option>
            <option value="0">WEEKLY</option>
            <option value="1">MONTHLY</option>
            <option value="2">YEARLY</option>
          </select>
        </div>
      </div>
    </>
  );
}
export default SubscriptionView;
