import { AuthContext } from "../Context/Auth/AuthContextProvider";
import { useContext, useState } from "react";
import { Checkbox, Stack, Button, useToast } from "@chakra-ui/react";
import axios from "axios";

let Recharge = ({ user, onClose }) => {
  const toast = useToast();
  const userSubs = user.subscriptions;
  const globalSubs = useContext(AuthContext).subscriptions;
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);

  const handleSubscriptionSelect = (subscription) => {
    if (selectedSubscriptions.includes(subscription)) {
      setSelectedSubscriptions((prev) =>
        prev.filter((sub) => sub !== subscription)
      );
    } else {
      setSelectedSubscriptions((prev) => [...prev, subscription]);
    }
  };

  const handleRecharge = async () => {
    try {
      // Construct the list of subscription names to add
      const subscriptionNamesToAdd = selectedSubscriptions.map(
        (subscription) => {
          return {
            id: subscription.id,
            name: subscription.name,
            amount: subscription.amount,
            date: new Date().toISOString(),
          };
        }
      );

      // Find the subscription objects based on the names
      const subscriptionsToAdd = globalSubs.filter((subscription) =>
        subscriptionNamesToAdd.includes(subscription.name)
      );

      // Update user's subscriptions with the new subscriptions
      const updatedUserSubs = [...userSubs, ...subscriptionsToAdd];
      // console.log(updatedUserSubs);

      // Make API request to update user subscriptions
      const response = await axios.patch(
        `https://mock-api-finpay.onrender.com/users/${user.id}`,
        {
          subscriptions: updatedUserSubs,
        }
      );
      // console.log(response);
      // Check if the request was successful and handle accordingly
      if (response.status === 200) {
        console.log("Subscriptions updated successfully.");
        toast({
          title: "Subscription Added.",
          description: "A new subscription was added",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose(); // Close the modal after successful recharge
      } else {
        console.log("Subscriptions updated successfully.");
        toast({
          title: "Something went wrong",
          description: "There was an error updating the subscription.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        console.error("Failed to update subscriptions.");
      }
    } catch (error) {
      console.error("An error occurred while updating subscriptions:", error);
      toast({
        title: "Something went wrong",
        description: "There was an error updating the subscription.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  // Filter out subscriptions that the user is already subscribed to
  const availableSubscriptions = globalSubs.filter(
    (subscription) =>
      !userSubs.some((userSub) => userSub.name === subscription.name)
  );

  return (
    <Stack spacing={4}>
      <p>Select subscriptions to recharge:</p>
      {availableSubscriptions.map((subscription) => (
        <Checkbox
          key={subscription.id}
          isChecked={selectedSubscriptions.includes(subscription)}
          onChange={() => handleSubscriptionSelect(subscription)}
        >
          {subscription.name} - ${subscription.amount}
        </Checkbox>
      ))}
      <Button onClick={handleRecharge}>Recharge</Button>
    </Stack>
  );
};

export default Recharge;
