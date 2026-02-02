import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./host.css";

function HostEdit() {
  const [host, setHost] = useState({
    name: "",
    Email: "",
    phoneNumber: "",
    location: "",
  });
  const { postData } = useApi();
  const { id } = useParams();
  const navigate = useNavigate();
  const HostEdit = async () => {
    try {
      const response = await postData(ApiEndPoint.editHost, {
        id: id,
        name: host.name,
        Email: host.Email,
        phoneNumber: host.phoneNumber,
        location: host.location,
      });
      console.log(response);
      if (response.message == "EDIT PROFILE SUCCESSFULLY!") {
        setHost(response.host);
        navigate("/hostlist");
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
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
  return (
    <>
      <div className="hostEdit-container">
        <div className="hostEdit-data">
          <h1>HOST PROFILE EDIT:</h1>
          <h3>NAME:</h3>
          <input
            type="text"
            className="nameEdit-data"
            placeholder="NAME:"
            value={host.name}
            onChange={(e) => setHost({ ...host, name: e.target.value })}
          />
          <h3>EMAIL:</h3>
          <input
            type="text"
            className="emailEdit-data"
            placeholder="EMAIL:"
            value={host.Email}
            onChange={(e) => setHost({ ...host, Email: e.target.value })}
          />
          <h3>PHONENUMBER:</h3>
          <input
            type="tel"
            className="phoneEdit-data"
            placeholder="PHONE NUMBER:"
            value={host.phoneNumber}
            onChange={(e) => setHost({ ...host, phoneNumber: e.target.value })}
          />
          <h3>LOCATION:</h3>
          <input
            type="text"
            className="locationEdit-data"
            placeholder="LOCATION"
            value={host.location}
            onChange={(e) => setHost({ ...host, location: e.target.value })}
          />
          <button className="hostEdit-btn" onClick={HostEdit}>
            UPDATE
          </button>
        </div>
      </div>
    </>
  );
}
export default HostEdit;
