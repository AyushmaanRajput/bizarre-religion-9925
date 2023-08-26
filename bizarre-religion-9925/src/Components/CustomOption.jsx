import { Flex, Text, Avatar, Spacer } from "@chakra-ui/react";

let CustomOption = ({ avatars, contact }) => {

  return (
    <Flex
      width="100%"
      alignItems="center"
      p={1}
    >
      <Avatar
        size="2xs"
        name={contact.name}
        src={avatars[contact.avatarNum - 1]}
      />
      <Text fontSize="sm" fontWeight="md" marginLeft={2}>
        {contact.name}
      </Text>
      <Spacer />
      <Text fontSize="md" fontWeight="semibold">
        {contact.mobile}
      </Text>
    </Flex>
  );
};

export default CustomOption;
