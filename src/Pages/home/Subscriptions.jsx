import React, { useContext, useState } from "react";
import {
  Box,
  Text,
  Flex,
  VStack,
  AccordionButton,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { AuthContext } from "../../Context/Auth/AuthContextProvider";

const Subscriptions = () => {
  const { loggedInUser, subscriptions } = useContext(AuthContext);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleSubscriptionClick = (subscription) => {
    const matchingGlobalSubscription = subscriptions.find(
      (globalSub) => globalSub.name === subscription.name
    );
    setSelectedSubscription(matchingGlobalSubscription);
  };

  return (
    <Box py={12}>
      <Text fontSize="4xl" mb={8}>Your Subscriptions</Text>
      <Flex background='white' flexDirection="column" borderRadius={8} p={12} justifyContent={"space-between"} boxShadow='2xl'>
        <VStack spacing={4} align="stretch" mb={8}>
          <Accordion allowToggle>
            {loggedInUser.subscriptions.map((subscription) => (
              <AccordionItem key={subscription.id}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "brand.500", color: "white" }}
                    _hover={{ bg: "gray.100", color: "black" }}
                    onClick={() => handleSubscriptionClick(subscription)}
                  >
                    <Box flex="1" textAlign="left">
                      {subscription.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <Text>Name: {subscription.name}</Text>
                  <Text>Amount: ₹{subscription.amount}</Text>
                  <Text>Date: {subscription.date}</Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>

        {selectedSubscription && (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            padding={8}
            marginLeft={4}
            flex={1}
          >
            <Text fontSize="2xl" mb={2}>Details For {selectedSubscription.name}</Text>
            <Text>Type: {selectedSubscription.type}</Text>
            <Text>Description: {selectedSubscription.description}</Text>
            <Text>Price: ₹{selectedSubscription.amount}</Text>
            <Text>Billing Cycle: {selectedSubscription.billing_cycle}</Text>
            <Text>Platform: {selectedSubscription.platform}</Text>
            <Text>Features:</Text>
            <ul>
              {selectedSubscription.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Subscriptions;
