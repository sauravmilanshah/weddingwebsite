'use client';

import Navigation from '@/components/shared/Navigation';
import BackgroundWrapper from '@/components/shared/BackgroundWrapper';
import { 
  Box, 
  Container, 
  VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function RSVPPage() {
  return (
    <BackgroundWrapper backgroundImage="/background2.png">
      <Navigation />
      
      <Box 
        position="relative" 
        minH="100vh" 
        display="flex" 
        justifyContent="center"
      >
        <Container 
          maxW="5xl" 
          py={{ base: "20", md: "28" }} 
          px={{ base: "4", md: "6", lg: "8" }}
          centerContent
        >
          <VStack
            gap={{ base: "4", md: "6" }}
            align="center"
            w="100%"
          >
            {/* Google Form Embed */}
            <MotionBox
              w="100%"
              maxW="800px"
              bg="rgba(255, 255, 255, 0.98)"
              borderRadius="2xl"
              p={{ base: "2", md: "3" }}
              boxShadow="0 25px 50px rgba(0, 0, 0, 0.15)"
              backdropFilter="blur(20px) saturate(130%)"
              border="1px solid rgba(255, 255, 255, 0.3)"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Box
                w="100%"
                h={{ base: "700px", md: "900px", lg: "1100px" }}
                borderRadius="xl"
                overflow="hidden"
                boxShadow="inset 0 2px 4px rgba(0, 0, 0, 0.06)"
              >
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSce0Gk7fqsbAJ-dz_lOjJ85STHkps0Q7zyZvP81XQ_tcRO1DA/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Wedding RSVP Form"
                >
                  Loading RSVP Form...
                </iframe>
              </Box>
            </MotionBox>

          </VStack>
        </Container>
      </Box>
    </BackgroundWrapper>
  );
}