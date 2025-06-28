import { Routes, Route } from "react-router-dom";

import "./App.css";



import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./Utils/authUtils";


import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import HomePage from "./Pages/HomePage";
import Catalog from "./Pages/Catalog";
import AboutUs from "./Pages/AboutUs";
import DashBoard from "./Pages/DashBoard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SearchEvent from "./components/HomeComponent/SearchEvent";
import EventDetail from "./Pages/EventDetail";
import ContactUs from "./Pages/ContactUs";
import Error from "./Pages/Error"


import OpenRoute from "./components/auth/OpenRoute";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword"
import UpdatePassword from "./Pages/UpdatePassword";
import Editprofile from "./components/dashboard/Editprofile";


function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    // Check cookie & fetch user details if logged in
    dispatch(checkAuthStatus());
  }, []);


  return (
    <div className="flex flex-col text-white  min-h-screen">
      {/* Navbar (can be fixed or static) */}
      <Navbar />

      {/* Page content */}
      <div className="flex-grow  text-white mt-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs/>}/>
          <Route path="/searchEvent" element={<SearchEvent />} />
          <Route path="/event/:id" element={<EventDetail />} />

          <Route path="/login" element={
            <OpenRoute>
              <Login />
            </OpenRoute>
            } />

          <Route path="/signup" element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
            } />

           <Route path="verify-email"
           element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
            }
           /> 


          <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
          />  


          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />

          <Route
          path="/eventbookingweb/resetpassword/:token"
          element={
           
              <UpdatePassword />
          
          }
         /> 

         <Route path="/dashboard/edit-profile" element={
          <PrivateRoute>
            <Editprofile/>
          </PrivateRoute>
         }/>



          <Route path="*" element={<Error />} />
        </Routes>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
