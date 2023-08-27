import { Image, Box,Center } from "@chakra-ui/react";

let Logo = ({display}) => {
  return (
    <Box display={display} justifyContent="center">
      <Image src='/Logo.png' alt="FinPay Logo" />
    </Box>
  );
};

export default Logo;
