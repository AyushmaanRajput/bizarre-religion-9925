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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import Logo from "../../Components/Logo";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { PasswordField } from "./PasswordField";
import { AuthContext } from "../../Context/Auth/AuthContextProvider";

let Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  let authContext = useContext(AuthContext);
  let users = authContext.users;
  let setLoggedInUser = authContext.setLoggedInUser;
  // console.log(users);
  let setAuth = authContext.setAuth;
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function onSubmitHandler(e) {
    e.preventDefault();
    // console.log(email, password);
    console.log(users);
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
        localStorage.setItem("user", JSON.stringify(users[i]));
        setLoggedInUser(users[i]);
        toast({
          title: "Login Successfull",
          description: "You Have successfully Logged In!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setAuth(true);
        navigate("/");
        return;
      }
    }
    localStorage.removeItem("user");
    setAuth(false);
    toast({
      title: "Incorrect Credentials",
      description: "Re-check your Credentials or Try Again Later!",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    setEmail("");
    setPassword("");
  }

  function changePassword(value) {
    setPassword(value);
  }

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
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account?{" "}
              <Link href="/signup" color="brand.500">
                Sign up
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
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="text" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button colorScheme="brand" type="submit">
                  Log in
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

export default Login;
