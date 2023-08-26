import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

import CustomOption from "./CustomOption";

const avatars = [
  "/avatars/Asian Man.png",
  "/avatars/Black Lady.png",
  "/avatars/Black Man.png",
  "/avatars/College Student.png",
  "/avatars/Indian Man.png",
  "/avatars/Middle Eastern Lady.png",
  "/avatars/Old Man.png",
  "/avatars/Western Man.png",
  "/avatars/White Lady.png",
  "/avatars/Young Lady.png",
];

let SendMoneyForm = ({ user }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <Container
      maxW="lg"
      p={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <form>
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="contact">To :</FormLabel>
              <Box>
                <Menu>
                  <MenuButton
                    as={Box}
                    display="block"
                    width="100%"
                    border="1px"
                    borderRadius="md"
                    px={4}
                    py={2}
                  >
                    {selectedContact ? (
                      <CustomOption
                        avatars={avatars}
                        contact={selectedContact}
                      />
                    ) : (
                      "Select Contact"
                    )}
                  </MenuButton>
                  <MenuList width="100%">
                    {user.contacts.map((contact) => (
                      <MenuItem
                        key={contact.id}
                        onClick={() => handleContactSelect(contact)}
                        width="21rem"
                      >
                        <CustomOption avatars={avatars} contact={contact} />
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <InputLeftAddon children="₹" />
                <Input type="number" placeholder="Enter Amount" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Message(Optional)</FormLabel>
              <Textarea  placeholder="Give some message..."></Textarea>
            </FormControl>
          </Stack>
        </form>
      </Stack>
      <Divider />
    </Container>
  );
};

export default SendMoneyForm;
