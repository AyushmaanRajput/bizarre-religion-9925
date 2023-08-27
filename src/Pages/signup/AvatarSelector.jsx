import { useState } from 'react';
import { Box, Grid, Image, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';

function AvatarSelector({ avatars, onSelect }) {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    onSelect(avatar); // Notify parent component about the selection
    setIsDropdownOpen(false);
  };

  return (
    <Popover
      placement="bottom"
      isOpen={isDropdownOpen}
      onOpen={() => setIsDropdownOpen(true)}
      onClose={() => setIsDropdownOpen(false)}
    >
      <PopoverTrigger>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          boxSize="112px" // Slightly larger to accommodate the outline
          borderRadius="50%" // Circular shape
          border="2px solid gray" // Outline
          title='Select Your Avatar'
        >
          <Image src={selectedAvatar} alt="Selected Avatar" boxSize="100px" borderRadius="50%" />
        </Box>
      </PopoverTrigger>
      <PopoverContent bg="gray.100" p={2} width="25rem"> {/* Set desired background color */}
        <PopoverBody>
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            {avatars.map((avatar, index) => (
              <Box
                key={index}
                onClick={() => handleAvatarClick(avatar)}
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg='white'
                borderRadius="8px" // Add border radius to images
                // border="1px solid gray" // Add a border
              >
                <Image src={avatar} alt={`Avatar ${index}`} boxSize="75px" />
              </Box>
            ))}
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default AvatarSelector;
