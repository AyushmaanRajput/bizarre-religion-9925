import { getUsers } from "../../Api/getData";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    populateUsers();
  }, []);

  function populateUsers() {
    getUsers()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  return;
  <AuthContext.Provider>{children}</AuthContext.Provider>;
};
