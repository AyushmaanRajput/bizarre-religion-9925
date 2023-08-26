import { getUsers } from "../../Api/getData";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  let [users, setUsers] = useState([]);
  let [isAuth, setAuth] = useState(false);
  let [loggedInUser, setLoggedInUser] = useState({});
  let [activeTab, setActiveTabFunc] = useState(null);

  useEffect(() => {
    populateUsers();
  }, []);

  function populateUsers() {
    getUsers()
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <AuthContext.Provider
      value={{
        users,
        isAuth,
        setAuth,
        loggedInUser,
        setLoggedInUser,
        activeTab,
        setActiveTabFunc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
