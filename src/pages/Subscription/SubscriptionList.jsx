import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useApi from "../../components/useApi";
import ApiEndPoint from "../../components/ApiEndPoint";
import { Trash2, Eye ,PencilIcon} from "lucide-react";
import "./Subscription.css";

function SubscriptionList() {
  const [sub, setSub] = useState([]);
  const { postData } = useApi();
  const navigate = useNavigate();
   const subscription={
        0:"weekly",
        1:"monthly",
        2:"yearly"
       }
  const subList = async () => {
    try {
      
      const response = await postData(ApiEndPoint.fetchSubscription);
      console.log(response);
      if (response.message == "SUBSCRIPTION FETCH!") {
        setSub(response.sub);
        Swal.fire({
          icon: "success",
          title: "SUCCESSFULLY!",
          text: "subscription fetch",
        });
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
        text: "ERROR!",
      });
    }
  };

  const SubscriptionDelete=async(id)=>
  {
    const result = await Swal.fire({
    title: "Are you sure?",
    text: "This subscription will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;
    try
    {
      console.log(id)
        const deleteSub=await postData(ApiEndPoint.subscriptionDeleted,{id})
        console.log(deleteSub)
        if(deleteSub.message == "SUBSCRIPTION DELETED!")
        {
            Swal.fire({
                icon:"success",
                title:"SUCCESSFULLY!",
                text:deleteSub.message
            })
             setSub(prev =>
        prev.filter(item=> item.id !== id)
      );
        }
        else
        {
             Swal.fire({
                icon:"error",
                title:"error",
                text:deleteSub.message
             })
        }
    }
    catch(error)
    {
        Swal.fire({
            icon:"error",
            title:"ERROR!",
            text:"SERVER ERROR"
        })
    }
  };
  useEffect(() => {
    subList();
  }, []);
  return (
    <>
      <div className="subscription-container">
        <div className="subscriptionData-container">
          <h1>SUBSCRIPTION!</h1>
          <button className="add-btn" onClick={()=>navigate('/subCreate')}>+ADD</button>
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Description</th>
              <th>subscriptionType</th>
              <th>Button:</th>
            </tr>
          </thead>
          <tbody>
            {sub.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No User found
                </td>
              </tr>
            ) : (
              sub.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.Amount}</td>
                  <td>{item.description}</td>
                <td>{subscription[item.subscriptionType] || "Unknown"}</td>
                  <td>
                    <button className="btn-delete" onClick={() => SubscriptionDelete(item.id)}>
                      <Trash2 size={18} />
                    </button>
                    <button className="btn-view" onClick={()=>navigate(`/Subscription/View/${item.id}`)}>
                      <Eye size={18} />
                    </button>
                    <button className="btn-edit" onClick={()=>navigate(`/Subscription/Edit/${item.id}`)}>
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

export default SubscriptionList;
