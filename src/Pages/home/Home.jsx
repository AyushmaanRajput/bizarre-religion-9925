import { Flex, Spacer, Text, Highlight } from "@chakra-ui/react";

import Actions from "./Actions";
import Transactions from "./Transactions";
import FinancialOverview from "./FinancialOverview";
import Subscriptions from "./Subscriptions";

import { AuthContext } from "../../Context/Auth/AuthContextProvider";

import { useContext, useState, useEffect } from "react";
import axios from "axios";

let Home = () => {
  let loggedInUser = useContext(AuthContext).loggedInUser;
  let monthlyIncomeExpenses = useContext(AuthContext).monthlyIncomeExpenses;
  let [user, setUser] = useState(loggedInUser);

  async function fetchUser(id) {
    console.log(id);
    try {
      let res = await axios.get(`https://mock-api-finpay.onrender.com/users/${id}`);
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Flex flexDirection="column" gap={2}>
      <Text
        fontSize="md"
        letterSpacing="1px"
        color="gray.500"
        textTransform="uppercase"
      >
        Total Balance
      </Text>
      <Text fontSize="4xl" mb={2} fontWeight="extrabold" color="gray.600">
        {`₹ ${user.balance}.00`}
      </Text>
      <Flex gap={4} mb={2}>
        <Text fontSize="sm" color="gray.500" textTransform="uppercase">
          <Text display="inline" fontWeight="semibold" mr={2} color="gray.800">
            {user.subscriptions.length}
          </Text>
          Purchases
        </Text>
        <Text fontSize="sm" color="gray.500" textTransform="uppercase">
          <Text display="inline" fontWeight="semibold" mr={2} color="gray.800">
            {user.transactions.length}
          </Text>
          transactions
        </Text>
      </Flex>
      <Actions fetchUserHandler={fetchUser}></Actions>
      <Transactions user={user} fetchUserHandler={fetchUser}></Transactions>
      <FinancialOverview></FinancialOverview>
      <Subscriptions></Subscriptions>
    </Flex>
  );
};

export default Home;
