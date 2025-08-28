'use client';

import { Box } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import FlowerShower from './FlowerShower';
import IconCredits from './IconCredits';

interface BackgroundWrapperProps {
  children: ReactNode;
  showFlowerShower?: boolean;
  backgroundImage?: string;
}

const BackgroundWrapper = ({ children, showFlowerShower = false, backgroundImage }: BackgroundWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        {backgroundImage && (
          <div
            style={{
              position: 'absolute',
              inset: '0',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              opacity: '0.7'
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </div>
    );
  }

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