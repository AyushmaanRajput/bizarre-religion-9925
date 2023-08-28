import React from "react";
import { Text, Box, SimpleGrid, Card } from "@chakra-ui/react";
import IncomeExpenses from "../../Components/IncomeExpenses";
import IncomeExpensesBarChart from "../../Components/IncomeExpensesBarChart";

const FinancialOverview = () => {
  return (
    <Box width='100%' mb={12}>
      <Text fontSize="4xl" mb={4}>
        Financial Overview
      </Text>
      <Box
        width="100%"
        px={8}
        py={12}
        backgroundColor="white"
        borderRadius={8}
        boxShadow="xl"
        mb={6}
      >
        <IncomeExpenses />
      </Box>
      <Box
        width="100%"
        px={8}
        py={12}
        backgroundColor="white"
        borderRadius={8}
        boxShadow="xl"
      >
        <IncomeExpensesBarChart />
      </Box>
    </Box>
  );
};

export default FinancialOverview;
