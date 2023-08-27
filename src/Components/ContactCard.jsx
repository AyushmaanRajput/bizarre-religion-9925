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
} from "@chakra-ui/react";

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
  const { name, email, mobile, avatarNum } = contact;

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
          >
            Message
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
