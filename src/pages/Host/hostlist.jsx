import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import { Trash2, Eye, PencilIcon } from "lucide-react";
import "./host.css";
function HostList() {
  const [host, sethost] = useState([]);
  const { postData } = useApi();
  const navigate = useNavigate();
  const hostData = async () => {
    try {
      const response = await postData(ApiEndPoint.fetchDataHost);
      console.log(response);
      if (response.message == "HOST DETAILS:") {
        sethost(response.host);
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
  const deleteHost = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This User will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;
      const hostdelete = await postData(ApiEndPoint.deleteHost, { id });
      console.log(hostdelete);
      if (hostdelete.message == "DELETE HOST SUCCESSFULLY!") {
        Swal.fire({
          icon: "success",
          title: "successfully",
          text: hostdelete.message,
        });

        sethost((prev) => prev.filter((host) => host.id !== id));
        navigate("/Dash");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "ERROR",
      });
    }
  };
  useEffect(() => {
    hostData();
  }, []);
  return (
    <>
      <div className="hostlist-container">
        <div className="hostlist-data">
          <h1>HOST PROFILE:</h1>
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Profile Image</th>
                <th>NAME:</th>
                <th>EMAIL:</th>
                <th>PHONE NUMBER:</th>
                <th>LOCATION:</th>
                <th>BUTTON:</th>
              </tr>
            </thead>
            <tbody>
              {host.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No User found
                  </td>
                </tr>
              ) : (
                host.map((host, index) => (
                  <tr key={host.id}>
                    <td>{index + 1}</td>
                    <td>
                      {" "}
                      {host.profileImage ? (
                        <img
                          className="image"
                          src={`${ApiEndPoint.baseUrl}${host.profileImage}`}
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>{host.name}</td>
                    <td>{host.Email}</td>
                    <td>{host.phoneNumber}</td>
                    <td>{host.location}</td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => deleteHost(host.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="btn-view"
                        onClick={() => navigate(`/host/view/${host.id}`)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="btn-view"
                        onClick={() => navigate(`/host/edit/${host.id}`)}
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
export default HostList;
