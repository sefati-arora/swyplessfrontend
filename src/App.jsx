import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/LoginPage.jsx';
import Layout from './components/LayOutWrapper';
import DashBoard from './pages/DashBoard/DashBoard.jsx';
import AdminProfileComplete from './pages/AdminProfile/AdminProfileComplete.jsx';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import BookingProfile from './pages/booking/bookingProfile.jsx';
import UserProfileView from './pages/UserProfile/UserProfileView.jsx';
import BookingView from './pages/booking/BookingView.jsx';
import SubscriptionCreated from './pages/Subscription/SubscriptionMade.jsx';
import SubscriptionList from './pages/Subscription/SubscriptionList.jsx';
import SubscriptionView from './pages/Subscription/SubscriptionView.jsx';
import SubscriptionEdit from './pages/Subscription/SubscriptionEdit.jsx';
import FaqCreation from './pages/faq/faqCreated.jsx';
import FaqList from './pages/faq/FaqList.jsx';
import FaqEdit from './pages/faq/FaqEdit.jsx';
import FaqView from './pages/faq/faqView.jsx';
import BookingUpdate from './pages/booking/bookingUpdate.jsx';
import UserProfileEdit from './pages/UserProfile/UserEdit.jsx';
import HostList from './pages/Host/hostlist.jsx';
import HostView from './pages/Host/hostView.jsx';
import HostEdit from './pages/Host/hostEdit.jsx';
function App()
{
  return(
    <Routes>
   
      <Route path="/" element={<Login/>}/>
      
       <Route element={<Layout  />}>
         <Route path="/AdminProfile" element={<AdminProfileComplete/>}/>
         <Route path="/ProfileUpdate" element={<ProfileUpdate/>}/>
         <Route path="/UserProfile" element={<UserProfile/>}/>
         <Route path="/booking" element={<BookingProfile/>}/>
         <Route path="/user/View/:id" element={<UserProfileView/>}/>
         <Route path="/booking/view/:id" element={<BookingView/>}/>
         <Route path="/subCreate" element={<SubscriptionCreated/>}/>
         <Route path="/subList" element={<SubscriptionList/>}/>
         <Route path="/Subscription/View/:id" element={<SubscriptionView/>}/>
         <Route path="/Subscription/Edit/:id" element={<SubscriptionEdit/>}/>
         <Route path="/FaqList" element={<FaqList/>}/>
         <Route path="/faq" element={<FaqCreation/>}/>
         <Route path="/faq/Edit/:id" element={<FaqEdit/>}/>
         <Route path="/faq/view/:id" element={<FaqView/>}/>
         <Route path="/booking/Update/:id" element={<BookingUpdate/>}/>
         <Route path="/userprofile/Update/:id" element={<UserProfileEdit/>}/>
         <Route path="/hostlist" element={<HostList/>}/>
         <Route path="/host/view/:id" element={<HostView/>}/>
         <Route path="/host/edit/:id" element={<HostEdit/>}/>
       <Route path="/Dash" element={<DashBoard/>}/>
       </Route>
       
    </Routes>
  )
}
export default App;