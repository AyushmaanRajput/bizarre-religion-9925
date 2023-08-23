import { Route, Routes } from "react-router-dom";
import Login from "../Pages/login/Login";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
};
