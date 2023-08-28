import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  PopoverCloseButton,
  PopoverArrow,
  PopoverHeader,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Popover,
  Stack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiUserPlus,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

import NotificationsDropdown from "./NotificationsDropdown";
import Logo from "./Logo";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../Context/Auth/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Home", icon: FiHome },
  { name: "Requests", icon: FiCompass },
  { name: "Contacts", icon: FiUserPlus },
  { name: "Settings", icon: FiSettings },
];
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

const SidebarContent = ({ onClose, ...rest }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  let globalActiveTab = useContext(AuthContext).setActiveTabFunc;
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          tabName={link.name}
          isActive={activeTab === link.name}
          onClick={() => {
            globalActiveTab(link.name);
            handleTabClick(link.name);
          }}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, tabName, children, isActive, onClick }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        my="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "brand.500",
          color: "white",
        }}
        bg={isActive ? "brand.500" : "white"}
        color={isActive ? "white" : "gray.800"}
        onClick={onClick}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  let user = useContext(AuthContext).loggedInUser;
  let setAuth = useContext(AuthContext).setAuth;
  let avatarNum = user.avatarNum;
  let notifications = user.notifications;
  const navigate = useNavigate();

  const sortedNotifications = notifications.slice().reverse(); // Reverse chronological order
  let background = useColorModeValue("gray.100", "gray.700");

  function logOutHandler() {
    setAuth(false);
    localStorage.removeItem("user");
    navigate("/login");
  }
  const formatDateTime = (dateTimeString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Logo display={{ base: "flex", md: "none" }} />

      <HStack spacing={{ base: "0", md: "6" }} position="relative">
        <div>
          <Popover>
            <PopoverTrigger>
              <IconButton
                as={FiBell}
                variant="ghost"
                colorScheme="gray"
                size="md"
                p={2}
              />
            </PopoverTrigger>
            <PopoverContent position="absolute" right="-10" top="55px">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Notifications</PopoverHeader>
              <PopoverBody>
                <Stack spacing={1}>
                  {sortedNotifications.map((notification) => (
                    <Box
                      key={notification.id}
                      p={2}
                      borderBottomWidth="1px"
                      _hover={{
                        bg: background,
                      }}
                      fontWeight={
                        notification.status === "unread" ? "bold" : "normal"
                      }
                    >
                      <Text>{notification.message}</Text>
                      <Text fontSize="sm">{formatDateTime(notification.date)}</Text>
                    </Box>
                  ))}
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"md"}
                  src={avatars[avatarNum - 1]}
                  borderWidth={1}
                  borderColor="brand.500"
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.name}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logOutHandler}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Sidebar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
