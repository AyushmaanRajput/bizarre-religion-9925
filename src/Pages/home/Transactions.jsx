import { Box, Container, Divider, Text, Stack } from "@chakra-ui/react";

const formatDateTime = (dateTimeString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dateTimeString).toLocaleString(undefined, options);
};

const TransactionItem = ({ transaction, }) => {
  const transactionColor =
    transaction.type === "incoming" ? "brand.500" : "red.500";

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={2}
      boxShadow="md"
      bg="white"
    >
      <Text fontWeight="semibold" color={transactionColor} mb={2}>
        {transaction.type === "incoming" ? "Received" : "Sent"} ₹
        {Math.abs(transaction.amount)}
      </Text>
      <Text>Transaction ID: {transaction.id}</Text>
      <Text>Date and Time: {formatDateTime(transaction.date)}</Text>
      <Text>Contact: {transaction.contact.name}</Text>
    </Box>
  );
};

const Transactions = ({ user,fetchUserHandler }) => {
  const transactions = user.transactions.slice().reverse(); // Reverse the order
  return (
    <>
      <Stack
        spacing={1}
        py={{
          base: "8",
          md: "16",
        }}
      >
        <Text fontSize="4xl" mb={4}>Recent Transactions</Text>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </Stack>
    </>
  );
};

export default Transactions;
