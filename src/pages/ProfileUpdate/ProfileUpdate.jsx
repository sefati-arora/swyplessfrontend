import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./ProfileUpdate.css";
function ProfileUpdate() {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const { postData } = useApi();
  const navigate = useNavigate();
  const ProfileAdmin = async (e) => {
    e.preventDefault();
    if (!name) {
      Swal.fire({
        icon: "info",
        text: "NAME MUST BE REQUIRED!",
      });
      return;
    }
    if (!Email) {
      Swal.fire({
        icon: "info",
        text: "EMAIL MUST BE REQUIRED!",
      });
      return;
    }
    if (!phoneNumber) {
      Swal.fire({
        icon: "info",
        text: "PHONENUMBER MUST BE REQUIRED!",
      });
      return;
    }
    if (!location) {
      Swal.fire({
        icon: "info",
        text: "LOCATION MUST BE REQUIRED!",
      });
      return;
    }
    const data = { name, Email, phoneNumber, location };
    try {
      const response = await postData(ApiEndPoint.EditAdminProfile, data);
      console.log(response);
      if (!response || !response.message) {
        Swal.fire({
          icon: "error",
          text: "INVALID SERVER RESPONSE",
        });
        return;
      }
      if (response.message == "ADMIN PROFILE EDITED!") {
        navigate("/Dash");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: "ERROR",
      });
    }
  };
  return (
    <>
      <div className="profileUpdate-container">
        <div className="profileUpdateData-container">
          <h2 className="header">PROFILE UPDATE</h2>
          <h3 className="name-update">NAME:</h3>
          <input
            className="nameUpdate-input"
            value={name}
            type="text"
            placeholder="ENTER YOUR NAME"
            onChange={(e) => setName(e.target.value)}
          />
          <h3 className="email-update">EMAIL:</h3>
          <input
            className="emailUpdate-input"
            type="email"
            value={Email}
            placeholder="ENTER YOUR EMAIL"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="phone-update">PHONE NUMBER:</h3>
          <input
            className="phoneUpdate-input"
            type="tel"
            value={phoneNumber}
            placeholder="ENTER YOUR PHONE NUMBER"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <h3 className="location-update">LOCATION:</h3>
          <input
            className="locationUpdate-input"
            type="text"
            value={location}
            placeholder="ENTER YOUR LOCATION"
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn-update" onClick={ProfileAdmin}>
            UPDATE
          </button>
        </div>
      </div>
    </>
  );
}
export default ProfileUpdate;
