'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/shared/Navigation';
import BackgroundWrapper from '@/components/shared/BackgroundWrapper';
import { 
  Box, 
  Container, 
  Heading, 
  Text,
  VStack,
  HStack,
  Grid,
  Button
} from '@chakra-ui/react';

export default function OleanderPage() {
  const [activeSection, setActiveSection] = useState('story');
  
  const sections = [
    { id: 'story', name: 'Our Love Story', icon: '❤️' },
    { id: 'activities', name: 'Activities & Recreation', icon: '🎯' },
    { id: 'dining', name: 'Dining Experiences', icon: '🍽️' },
    { id: 'wellness', name: 'Wellness & Relaxation', icon: '🧘' },
    { id: 'attractions', name: 'Unique Attractions', icon: '✨' }
  ];

  const activities = [
    {
      name: "Infinity Pool Complex",
      description: "Stunning infinity pool with separate children's pool area",
      highlight: "Perfect for relaxation with scenic views"
    },
    {
      name: "Padel Court",
      description: "State-of-the-art, open-air padel court for sports enthusiasts",
      highlight: "Great for group activities and friendly competitions"
    },
    {
      name: "Modern Fitness Centre",
      description: "Fully equipped gymnasium with cardio and strength training equipment",
      highlight: "Stay active during your stay with professional equipment"
    },
    {
      name: "Gaming Zone & Bowling Alley",
      description: "Indoor arcade and gaming zone with professional bowling alley",
      highlight: "Perfect entertainment for all ages and families"
    },
    {
      name: "Kids' Playground",
      description: "Dedicated play area and playground designed for children",
      highlight: "Safe and fun environment for the little ones"
    },
    {
      name: "Nature Adventures",
      description: "Nature trails, treks, birdwatching, and cycling experiences",
      highlight: "Explore 180 acres of natural beauty and wildlife"
    }
  ];

  const diningExperiences = [
    {
      name: "Saltt Restaurant & Bar",
      cuisine: "Multi-cuisine Fine Dining",
      description: "Renowned for seasonal ingredients and elegant decor",
      highlight: "Signature dining experience with exceptional ambiance"
    },
    {
      name: "Common House Microbrewery",
      cuisine: "Craft Beer & Cafe",
      description: "All-day cafe with indoor and alfresco seating, featuring 6-8 rotating craft beer flavors",
      highlight: "Perfect spot for casual dining and craft beer tasting"
    },
    {
      name: "Gazebo Lakeside Dining",
      cuisine: "Outdoor Fine Dining",
      description: "Intimate lakeside dining venue perfect for romantic meals",
      highlight: "Scenic outdoor dining with stunning lake views"
    },
    {
      name: "Splash Bar & Kitchen",
      cuisine: "Poolside Casual",
      description: "Poolside snacks and creative cocktails in a relaxed setting",
      highlight: "Refreshing drinks and light bites by the pool"
    },
    {
      name: "Wine Tasting Experience",
      cuisine: "Sommelier Guided",
      description: "Professional wine cellar and tasting room with expert guidance",
      highlight: "Discover exceptional wines with our in-house sommelier"
    },
    {
      name: "Tea Ceremony",
      cuisine: "Traditional Experience",
      description: "Three-tea tasting experience showcasing premium selections",
      highlight: "Mindful tea experience in serene natural surroundings"
    }
  ];

  const wellness = [
    {
      name: "Soham Spa",
      service: "Holistic Therapies",
      description: "Ayurvedic treatments and Western-style spa experiences",
      highlight: "Professional therapists in a serene, healing environment"
    },
    {
      name: "Yoga & Meditation",
      service: "Mindful Practices",
      description: "Daily group sessions, private yoga, hilltop sunrise yoga, and chakra dance",
      highlight: "Find inner peace with guided sessions in nature"
    },
    {
      name: "Sound Bath & Chakra Healing",
      service: "Energy Healing",
      description: "Therapeutic sound therapy and chakra balancing sessions",
      highlight: "Experience deep relaxation and energy alignment"
    },
    {
      name: "Wellness Workshops",
      service: "Educational Programs",
      description: "Guided meditation, wellness education, and mindfulness training",
      highlight: "Learn lifelong wellness practices from experts"
    }
  ];

  const attractions = [
    {
      name: "Kensho Nursery & Plant Boutique",
      feature: "Interactive Garden Experience",
      description: "100+ plant varieties with D.I.Y Potting Bar and garden consultations",
      highlight: "Create your own plant arrangements and learn gardening secrets"
    },
    {
      name: "Vintage Car Collection",
      feature: "Automotive Heritage",
      description: "Chevrolet Deluxe, Morris 8 (M.F. Husain's former car), Mercedes Benz 170V, and more classic beauties",
      highlight: "A must-see collection for auto enthusiasts and photography"
    },
    {
      name: "Scenic Photography Locations",
      feature: "Picture Perfect Spots",
      description: "Manicured gardens, lakeside promenades, hilltop vistas, and dedicated photo backdrops",
      highlight: "Capture memories across 180 acres of stunning landscapes"
    },
    {
      name: "Organic Farm Patches",
      feature: "Farm-to-Table Experience",
      description: "Explore organic farming practices and fresh ingredient sourcing",
      highlight: "See where your delicious meals begin their journey"
    }
  ];

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
            <VStack gap="4" textAlign="center" mb="10">
              <Heading 
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                color="#1f576e"
                fontFamily="'Bernhard Tango', cursive"
                fontWeight="normal"
                textShadow="0 4px 8px rgba(255,255,255,0.8)"
              >
                Things to do at Oleander Farms
              </Heading>
              <Box w={{ base: "48", md: "56" }} h="2px" bg="#1f576e" opacity="0.6" mx="auto" />
              <Text 
                fontSize={{ base: "lg", md: "xl" }}
                color="#2b5a72"
                maxW="2xl"
                textShadow="0 2px 4px rgba(255,255,255,0.7)"
                fontWeight="500"
              >
                Your luxury lakeside retreat awaits with endless possibilities across 180 acres of natural beauty
              </Text>
            </VStack>
          </motion.div>

          {/* Navigation Pills */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <HStack 
              gap="2" 
              justify="center" 
              wrap="wrap" 
              mb="8"
              px={{ base: "4", md: "0" }}
            >
              {sections.map((section) => (
                <Button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  variant={activeSection === section.id ? "solid" : "ghost"}
                  bg={activeSection === section.id ? "rgba(232, 180, 184, 0.2)" : "rgba(255, 255, 255, 0.1)"}
                  color={activeSection === section.id ? "#1f576e" : "#2b5a72"}
                  border="1px solid"
                  borderColor={activeSection === section.id ? "rgba(232, 180, 184, 0.4)" : "rgba(255, 255, 255, 0.2)"}
                  backdropFilter="blur(8px) saturate(120%)"
                  borderRadius="full"
                  px={{ base: "3", md: "4" }}
                  py="2"
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="600"
                  _hover={{
                    bg: "rgba(232, 180, 184, 0.15)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(232, 180, 184, 0.2)"
                  }}
                  transition="all 0.3s ease"
                >
                  <Text mr="1">{section.icon}</Text>
                  {section.name}
                </Button>
              ))}
            </HStack>
          </motion.div>

          {/* Content Sections */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {activeSection === 'story' && (
              <VStack gap="8" align="stretch">
                <Box
                  p={{ base: "8", md: "10" }}
                  bg="rgba(255, 255, 255, 0.15)"
                  backdropFilter="blur(10px) saturate(130%)"
                  borderRadius="2xl"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                  textAlign="center"
                >
                  <VStack gap="6">
                    <Heading 
                      fontSize={{ base: "2xl", md: "3xl" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                    >
                      How We Fell in Love with Oleander Farms
                    </Heading>
                    <Text 
                      fontSize={{ base: "md", md: "lg" }}
                      color="#2b5a72"
                      lineHeight="1.8"
                      maxW="4xl"
                    >
                      When Shivani and Saurav first visited Oleander Farms with their families, something magical happened. 
                      Walking through the 180 acres of pristine landscape, surrounded by rolling hills and tranquil lakes, 
                      they knew they had found something special. The natural beauty was breathtaking, but it was the 
                      incredible dining experience at Saltt Restaurant that truly won their hearts.
                    </Text>
                    <Text 
                      fontSize={{ base: "md", md: "lg" }}
                      color="#2b5a72"
                      lineHeight="1.8"
                      maxW="4xl"
                      fontStyle="italic"
                    >
                      &quot;We spent hours exploring every corner - from the vintage car collection to the serene spa, 
                      from the hilltop ceremony venue to the charming lakeside dining. Our families felt the same magic, 
                      and we knew this wasn&apos;t just a venue - it was where our love story would unfold surrounded by 
                      nature&apos;s embrace and unparalleled hospitality.&quot;
                    </Text>
                    <Box
                      p="4"
                      bg="rgba(193, 154, 108, 0.1)"
                      borderRadius="lg"
                      border="1px solid rgba(193, 154, 108, 0.2)"
                    >
                      <Text fontSize="md" color="#1f576e" fontWeight="600">
                        💫 We can&apos;t wait for you to experience the same magic that captured our hearts!
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            )}

            {activeSection === 'activities' && (
              <Grid 
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="6"
              >
                {activities.map((activity, index) => (
                  <Box
                    key={index}
                    p={{ base: "6", md: "8" }}
                    bg="rgba(255, 255, 255, 0.15)"
                    backdropFilter="blur(10px) saturate(130%)"
                    borderRadius="2xl"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                  >
                    <VStack align="start" gap="4">
                      <Heading 
                        fontSize={{ base: "xl", md: "2xl" }}
                        color="#1f576e"
                        fontFamily="'Aparajita', serif"
                      >
                        {activity.name}
                      </Heading>
                      <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                        {activity.description}
                      </Text>
                      <Box
                        p="3"
                        bg="rgba(232, 180, 184, 0.1)"
                        borderRadius="lg"
                        border="1px solid rgba(232, 180, 184, 0.2)"
                      >
                        <Text fontSize="sm" color="#1f576e" fontWeight="600">
                          💡 {activity.highlight}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                ))}
              </Grid>
            )}

            {activeSection === 'dining' && (
              <Grid 
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="6"
              >
                {diningExperiences.map((restaurant, index) => (
                  <Box
                    key={index}
                    p={{ base: "6", md: "8" }}
                    bg="rgba(255, 255, 255, 0.15)"
                    backdropFilter="blur(10px) saturate(130%)"
                    borderRadius="2xl"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                  >
                    <VStack align="start" gap="4">
                      <VStack align="start" gap="1">
                        <Heading 
                          fontSize={{ base: "xl", md: "2xl" }}
                          color="#1f576e"
                          fontFamily="'Aparajita', serif"
                        >
                          {restaurant.name}
                        </Heading>
                        <Text fontSize="md" color="#2b5a72" fontWeight="600">
                          🍽️ {restaurant.cuisine}
                        </Text>
                      </VStack>
                      <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                        {restaurant.description}
                      </Text>
                      <Box
                        p="3"
                        bg="rgba(193, 154, 108, 0.1)"
                        borderRadius="lg"
                        border="1px solid rgba(193, 154, 108, 0.2)"
                      >
                        <Text fontSize="sm" color="#1f576e" fontWeight="600">
                          ⭐ {restaurant.highlight}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                ))}
              </Grid>
            )}

            {activeSection === 'wellness' && (
              <Grid 
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="6"
              >
                {wellness.map((service, index) => (
                  <Box
                    key={index}
                    p={{ base: "6", md: "8" }}
                    bg="rgba(255, 255, 255, 0.15)"
                    backdropFilter="blur(10px) saturate(130%)"
                    borderRadius="2xl"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                  >
                    <VStack align="start" gap="4">
                      <VStack align="start" gap="1">
                        <Heading 
                          fontSize={{ base: "xl", md: "2xl" }}
                          color="#1f576e"
                          fontFamily="'Aparajita', serif"
                        >
                          {service.name}
                        </Heading>
                        <Text fontSize="md" color="#2b5a72" fontWeight="600">
                          🧘 {service.service}
                        </Text>
                      </VStack>
                      <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                        {service.description}
                      </Text>
                      <Box
                        p="3"
                        bg="rgba(166, 176, 166, 0.1)"
                        borderRadius="lg"
                        border="1px solid rgba(166, 176, 166, 0.2)"
                      >
                        <Text fontSize="sm" color="#1f576e" fontWeight="600">
                          🌿 {service.highlight}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                ))}
              </Grid>
            )}

            {activeSection === 'attractions' && (
              <Grid 
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="6"
              >
                {attractions.map((attraction, index) => (
                  <Box
                    key={index}
                    p={{ base: "6", md: "8" }}
                    bg="rgba(255, 255, 255, 0.15)"
                    backdropFilter="blur(10px) saturate(130%)"
                    borderRadius="2xl"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                  >
                    <VStack align="start" gap="4">
                      <VStack align="start" gap="1">
                        <Heading 
                          fontSize={{ base: "xl", md: "2xl" }}
                          color="#1f576e"
                          fontFamily="'Aparajita', serif"
                        >
                          {attraction.name}
                        </Heading>
                        <Text fontSize="md" color="#2b5a72" fontWeight="600">
                          ✨ {attraction.feature}
                        </Text>
                      </VStack>
                      <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                        {attraction.description}
                      </Text>
                      <Box
                        p="3"
                        bg="rgba(245, 245, 240, 0.1)"
                        borderRadius="lg"
                        border="1px solid rgba(245, 245, 240, 0.2)"
                      >
                        <Text fontSize="sm" color="#1f576e" fontWeight="600">
                          🎯 {attraction.highlight}
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                ))}
              </Grid>
            )}

          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Box 
              mt="12" 
              p={{ base: "6", md: "8" }}
              bg="rgba(232, 180, 184, 0.15)"
              backdropFilter="blur(10px) saturate(130%)"
              borderRadius="2xl"
              border="1px solid rgba(232, 180, 184, 0.3)"
              boxShadow="0 8px 32px rgba(232, 180, 184, 0.2)"
              textAlign="center"
            >
              <VStack gap="4">
                <Heading 
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color="#1f576e"
                  fontFamily="'Aparajita', serif"
                >
                  A World of Experiences Awaits 🌟
                </Heading>
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  maxW="2xl"
                  lineHeight="1.6"
                >
                  From sunrise yoga on the hilltop to sunset cocktails by the lake, 
                  Oleander Farms offers endless opportunities to create magical memories. 
                  Every moment here is designed to celebrate love, nature, and togetherness.
                </Text>
                <Text 
                  fontSize="sm"
                  color="#1f576e"
                  fontStyle="italic"
                  mt="2"
                >
                  Can&apos;t wait to share this magical place with you! ✨
                </Text>
              </VStack>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </BackgroundWrapper>
  );
}