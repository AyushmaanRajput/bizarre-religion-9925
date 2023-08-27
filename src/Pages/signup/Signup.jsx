import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Select,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Logo from "../../Components/Logo";
import { OAuthButtonGroup } from "../login/OAuthButtonGroup";
import { PasswordField } from "../login/PasswordField";
import AvatarSelector from "./AvatarSelector";
import { postNewUser } from "../../Api/postData";

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

let Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [gender, setGender] = useState("");
  let [avatarNum, setAvatarNum] = useState(1);
  let [finCoin, setFinCoin] = useState(100);
  let [mobile, setMobile] = useState(null);
  let [balance, setBalance] = useState(0);
  let [contacts, setContacts] = useState([]);
  let [transactions, setTransactions] = useState([]);
  let [notifications, setNotifications] = useState([]);
  let [subscriptions, setSubscriptions] = useState([]);
  let [monthlyIncomeExpenses, setmonthlyIncomeExpenses] = useState([]);

  function onSubmitHandler(e) {
    e.preventDefault();
    let newUserObj = {
      name: name,
      email: email,
      password: password,
      avatarNum: avatarNum,
      finCoin: finCoin,
      mobile: +mobile,
      gender: gender,
      balance: balance,
      contacts: contacts,
      transactions: transactions,
      notifications: notifications,
      subscriptions: subscriptions,
      monthlyIncomeExpenses: monthlyIncomeExpenses,
    };
    // console.log(newUserObj);
    postNewUser(newUserObj)
      .then((res) => {
        console.log(res);
        toast({
          title: "Account Created",
          description: "You account is created",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Account Created",
          description: "You account is created",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });

    setName("");
    setAvatarNum(1);
    setEmail("");
    setPassword("");
    setMobile("");
    setGender("");
  }

  function changePassword(value) {
    setPassword(value);
  }

  const handleAvatarSelect = (selectedAvatar) => {
    // Handle the selected avatar
    console.log("Selected Avatar:", selectedAvatar);
    let ind = avatars.indexOf(selectedAvatar) + 1;
    console.log(ind);
    setAvatarNum(ind + 1);
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: "xs",
                md: "sm",
              }}
            >
              Create A New Account
            </Heading>
            <Text color="fg.muted">
              Already have an account?{" "}
              <Link href="/" color="brand.500">
                Log In
              </Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "bg.surface",
          }}
          // boxShadow={{
          //   base: 'none',
          //   sm: 'md',
          // }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
          boxShadow="xl"
        >
          <form onSubmit={onSubmitHandler}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl display="flex" justifyContent="center">
                  <AvatarSelector
                    avatars={avatars}
                    onSelect={handleAvatarSelect}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <PasswordField
                  changePassword={changePassword}
                  value={password}
                />
                <FormControl>
                  <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="+91" />
                    <Input
                      id="mobile"
                      type="tel" // Use "tel" type for phone numbers
                      value={mobile}
                      onChange={(e) => {
                        // Remove non-numeric characters and limit to 10 digits
                        const formattedMobile = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setMobile(formattedMobile);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </FormControl>
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
              </HStack>
              <Stack spacing="6">
                <Button colorScheme="brand" type="submit">
                  Sign up
                </Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Signup;
