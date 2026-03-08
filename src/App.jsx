import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Predict from "./pages/Predict";


import Contact from "./pages/Contact";

import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import HistoryPage from "./pages/HistoryPage";
import ApplicationDetails from "./pages/ApplicationDetails";
import Profile from "./pages/Profile";

function App() {

  const user = localStorage.getItem("user");

  return (

    <BrowserRouter>
    <ToastContainer  position="top-right"
        autoClose={3000}
        theme="colored"/>
      <Routes>

        {/* AUTH */}

        <Route path="/" element={user ? <Navigate to="/home"/> : <Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* APP LAYOUT */}

        <Route element={<Layout />}>

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/predict"
            element={
              <ProtectedRoute>
                <Predict />
              </ProtectedRoute>
            }
          />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
            <HistoryPage/>
            </ProtectedRoute>
          }
          />
          <Route
            path="/application/:id"
            element={
              <ProtectedRoute>
                <ApplicationDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;