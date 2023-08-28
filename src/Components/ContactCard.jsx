import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Flex,
  Spacer,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../Context/Auth/AuthContextProvider";
import { createMessage } from "../Api/notification";
import axios from "axios";

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

export default function ContactCard({ contact }) {
  const toast = useToast();
  const { name, email, mobile, avatarNum } = contact;
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [message, setMessage] = useState("");

  let user = useContext(AuthContext).loggedInUser;

  const initialRef = useRef(null);
  // console.log(contact);

  function handleSubmit(e) {
    e.preventDefault();

    let newNotify = createMessage(
      user.name,
      message,
      new Date().toISOString(),
      contact.notifications
    );
    console.log(newNotify);
    let updatedReceiver = {
      ...contact,
      notifications: newNotify,
    };

    postUserUpdate(updatedReceiver);
    setMessage("");
  }
  async function postUserUpdate(user) {
    try {
      let id = user.id;
      let res = await axios.put(
        `https://mock-api-finpay.onrender.com/users/${id}`,
        user
      );
      console.log(res.data); // Assuming the server responds with the updated user object
      toast({
        title: "Message Sent",
        description: `Message sent to ${user.name}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={avatars[avatarNum - 1]} // Replace with the actual avatar URL pattern
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
          borderWidth={1}
          borderColor="brand.500"
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {email}
        </Text>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {mobile}
        </Text>

        <Stack
          display="flex"
          justifyContent="center"
          mt={8}
          direction={"row"}
          spacing={4}
        >
          <Button
            flex={0.45}
            fontSize={"sm"}
            rounded={"full"}
            bg={"brand.600"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "brand.500",
            }}
            _focus={{
              bg: "brand.500",
            }}
            onClick={onOpen}
          >
            Message
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Message :</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel>To : {name}</FormLabel>
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Message :</FormLabel>
                    <Textarea
                      mb={6}
                      required
                      placeholder="Enter you message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </FormControl>
                  <Flex>
                    <Spacer></Spacer>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button colorScheme="brand" ml={3} type="submit">
                      Send Message
                    </Button>
                  </Flex>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Stack>
      </Box>
    </Center>
  );
}
