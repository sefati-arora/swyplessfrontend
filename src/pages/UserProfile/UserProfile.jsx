import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import { Trash2, Eye, PencilIcon } from "lucide-react";
import "./UserProfile.css";
function UserProfile() {
  const [user, setUser] = useState([]);
  const [userDataDelete, setUserDelete] = useState({});
  const { postData } = useApi();
  const navigate = useNavigate();
  const userProfile = async () => {
    try {
      const response = await postData(ApiEndPoint.userFetch);
      console.log(response);
      console.log(response.user);
      if (response.message === "USER DATA:") {
        setUser(response.user);
      }
      if (!response) {
        Swal.fire({
          icon: "error",
          text: "ERROR WHILE FETCHING DATA!",
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
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This User will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;
    try {
      const userDelete = await postData(ApiEndPoint.deleteUserProfile, { id });
      console.log(userDelete);

      if (userDelete.message === "USER DELETED BY ADMIN") {
        Swal.fire({
          icon: "success",
          text: "USER DELETED!",
        });
        setUserDelete((prev) => prev.filter((user) => user.id !== id));
        navigate("/Dash");
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: userDelete.message,
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
  useEffect(() => {
    userProfile();
  }, []);

  return (
    <>
      <div className="user-container">
        <div className="userData-container">
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>PROFILE IMAGE:</th>
                <th>NAME:</th>
                <th>EMAIL:</th>
                <th>PHONE NUMBER:</th>
                <th>LOCATION:</th>
                <th>BUTTON:</th>
              </tr>
            </thead>
            <tbody>
              {user.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No User found
                  </td>
                </tr>
              ) : (
                user.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>
                      {" "}
                      {user.profileImage ? (
                        <img
                          className="image"
                          src={`${ApiEndPoint.baseUrl}${user.profileImage}`}
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.Email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.location}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="btn-view"
                        onClick={() => navigate(`/user/View/${user.id}`)}
                      >
                        <Eye size={18} />
                      </button>
                       <button
                        className="btn-view"
                        onClick={() => navigate(`/userprofile/Update/${user.id}`)}
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
export default UserProfile;
