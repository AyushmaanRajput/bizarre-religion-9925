import {
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorModeValue,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
  } from "@chakra-ui/react";
  import { BellIcon } from "@chakra-ui/icons";
  
  const NotificationsDropdown = ({ notifications,element }) => {
    const sortedNotifications = notifications.slice().reverse(); // Reverse chronological order
    let background = useColorModeValue("gray.100", "gray.700");
  
    return (
      <Popover placement="bottom-end">
        <PopoverTrigger>
          {element}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Notifications</PopoverHeader>
          <PopoverBody>
            <Stack spacing={1}>
              {sortedNotifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  justifyContent="space-between"
                  _hover={{
                    bg: background,
                  }}
                  fontWeight={notification.status === "unread" ? "bold" : "normal"}
                >
                  <Text>{notification.message}</Text>
                  <Text fontSize="sm">{notification.date}</Text>
                </MenuItem>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };
  
  export default NotificationsDropdown;
  