import { useContext } from "react";

import Sidebar from "../../Components/Sidebar";
import { AuthContext } from "../../Context/Auth/AuthContextProvider";
import Home from "../home/Home";
import Explore from "../explore/Explore";
import Settings from '../settings/Settings';
import Contacts from '../contacts/Contacts';

const Dashboard = () => {
  let activeTabName = useContext(AuthContext).activeTab;
  console.log(activeTabName);
  return (
    <Sidebar>
      {activeTabName === "Home" || activeTabName == null ? (
        <Home />
      ) : activeTabName == "Requests" ? (
        <Explore />
      ) : activeTabName == "Contacts" ? (
        <Contacts />
      ) : (
        <Settings />
      )}
    </Sidebar>
  );
};

export default Dashboard;
