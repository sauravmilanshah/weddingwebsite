'use client';

import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import FlowerShower from './FlowerShower';
import IconCredits from './IconCredits';

interface BackgroundWrapperProps {
  children: ReactNode;
  showFlowerShower?: boolean;
  backgroundImage?: string;
}

const BackgroundWrapper = ({ children, showFlowerShower = false, backgroundImage }: BackgroundWrapperProps) => {
  return (
    <Box 
      minH="100vh" 
      position="relative" 
      overflow="hidden"
    >
      {/* Background Image - Exactly like page-old.tsx */}
      {backgroundImage && (
        <Box
          position="absolute"
          inset="0"
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundAttachment="fixed"
          opacity="0.7"
        />
      )}
      
      {/* Indian Wedding Flower Shower */}
      {showFlowerShower && <FlowerShower />}
      
      {/* Content */}
      <Box position="relative" zIndex="1">
        {children}
      </Box>
      
      {/* Icon Credits - Fixed position on all pages */}
      <IconCredits />
    </Box>
  );
};

export default BackgroundWrapper;