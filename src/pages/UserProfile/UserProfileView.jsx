import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import "./UserProfile.css";
function UserProfileView() {
  const [user, setUser] = useState({});
  const { postData } = useApi();
  const { id } = useParams();

  const userView = async () => {
    try {
      const response = await postData(ApiEndPoint.userView, { id });
      console.log(response);

      if (response.message === "USER FOUND!") {
        setUser(response.user);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "User not found"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong"
      });
    }
  };

  useEffect(() => {
    if (id) {
      userView();
    }
  }, [id]);

  return (
    <div className="profileView-container">
      <div className="profileData-container">
        <h1>USER PROFILE VIEW</h1>

        <div className="image-container">
          {user .profileImage ? (
            <img
              src={`${ApiEndPoint.baseUrl}${user.profileImage}`}
              alt="User"
            />
          ) : (
            <p>No image</p>
          )}
        </div>

        <h2>NAME:</h2>
        <input type="text" value={user?.name || ""} disabled />

        <h2>EMAIL:</h2>
        <input type="email" value={user?.Email || ""} disabled />

        <h2>LOCATION:</h2>
        <input type="text" value={user?.location || ""} disabled />
      </div>
    </div>
  );
}

export default UserProfileView;
