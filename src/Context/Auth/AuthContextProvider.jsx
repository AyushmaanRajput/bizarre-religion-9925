import { getUsers, getSubscriptions } from "../../Api/getData";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  let localUser = JSON.parse(localStorage.getItem("user"));
  let [users, setUsers] = useState([]);
  let [subscriptions, setSubscriptions] = useState([]);
  let [isAuth, setAuth] = useState(
    JSON.parse(localStorage.getItem("user")) ? true : false
  );
  let [loggedInUser, setLoggedInUser] = useState(localUser || {});
  let [activeTab, setActiveTabFunc] = useState(null);
  // console.log(localStorage.getItem("user"));

  useEffect(() => {
    populateUsers();
    populateSubscriptions();
  }, []);

  function populateUsers() {
    getUsers()
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
        if (localUser) {
          for (let i = 0; i < res.data.length; i++) {
            if (localUser.id === res.data[i].id) {
              setLoggedInUser(res.data[i]);
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }

  function populateSubscriptions() {
    getSubscriptions()
      .then((res) => setSubscriptions(res.data))
      .catch((err) => console.log(err));
  }

  function getUser(id) {
    for (let i = 0; i < users.length; i++) {
      if (id === users[i].id) {
        return users[i];
      }
    }
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
        getUser,
        subscriptions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
