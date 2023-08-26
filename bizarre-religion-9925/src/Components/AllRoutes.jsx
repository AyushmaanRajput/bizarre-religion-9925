import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthContext } from "../Context/Auth/AuthContextProvider";
import Login from "../Pages/login/Login";
import Signup from "../Pages/signup/Signup";
import Dashboard from "../Pages/dashboard/Dashboard";

export const AllRoutes = () => {
  let authContext = useContext(AuthContext);
  let isAuth = authContext.isAuth;
  return (
    <Routes>
      <Route path="/" element={isAuth ? <Dashboard /> : <Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
};
