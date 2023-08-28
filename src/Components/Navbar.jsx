import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <Box>
      <Flex
        borderBottom="1px"
        borderColor="gray.200"
        align="center"
        justify="space-between"
        p={4}
        mx="auto"
        maxW="3xl"
      >
        <Logo />
        <Link as={RouterLink} to="/login">
          Login
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
