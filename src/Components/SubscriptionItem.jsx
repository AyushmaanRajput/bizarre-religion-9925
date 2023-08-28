import React from "react";
import { Checkbox, Box, Text } from "@chakra-ui/react";

const SubscriptionItem = ({ subscription, isSelected, onSelect }) => {
  return (
    <Box>
      <Checkbox isChecked={isSelected} onChange={() => onSelect(subscription)}>
        <Text>{subscription.name} - ${subscription.price}</Text>
      </Checkbox>
    </Box>
  );
};

export default SubscriptionItem;
