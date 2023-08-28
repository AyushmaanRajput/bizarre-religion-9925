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
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/Auth/AuthContextProvider";
import { createNotification } from "../Api/notification";

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

let SendMoneyForm = ({ user, onClose, fetchUserHandler }) => {
  const getUserFunc = useContext(AuthContext).getUser;
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const toast = useToast();

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  function submitHandler(e) {
    e.preventDefault();
    let contact = getUserFunc(selectedContact.id);
    let details = {
      amount: Number(amount),
      date: new Date().toISOString(),
      sender: user,
      receiver: contact,
      message: message,
    };
    createTransactions(details);
    onClose();
  }

  const createTransactions = async (details) => {
    try {
      let senderTransaction = {
        id: details.sender.transactions.length + 1,
        amount: -details.amount,
        date: details.date,
        type: "outgoing",
        status: "completed",
        contact: {
          id: details.receiver.id,
          name: details.receiver.name,
          email: details.receiver.email,
        },
      };

      let receiverTransaction = {
        id: details.receiver.transactions.length + 1,
        amount: +details.amount,
        date: details.date,
        type: "incoming",
        status: "completed",
        contact: {
          id: details.sender.id,
          name: details.sender.name,
          email: details.sender.email,
        },
      };
      let monthlyIncomeExpenses = [...details.sender.monthlyIncomeExpenses];
      let first = monthlyIncomeExpenses[0];
      first.expenses += +details.amount;
      console.log(monthlyIncomeExpenses);

      let updatedSender = {
        ...details.sender,
        finCoin: details.sender.finCoin + 20,
        balance: Number(details.sender.balance) - details.amount,
        transactions: [...details.sender.transactions, senderTransaction],
        monthlyIncomeExpenses: monthlyIncomeExpenses,
      };
      let newNotify = createNotification(
        details.amount,
        message,
        details.date,
        details.receiver.notifications
      );
      let monthlyIncomeExpensesRec = [
        ...details.receiver.monthlyIncomeExpenses,
      ];
      let first2 = monthlyIncomeExpensesRec[0];
      first2.income += +details.amount;
      console.log(monthlyIncomeExpensesRec);

      let updatedReceiver = {
        ...details.receiver,
        finCoin: details.receiver.finCoin + 20,
        balance: Number(details.receiver.balance) + details.amount,
        transactions: [...details.receiver.transactions, receiverTransaction],
        notifications: newNotify,
        monthlyIncomeExpenses: monthlyIncomeExpensesRec,
      };

      await Promise.all([
        postUserUpdate(updatedSender),
        postUserUpdate(updatedReceiver),
        postGlobalTransaction({
          from: details.sender.name,
          to: details.receiver.name,
          amount: +details.amount,
          message: details.message,
          date: details.date,
        }),
      ]).finally(() => {
        toast({
          title: "Payment Successfull",
          description: `Your Payment of ₹${amount} was successfull`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchUserHandler(user.id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  async function postUserUpdate(user) {
    try {
      let id = user.id;
      let res = await axios.put(
        `https://mock-api-finpay.onrender.com/users/${id}`,
        user
      );
      console.log(res.data); // Assuming the server responds with the updated user object
    } catch (err) {
      console.log(err);
    }
  }

  async function postGlobalTransaction(obj) {
    try {
      let res = await axios.post(
        `https://mock-api-finpay.onrender.com/transactions`,
        obj
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container
      maxW="lg"
      p={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <form onSubmit={submitHandler}>
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
              <FormLabel>Amount :</FormLabel>
              <InputGroup>
                <InputLeftAddon children="₹" />
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Message(Optional) :</FormLabel>
              <Textarea
                placeholder="Give some message..."
                onChange={(e) => setMessage(e.target.value)}
              ></Textarea>
            </FormControl>
            <Button type="submit" colorScheme="brand" mt={4}>Pay Now</Button>
          </Stack>
        </form>
      </Stack>
      <Divider />
    </Container>
  );
};

export default SendMoneyForm;
