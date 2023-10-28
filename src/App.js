import React, { useContext,useEffect } from 'react';
import { UserContext } from 'UserContext';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'; // Import the useAuthState hook
import { auth } from "FirebaseConfig/firebaseConfig";// Import your Firebase auth instance

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Login from "views/Login"; // Import the Login component
import Loading from 'views/Loading';
import { getUserData } from 'FirebaseConfig/firebaseHelper';

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

const App = () => {
  const [user, loading, error] = useAuthState(auth); // Use the useAuthState hook to manage the authentication state
  const { setStationName,userData,setUserData } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {

    await getUserData().then((data)=>{
      setUserData(data)
    })
    };

    document.title = "HHAL-Admin"
    if(!userData){
      fetchData()
    }
 }, [setUserData, user, userData]);



  return (
    
    <ThemeContextWrapper>
      <BackgroundColorWrapper> 
        {loading?<Loading/>:
          <>
        <BrowserRouter>
          <Routes>
         
            <Route
              path="/login"
              element={user ? <Navigate to="/admin/dashboard" /> : <Login />}
            />
            {user ? (
              <>
              <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/rtl/*" element={<RTLLayout />} />
                <Route
                  path="*"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
                
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </BrowserRouter>
            </>
          }
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
};

export default App;
