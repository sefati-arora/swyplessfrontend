const API_BASE_URL='http://localhost:4000';

const ApiEndPoint=
{
     baseUrl:`${API_BASE_URL}`,
     adminLogin:`${API_BASE_URL}/api/adminLogin`,
     adminProfile:`${API_BASE_URL}/api/adminProfile`,
     EditAdminProfile:`${API_BASE_URL}/api/EditAdminProfile`,
     adminAccountDeleted:`${API_BASE_URL}/api/adminAccountDeleted`,
     faqAndHelp:`${API_BASE_URL}/api/faqAndHelp`,
     subscriptionCreated:`${API_BASE_URL}/api/subscriptionCreated`,
     subscriptionEdit:`${API_BASE_URL}/api/subscriptionEdit`,
     subscriptionDeleted:`${API_BASE_URL}/api/subscriptionDeleted`,
     userFetch:`${API_BASE_URL}/api/userFetch`,
     editUserProfile:`${API_BASE_URL}/api/editUserProfile`,
     deleteUserProfile:`${API_BASE_URL}/api/deleteUserProfile`,
     fetchBooking:`${API_BASE_URL}/api/fetchBooking`,
     viewBooking:`${API_BASE_URL}/api/viewBooking`,
     deleteBooking:`${API_BASE_URL}/api/deleteBooking`,
     updateBooking:`${API_BASE_URL}/api/updateBooking`,
     hostFetch:`${API_BASE_URL}/api/hostFetch`,
     dashBoardDetails:`${API_BASE_URL}/api/dashBoardDetails`,
     userView:`${API_BASE_URL}/api/userView`,
     fetchSubscription:`${API_BASE_URL}/api/fetchSubscription`,
     SubscriptionView:`${API_BASE_URL}/api/SubscriptionView`,
     faqEdit:`${API_BASE_URL}/api/faqEdit`,
     faqDeleted:`${API_BASE_URL}/api/faqDeleted`,
     fetchFaq:`${API_BASE_URL}/api/fetchFaq`,
     faqView:`${API_BASE_URL}/api/faqView`
}
export default ApiEndPoint;