'use client';

import { useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const IconCredits = () => {
  const [showIconCredits, setShowIconCredits] = useState(false);

  return (
    <Box
      position="fixed"
      bottom="4"
      right="4"
      zIndex="50"
    >
      {/* Toggle Button */}
      <Text
        bg="rgba(255, 255, 255, 0.8)"
        px="3"
        py="1"
        borderRadius="md"
        cursor="pointer"
        userSelect="none"
        _hover={{ bg: "rgba(255, 255, 255, 1)" }}
        onClick={() => setShowIconCredits(!showIconCredits)}
        fontSize="xs"
        color="#333"
        fontWeight="600"
      >
        Icons by Flaticon {showIconCredits ? '▲' : '▼'}
      </Text>
      
      {/* Expandable Credits */}
      {showIconCredits && (
        <Box
          position="absolute"
          bottom="100%"
          right="0"
          mb="1"
          bg="rgba(255, 255, 255, 0.95)"
          backdropFilter="blur(8px)"
          borderRadius="lg"
          border="1px solid rgba(255, 255, 255, 0.3)"
          p="3"
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
          minW="280px"
          maxH="300px"
          overflowY="auto"
        >
          <Text
            fontSize="sm"
            color="#333"
            fontWeight="600"
            mb="2"
            textAlign="center"
          >
            Icon Credits
          </Text>
          <VStack gap="1" fontSize="xx-small" color="#666" align="stretch">
            <Text>
              <a href="https://www.flaticon.com/free-icons/luxury" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Luxury icons by gravisio - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/dinner-table" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Dinner table icons by Freepik - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/breakfast" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Breakfast icons by justicon - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/friends" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Friends icons by Freepik - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/old-car" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Old car icons by Freepik - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/romantic-dinner" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Romantic-dinner icons by Freepik - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/high-tea" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                High tea icons by Freepik - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/namaste" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Namaste icons by Freepik - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/location" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Location icons by Freepik - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/idea" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Idea icons by Good Ware - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/turmeric" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Turmeric icons by juicy_fish - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/henna-painted-hand" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Henna icons by Design View - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/night-club" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                DJ icons by surang - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/wedding" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Wedding icons by Freepik - Flaticon
              </a>
            </Text>
            <Text>
              <a href="https://www.flaticon.com/free-icons/dancing" target="_blank" rel="noopener noreferrer" style={{ color: "#1f576e", textDecoration: "none" }}>
                Dancing icons by Freepik - Flaticon
              </a>
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default IconCredits;