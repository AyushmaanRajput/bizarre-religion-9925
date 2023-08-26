import { Flex, Spacer, Text, Highlight } from "@chakra-ui/react";

import Actions from "./Actions";
import Transactions from "./Transactions";
import FinancialOverview from "./FinancialOverview";
import UpcomingExpenses from "./UpcomingExpenses";

import { AuthContext } from "../../Context/Auth/AuthContextProvider";

import { useContext } from "react";

let Home = () => {
  let user = useContext(AuthContext).loggedInUser;
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
      <Actions></Actions>
      <Transactions user={user}></Transactions>
      <FinancialOverview></FinancialOverview>
      <UpcomingExpenses></UpcomingExpenses>
    </Flex>
  );
};

export default Home;
