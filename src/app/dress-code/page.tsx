'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '@/components/shared/Navigation';
import BackgroundWrapper from '@/components/shared/BackgroundWrapper';
import { 
  Box, 
  Container, 
  Heading, 
  Text,
  VStack,
  HStack,
  Button
} from '@chakra-ui/react';

export default function DressCodePage() {
  return (
    <BackgroundWrapper backgroundImage="/background2.png">
      {/* Navigation */}
      <Navigation />
      
      {/* Content */}
      <Box position="relative" minH="100vh" display="flex" justifyContent="center">
        <Container maxW="7xl" py={{ base: "28", md: "40" }} px={{ base: "4", md: "6", lg: "8" }} centerContent>
          {/* Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Box textAlign="center" mb={{ base: "12", md: "16" }}>
              <Heading 
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                color="#1f576e"
                fontFamily="'Bernhard Tango', cursive"
                fontWeight="normal"
                mb="4"
                textShadow="0 4px 8px rgba(255,255,255,0.8)"
                textAlign="center"
              >
                Dress Code Guide
              </Heading>
              <Box w={{ base: "40", md: "48" }} h="2px" bg="#1f576e" opacity="0.6" mx="auto" />
              <Text 
                fontSize={{ base: "lg", md: "xl" }}
                color="#2b5a72"
                maxW="3xl"
                mx="auto"
                lineHeight="1.6"
              >
                Look fabulous while celebrating our special moments! Here&apos;s what to wear for each event.
              </Text>
            </Box>
          </motion.div>

          {/* Events */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <VStack gap="8" align="stretch" w="full" maxW="4xl">
            
            {/* Mehendi & Welcome Dinner */}
            <Box
              p={{ base: "6", md: "8" }}
              bg="rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(10px) saturate(130%)"
              borderRadius="2xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
            >
              <VStack align="start" gap="6">
                <VStack align="start" gap="3" w="full">
                  <HStack gap="3">
                    <Image 
                      src="/mehndi.png" 
                      alt="Mehndi hand with henna design" 
                      width={40} 
                      height={40}
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        minHeight: '40px'
                      }}
                    />
                    <Heading 
                      fontSize={{ base: "2xl", md: "3xl" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                    >
                      Mehendi & Welcome Dinner
                    </Heading>
                  </HStack>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    fontWeight="600"
                    bg="rgba(232, 180, 184, 0.1)"
                    px="3"
                    py="2"
                    borderRadius="lg"
                    border="1px solid rgba(232, 180, 184, 0.2)"
                  >
                    Indo-Western • Darker Colors
                  </Text>
                </VStack>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  Rich jewel tones and elegant silhouettes with an Indian flair. Outfits that transition from henna artistry to dinner dancing.{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    Darker colors work best
                  </Text>
                  {' '}as they won&apos;t show henna stains.{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    Indo-western styles
                  </Text>
                  {' '}give you comfort and cultural celebration.
                </Text>
                
                <VStack align="start" gap="3" w="full">
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Jodhpuri suits with darker jewel tones, kurta bundis with dhoti pants.
                  </Text>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Palazzo pants with embroidered kurtas, dhoti pants with crop tops, or elegant sarees.
                  </Text>
                </VStack>
                
                {/* Mood Board Link */}
                <Box 
                  p="4"
                  bg="rgba(193, 154, 108, 0.1)"
                  borderRadius="xl"
                  border="1px solid rgba(193, 154, 108, 0.3)"
                  w="full"
                >
                  <VStack align="start" gap="3">
                    <HStack gap="2">
                      <Image 
                        src="/lightbulb.png" 
                        alt="Lightbulb inspiration icon" 
                        width={32} 
                        height={32}
                        style={{ 
                          filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)',
                          width: '32px',
                          height: '32px',
                          minWidth: '32px',
                          minHeight: '32px'
                        }}
                      />
                      <Text 
                        fontSize="md" 
                        color="#1f576e" 
                        fontWeight="600"
                      >
                        Need Inspiration?
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="#2b5a72" mb="2">
                      Check out our curated mood board for outfit ideas and color palettes!
                    </Text>
                    <Button
                      onClick={() => window.open('https://pin.it/3fmALZdZj', '_blank')}
                      size="sm"
                      px="6"
                      py="3"
                      bg="#C19A6C"
                      color="white"
                      _hover={{
                        bg: "#A6825A",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(193, 154, 108, 0.3)"
                      }}
                      transition="all 0.2s ease"
                      borderRadius="lg"
                      fontWeight="600"
                    >
                      View Mood Board →
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            {/* Haldi */}
            <Box
              p={{ base: "6", md: "8" }}
              bg="rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(10px) saturate(130%)"
              borderRadius="2xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
            >
              <VStack align="start" gap="6">
                <VStack align="start" gap="3" w="full">
                  <HStack gap="3">
                    <Image 
                      src="/turmeric.png" 
                      alt="Bowl of turmeric powder" 
                      width={40} 
                      height={40}
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        minHeight: '40px'
                      }}
                    />
                    <Heading 
                      fontSize={{ base: "2xl", md: "3xl" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                    >
                      Haldi Ceremony
                    </Heading>
                  </HStack>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    fontWeight="600"
                    bg="rgba(245, 245, 240, 0.1)"
                    px="3"
                    py="2"
                    borderRadius="lg"
                    border="1px solid rgba(245, 245, 240, 0.2)"
                  >
                    Spanish Style • Light & Breezy
                  </Text>
                </VStack>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  Mediterranean coastal vibe with effortless elegance!{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    Light, flowing fabrics
                  </Text>
                  {' '}that catch the breeze, natural textures, and relaxed sophistication.{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    Vacation chic meets cultural celebration.
                  </Text>
                </Text>
                
                <VStack align="start" gap="3" w="full">
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Linen pants with crisp shirts or kurta bundis. Light colors, breathable fabrics.
                  </Text>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Summer dresses that flow or light kurtis in soft fabrics.
                  </Text>
                </VStack>
                
                {/* Mood Board Link */}
                <Box 
                  p="4"
                  bg="rgba(193, 154, 108, 0.1)"
                  borderRadius="xl"
                  border="1px solid rgba(193, 154, 108, 0.3)"
                  w="full"
                >
                  <VStack align="start" gap="3">
                    <HStack gap="2">
                      <Image 
                        src="/lightbulb.png" 
                        alt="Lightbulb inspiration icon" 
                        width={32} 
                        height={32}
                        style={{ 
                          filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)',
                          width: '32px',
                          height: '32px',
                          minWidth: '32px',
                          minHeight: '32px'
                        }}
                      />
                      <Text 
                        fontSize="md" 
                        color="#1f576e" 
                        fontWeight="600"
                      >
                        Need Inspiration?
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="#2b5a72" mb="2">
                      Get inspired by Mediterranean elegance and Spanish coastal style!
                    </Text>
                    <Button
                      onClick={() => window.open('https://es.pinterest.com/shivaniwedssaurav/haldi/?invite_code=065740bff7984db59a0ac767467974a3&sender=1024569121385495413', '_blank')}
                      size="sm"
                      px="6"
                      py="3"
                      bg="#C19A6C"
                      color="white"
                      _hover={{
                        bg: "#A6825A",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(193, 154, 108, 0.3)"
                      }}
                      transition="all 0.2s ease"
                      borderRadius="lg"
                      fontWeight="600"
                    >
                      View Mood Board →
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            {/* Wedding Pheras */}
            <Box
              p={{ base: "6", md: "8" }}
              bg="rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(10px) saturate(130%)"
              borderRadius="2xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
            >
              <VStack align="start" gap="6">
                <VStack align="start" gap="3" w="full">
                  <HStack gap="3">
                    <Image 
                      src="/hindu-wedding.png" 
                      alt="Hindu wedding mandap" 
                      width={40} 
                      height={40}
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        minHeight: '40px'
                      }}
                    />
                    <Heading 
                      fontSize={{ base: "2xl", md: "3xl" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                    >
                      Wedding Pheras
                    </Heading>
                  </HStack>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    fontWeight="600"
                    bg="rgba(193, 154, 108, 0.1)"
                    px="3"
                    py="2"
                    borderRadius="lg"
                    border="1px solid rgba(193, 154, 108, 0.2)"
                  >
                    Traditional • Light Colors
                  </Text>
                </VStack>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  Timeless Indian elegance for the sacred ceremony. Classic silhouettes, rich fabrics, and{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    traditional light colors
                  </Text>
                  {' '}that honor heritage with{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    formal reverence.
                  </Text>
                </Text>
                
                <VStack align="start" gap="3" w="full">
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Sherwanis in ivory or cream, achkans with silk churidars.
                  </Text>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Traditional sarees in light silks, lehengas in soft pastels, or anarkalis in ivory and blush.
                  </Text>
                </VStack>
                
                {/* Mood Board Link */}
                <Box 
                  p="4"
                  bg="rgba(193, 154, 108, 0.1)"
                  borderRadius="xl"
                  border="1px solid rgba(193, 154, 108, 0.3)"
                  w="full"
                >
                  <VStack align="start" gap="3">
                    <HStack gap="2">
                      <Image 
                        src="/lightbulb.png" 
                        alt="Lightbulb inspiration icon" 
                        width={32} 
                        height={32}
                        style={{ 
                          filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)',
                          width: '32px',
                          height: '32px',
                          minWidth: '32px',
                          minHeight: '32px'
                        }}
                      />
                      <Text 
                        fontSize="md" 
                        color="#1f576e" 
                        fontWeight="600"
                      >
                        Need Inspiration?
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="#2b5a72" mb="2">
                      Discover timeless Indian wedding elegance with traditional silhouettes and auspicious colors!
                    </Text>
                    <Button
                      onClick={() => window.open('https://pin.it/4x34dvlVF', '_blank')}
                      size="sm"
                      px="6"
                      py="3"
                      bg="#C19A6C"
                      color="white"
                      _hover={{
                        bg: "#A6825A",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(193, 154, 108, 0.3)"
                      }}
                      transition="all 0.2s ease"
                      borderRadius="lg"
                      fontWeight="600"
                    >
                      View Mood Board →
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            {/* After Party */}
            <Box
              p={{ base: "6", md: "8" }}
              bg="rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(10px) saturate(130%)"
              borderRadius="2xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
            >
              <VStack align="start" gap="6">
                <VStack align="start" gap="3" w="full">
                  <HStack gap="3">
                    <Image 
                      src="/dj.png" 
                      alt="DJ with headphones" 
                      width={40} 
                      height={40}
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        minHeight: '40px'
                      }}
                    />
                    <Heading 
                      fontSize={{ base: "2xl", md: "3xl" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                    >
                      After Party
                    </Heading>
                  </HStack>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    fontWeight="600"
                    bg="rgba(193, 154, 108, 0.1)"
                    px="3"
                    py="2"
                    borderRadius="lg"
                    border="1px solid rgba(193, 154, 108, 0.2)"
                  >
                    Chic Clubbing • Sleek & Bold
                  </Text>
                </VStack>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  Chic club vibes - sleek silhouettes, bold statement pieces, and{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    sophisticated edge
                  </Text>
                  {' '}meets high-energy nightlife. Outfits that handle the dance floor under{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    neon lights.
                  </Text>
                </Text>
                
                <VStack align="start" gap="3" w="full">
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Stylish shirts with cool jackets, dark pants, and comfortable dance shoes.
                  </Text>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Bodycon dresses, chic jumpsuits, bold accessories, and comfortable heels or trendy sneakers.
                  </Text>
                </VStack>
                
                {/* Mood Board Link */}
                <Box 
                  p="4"
                  bg="rgba(193, 154, 108, 0.1)"
                  borderRadius="xl"
                  border="1px solid rgba(193, 154, 108, 0.3)"
                  w="full"
                >
                  <VStack align="start" gap="3">
                    <HStack gap="2">
                      <Image 
                        src="/lightbulb.png" 
                        alt="Lightbulb inspiration icon" 
                        width={32} 
                        height={32}
                        style={{ 
                          filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)',
                          width: '32px',
                          height: '32px',
                          minWidth: '32px',
                          minHeight: '32px'
                        }}
                      />
                      <Text 
                        fontSize="md" 
                        color="#1f576e" 
                        fontWeight="600"
                      >
                        Need Inspiration?
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="#2b5a72" mb="2">
                      Get inspired by sleek nightlife fashion and chic club aesthetics!
                    </Text>
                    <Button
                      onClick={() => window.open('[MOOD_BOARD_URL]', '_blank')}
                      size="sm"
                      px="6"
                      py="3"
                      bg="#C19A6C"
                      color="white"
                      _hover={{
                        bg: "#A6825A",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(193, 154, 108, 0.3)"
                      }}
                      transition="all 0.2s ease"
                      borderRadius="lg"
                      fontWeight="600"
                    >
                      View Mood Board →
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            {/* Sangeet */}
            <Box
              p={{ base: "6", md: "8" }}
              bg="rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(10px) saturate(130%)"
              borderRadius="2xl"
              border="1px solid rgba(255, 255, 255, 0.2)"
              boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
            >
              <VStack align="start" gap="6">
                <VStack align="start" gap="3" w="full">
                  <HStack gap="3">
                    <Image 
                      src="/dancing.png" 
                      alt="Dancing couple" 
                      width={40} 
                      height={40}
                      style={{ 
                        filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)',
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        minHeight: '40px'
                      }}
                    />
                    <Heading 
                      fontSize={{ base: "2xl", md: "3xl" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                    >
                      Sangeet
                    </Heading>
                  </HStack>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    fontWeight="600"
                    bg="rgba(193, 154, 108, 0.1)"
                    px="3"
                    py="2"
                    borderRadius="lg"
                    border="1px solid rgba(193, 154, 108, 0.2)"
                  >
                    Black Tie Elegance • Formal & Festive
                  </Text>
                </VStack>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  Black tie elegance meets festivity - think{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    sophisticated glamour
                  </Text>
                  {' '}with rich, darker tones. The perfect balance of{' '}
                  <Text as="span" fontWeight="600" color="#1f576e">
                    black tie sophistication
                  </Text>
                  {' '}and festive energy.
                </Text>
                
                <VStack align="start" gap="3" w="full">
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Sharp blazers with ties in dark colors, or bandhgalas in deep jewel tones.
                  </Text>
                  
                  <Text 
                    fontSize={{ base: "md", md: "lg" }}
                    color="#2b5a72"
                    lineHeight="1.7"
                  >
                    <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Long gowns in dark fabrics with elegant draping, or sophisticated sarees in rich silks.
                  </Text>
                </VStack>
                
                {/* Mood Board Link */}
                <Box 
                  p="4"
                  bg="rgba(193, 154, 108, 0.1)"
                  borderRadius="xl"
                  border="1px solid rgba(193, 154, 108, 0.3)"
                  w="full"
                >
                  <VStack align="start" gap="3">
                    <HStack gap="2">
                      <Image 
                        src="/lightbulb.png" 
                        alt="Lightbulb inspiration icon" 
                        width={32} 
                        height={32}
                        style={{ 
                          filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)',
                          width: '32px',
                          height: '32px',
                          minWidth: '32px',
                          minHeight: '32px'
                        }}
                      />
                      <Text 
                        fontSize="md" 
                        color="#1f576e" 
                        fontWeight="600"
                      >
                        Need Inspiration?
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="#2b5a72" mb="2">
                      Explore elegant black tie formal wear and sophisticated dark glamour for the perfect Sangeet look!
                    </Text>
                    <Button
                      onClick={() => window.open('https://pin.it/4Jn7azbCs', '_blank')}
                      size="sm"
                      px="6"
                      py="3"
                      bg="#C19A6C"
                      color="white"
                      _hover={{
                        bg: "#A6825A",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(193, 154, 108, 0.3)"
                      }}
                      transition="all 0.2s ease"
                      borderRadius="lg"
                      fontWeight="600"
                    >
                      View Mood Board →
                    </Button>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            </VStack>
          </motion.div>
        </Container>
      </Box>
    </BackgroundWrapper>
  );
}