import {
  LayoutDashboard,
  User,
  Layers,
  Download,
  TrendingUp,
  UserPlus,
  Server
} from "lucide-react";
import {Link} from "react-router-dom";
import './SideBar.css';
function SideBar()
{
    
     return(
        <>
        <div className="sideBar-container">
            <ul>
               <li><LayoutDashboard size={18}/><Link to="/Dash">DashBoard</Link></li>
               <li><User size={18}/><Link to="/UserProfile">User Profile</Link></li>
               <li><Layers size={18}/><Link to="/booking">Booking</Link></li>
               <li><Server size ={18}/>HOST</li>
               <li><UserPlus size={18}/><Link to="/subList">Subscription</Link></li>
               <li><TrendingUp size={18}/><Link to="/FaqList">FAQ</Link></li>
                <li><Download size={18}/>Message</li>
                <li><Layers size={18}/>Orders</li>
            </ul>
        </div>
        </>
     )
}

export default SideBar;