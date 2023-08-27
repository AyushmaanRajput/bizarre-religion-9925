import React from 'react';
import {
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Box,
} from '@chakra-ui/react';

const LearnMore = () => {
  return (
    <Container maxW="2xl" py={16}>
      <VStack spacing={6} align="start">
        <Heading as="h1" size="2xl">
          About FinPay
        </Heading>
        <Divider />
        <Text fontSize="lg">
          FinPay is a cutting-edge finance management application that empowers individuals and businesses to take control of their financial journey. With a focus on simplicity and usability, FinPay offers a wide range of features designed to help users effectively manage their finances.
        </Text>
        <Text fontSize="lg">
          Key Features:
        </Text>
        <Box pl={6}>
          <Text>- Expense Tracking: Easily monitor your spending habits and track expenses in real-time.</Text>
          <Text>- Budget Planning: Create and manage budgets to achieve your financial goals.</Text>
          <Text>- Savings Goals: Set savings goals and track your progress towards achieving them.</Text>
          <Text>- Investment Insights: Get valuable insights and tips on smart investing.</Text>
          <Text>- Secure Transactions: Ensure your financial data is safe with our state-of-the-art security measures.</Text>
        </Box>
        <Text fontSize="lg">
          Whether you're an individual looking to improve your personal finances or a business aiming to streamline your financial operations, FinPay is here to provide you with the tools you need for financial success.
        </Text>
      </VStack>
    </Container>
  );
};

export default LearnMore;
