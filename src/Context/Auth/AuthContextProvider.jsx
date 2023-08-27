import { getUsers, getSubscriptions } from "../../Api/getData";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  let [users, setUsers] = useState([]);
  let [subscriptions, setSubscriptions] = useState([]);
  let [isAuth, setAuth] = useState(false);
  let [loggedInUser, setLoggedInUser] = useState({});
  let [activeTab, setActiveTabFunc] = useState(null);

  useEffect(() => {
    populateUsers();
    populateSubscriptions();
  }, []);

  function populateUsers() {
    getUsers()
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
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
