import { Box, Text } from "@chakra-ui/react";
import { TbTransferIn } from "react-icons/tb";
import { useContext } from "react";

import PaymentModal from "./PaymentModal";
import { useDisclosure } from "@chakra-ui/react";
import { AuthContext } from "../Context/Auth/AuthContextProvider";

let ActionCard = ({ type,fetchUserHandler }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useContext(AuthContext).loggedInUser;
  return (
    <>
      <Box
        onClick={onOpen}
        bg="white"
        p={6}
        borderRadius="2xl"
        boxShadow="md"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        colorScheme="brand.500"
        cursor="pointer"
        transition="transform 0.2s, box-shadow 0.2s" // Adding a smooth transition effect
        _hover={{
          transform: "scale(1.005)", // Enlarge on hover
          boxShadow: "lg", // Add a shadow on hover
        }}
      >
        <TbTransferIn size={28} color="brand.500"></TbTransferIn>
        <Text fontSize="xl" fontWeight="medium">
          {type}
        </Text>
      </Box>
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        type={type}
        user={user}
        fetchUserHandler={fetchUserHandler}
      ></PaymentModal>
    </>
  );
};

export default ActionCard;
