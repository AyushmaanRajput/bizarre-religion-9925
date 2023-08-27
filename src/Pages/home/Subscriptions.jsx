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
    <>
      <Text fontSize="4xl">Your Subscriptions</Text>
      <Flex>
        <VStack spacing={4} align="stretch">
          <Accordion allowToggle>
            {loggedInUser.subscriptions.map((subscription) => (
              <AccordionItem key={subscription.id}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "brand.500", color: "white" }}
                    _hover={{ bg: "brand.300", color: "white" }}
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
            padding={4}
            marginLeft={4}
            width="50%"
          >
            <Text fontSize="xl">Details for {selectedSubscription.name}</Text>
            <Text>Type: {selectedSubscription.type}</Text>
            <Text>Description: {selectedSubscription.description}</Text>
            <Text>Price: ${selectedSubscription.price}</Text>
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
    </>
  );
};

export default Subscriptions;
