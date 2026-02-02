import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import { Trash2, Eye, PencilIcon } from "lucide-react";
import "./booking.css";
function BookingProfile() {
  const [booking, setbooking] = useState([]);
  const { postData } = useApi();
  const navigate = useNavigate();
  const meeting=
  {
    1:"OFFICE",
    2:"ONLINE"
  }
  const bookingData = async () => {
    try {
      const response = await postData(ApiEndPoint.fetchBooking);
      console.log(response);
      setbooking(response.booking);
      if (!response) {
        Swal.fire({
          icon: "error",
          text: "ERROR WHILE FETCHING DATA",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "ERROR!",
      });
    }
  };
  const DeleteBooking = async (id) => {
    try {
      const response = await postData(ApiEndPoint.deleteBooking, { id });
      console.log(response);

      if (response.message === "BOOKING DELETED") {
        Swal.fire({
          icon: "success",
          text: "Booking deleted successfully",
        });

        setbooking((prev) => prev.filter((item) => item.id !== id));
      } else {
        Swal.fire({
          icon: "error",
          text: "Failed to delete booking",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Server error!",
      });
    }
  };
  useEffect(() => {
    bookingData();
  }, []);
  return (
    <>
      <div className="booking-container">
        <table>
          <thead>
            <tr>
              <th>providerId</th>
              <th>activityID</th>
              <th>DateandTime</th>
              <th>duration</th>
              <th>meetingType</th>
              <th> location</th>
              <th> comment</th>
              <th>Button:</th>
            </tr>
          </thead>
          <tbody>
            {booking.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No booking found
                </td>
              </tr>
            ) : (
              booking.map((item, index) => (
                <tr key={index}>
                  <td>{item.providerId}</td>
                  <td>{item.activityId}</td>
                  <td>{item.DateandTime}</td>
                  <td>{item.duration}</td>
                   <td>{meeting[item.meetingType] || "Unknown"}</td>
                  <td>{item.location}</td>
                  <td>{item.comment}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => DeleteBooking(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/booking/View/${item.id}`)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="addbooking-btn"
                      onClick={() => navigate(`/booking/Update/${item.id}`)}
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
    </>
  );
}
export default BookingProfile;
