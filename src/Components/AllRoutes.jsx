import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthContext } from "../Context/Auth/AuthContextProvider";
import Login from "../Pages/login/Login";
import Signup from "../Pages/signup/Signup";
import Dashboard from "../Pages/dashboard/Dashboard";
import LandingPage from "../Pages/landing/LandingPage";
import LearnMore from "../Pages/landing/LearnMore";

export const AllRoutes = () => {
  let authContext = useContext(AuthContext);
  let isAuth = authContext.isAuth;
  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <Dashboard /> : <LandingPage />}
      ></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/learn-more" element={<LearnMore />}></Route>
    </Routes>
  );
};
