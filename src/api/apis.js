
const BASE_URL = process.env.REACT_APP_BASE_URL + "/eventbookingweb";
console.log(BASE_URL);


export const endpoints = {
  SENDOTP_API: BASE_URL + "/generateotp",//tested
  SIGNUP_API: BASE_URL + "/signup",//tested
  LOGIN_API: BASE_URL + "/login",//tested
  RESETPASSTOKEN_API: BASE_URL + "/resetpassword",//tested
  RESETPASSWORD_API: BASE_URL + "/resetpassword",//tested
}

export const userendpoints = {
  USER_INFO_API : BASE_URL +  "/user",//tested
  UPDATE_PROFILE : BASE_URL + "/user/updateProfile",
  USER_EVENT_API :BASE_URL + "/event/attendeeDashboard"
}


export const organiserendpoints = {
  ORGANISER_CREATE_EVENT  : BASE_URL + "/event/create",//tested
  ORGANISER_EVENT_API : BASE_URL + "/event/organiserDashboard",//tested
}

export const adminendpoints = {
  BLOCK_USER_API : BASE_URL + "/user/block",
  UNBLOCK_USER_API : BASE_URL + "/user/unblock",
  GET_ALL_ORGANISER_API : BASE_URL + "/user/organiser",
  GET_ALL_ATTENDEE_API : BASE_URL + "/user/attendee",
}

export const eventsendpoints = {
  GET_ALL_EVENT : BASE_URL + '/event',
  GET_EVENT_BY_ID : BASE_URL + "/eventById"//tested
}
export const commentendpoints = {
  COMMENT_PREV : BASE_URL + "/eventComment"//tested
}
export const ticketendpoint = {
  ticket_api : BASE_URL + "/ticket"//tested
}

export const paymentendpoints = {
  CreateOrder : BASE_URL + "/payment",
  Verify_Payment : BASE_URL + "/payment/verify"
}