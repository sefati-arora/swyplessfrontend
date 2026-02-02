import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./host.css";

function HostView() {
  const [host, setHost] = useState({});
  const { postData } = useApi();
  const { id } = useParams();
  const navigate = useNavigate();
  const ViewData = async () => {
    try {
      const hostView = await postData(ApiEndPoint.fetchSingleHost, { id });
      console.log(hostView);
      if (hostView.message == "HOST FETCH:") {
        setHost(hostView.host);
        Swal.fire({
          icon: "success",
          title: "SUCCESSFULLY",
          text: hostView.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title:"ERROR!",
          text: hostView.message,
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
  useEffect(() => {
    if (id) {
      ViewData();
    }
  }, [id]);
  return (
    <>
      <div className="host-view">
        <div className="hostView-Data">
          <h1>HOST PROFILE</h1>
          <div className="hostimage">
            {host.profileImage ? (
              <img
                className="image"
                src={`${ApiEndPoint.baseUrl}${host.profileImage}`}
              />
            ) : (
              <p>No image</p>
            )}
          </div>
          <h3>NAME:</h3>
          <input
            type="text"
            className="hostname-view"
            value={host.name || ""}
            disabled
          />
          <h3>EMAIL:</h3>
          <input
            type="text"
            className="hostemail-view"
            value={host.Email || ""}
            disabled
          />
          <h3>PHONE NUMBER:</h3>
          <input
            type="tel"
            className="hostPhone-view"
            value={host.phoneNumber}
            disabled
          />
          <h3>LOCATION:</h3>
          <input
            type="text"
            className="hostLocation-view"
            value={host.location || ""}
            disabled
          />
        </div>
      </div>
    </>
  );
}
export default HostView;
