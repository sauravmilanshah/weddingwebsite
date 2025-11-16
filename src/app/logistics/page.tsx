'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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

// Logistics Page Component
export default function LogisticsPage() {
  const [activeSection, setActiveSection] = useState('before-travel');
  
  const sections = [
    { id: 'before-travel', name: 'Before You Travel', icon: '📋' },
    { id: 'travel-prep', name: 'Travel Preparation', icon: '🎒' },
    { id: 'venue-local', name: 'Venue & Local Info', icon: '📍' },
    { id: 'wedding-schedule', name: 'Wedding Schedule', icon: '📅' },
    { id: 'faq-support', name: 'FAQ & Support', icon: '❓' }
  ];

  // Data arrays for structured content
  const airports = [
    {
      name: "Mumbai BOM Airport",
      distance: "68-75km",
      driveTime: "1hr 30min - 2hr 30min",
      details: "Best international connectivity",
      recommendation: "Recommended for international guests"
    },
    {
      name: "NMIA (Navi Mumbai)",
      distance: "24-45km",
      driveTime: "45min - 1hr 15min",
      details: "Closest to venue",
      recommendation: "Best if direct flights available"
    },
    {
      name: "Pune PNQ Airport",
      distance: "103-136km", 
      driveTime: "2hr 30min - 3hr 30min",
      details: "Regional airport option",
      recommendation: "Good for guests from Pune region"
    }
  ];

  const weatherEssentials = [
    {
      item: "Light jacket or wrap",
      description: "For cool evenings (13-16°C/55-61°F)",
      icon: "🧥"
    },
    {
      item: "Breathable cotton/linen pieces", 
      description: "For warm, sunny days (27-30°C/81-86°F)",
      icon: "👕"
    },
    {
      item: "Comfortable walking shoes",
      description: "For exploring the beautiful 180-acre property",
      icon: "👟"
    },
    {
      item: "Sun protection essentials",
      description: "Hat, sunglasses, and sunscreen for outdoor ceremonies",
      icon: "🕶️"
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
                Wedding Logistics
              </Heading>
              <Box w={{ base: "48", md: "56" }} h="2px" bg="#1f576e" opacity="0.6" mx="auto" />
              <Text 
                fontSize={{ base: "lg", md: "xl" }}
                color="#2b5a72"
                maxW="2xl"
                textShadow="0 2px 4px rgba(255,255,255,0.7)"
                fontWeight="500"
              >
                We&apos;re so excited to celebrate with you! Here&apos;s everything to help make your journey to our special day as smooth and joyful as possible ✨
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
            {/* Before You Travel Section */}
            {activeSection === 'before-travel' && (
              <VStack gap="8" align="stretch">
                {/* RSVP Process - MOVED TO TOP */}
                <Box>
                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    RSVP Process
                  </Heading>
                  <Box
                    maxW="2xl"
                    mx="auto"
                    p={{ base: "6", md: "8" }}
                    bg="rgba(255, 255, 255, 0.15)"
                    backdropFilter="blur(10px) saturate(130%)"
                    borderRadius="2xl"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                  >
                    <VStack align="start" gap="6">
                      {/* Header Section */}
                      <VStack align="start" gap="2" w="full">
                        <Heading
                          fontSize={{ base: "2xl", md: "3xl" }}
                          color="#1f576e"
                          fontFamily="'Aparajita', serif"
                          fontWeight="bold"
                        >
                          WhatsApp & Forms
                        </Heading>
                        <Text
                          fontSize="lg"
                          color="#1f576e"
                          fontWeight="600"
                          opacity="0.8"
                        >
                          💬 Personal conversation with us
                        </Text>
                      </VStack>

                      {/* Details Section */}
                      <Box
                        p="4"
                        bg="rgba(255, 255, 255, 0.1)"
                        backdropFilter="blur(5px)"
                        borderRadius="xl"
                        border="1px solid rgba(255, 255, 255, 0.15)"
                        w="full"
                      >
                        <VStack align="start" gap="3" w="full">
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            We&apos;ll reach out to you via WhatsApp to connect personally and share details about the celebrations!
                          </Text>
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            <strong>What we&apos;ll share:</strong> Google Form link for dietary preferences, arrival details, and special requests
                          </Text>
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            <strong>Please complete:</strong> The form helps us ensure everything is perfect for your stay!
                          </Text>
                        </VStack>
                      </Box>

                      {/* Highlight Section */}
                      <Box
                        p="4"
                        bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                        borderRadius="xl"
                        border="1px solid rgba(232, 180, 184, 0.2)"
                        w="full"
                      >
                        <HStack gap="3" align="center">
                          <Text fontSize="2xl">💕</Text>
                          <Text fontSize="sm" color="#1f576e" fontWeight="600">
                            We can&apos;t wait to connect and help plan your perfect trip!
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                </Box>

                {/* Visa Requirements */}
                <Box>
                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Visa & Documentation
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                  >
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading 
                            fontSize={{ base: "2xl", md: "3xl" }}
                            color="#1f576e"
                            fontFamily="'Aparajita', serif"
                            fontWeight="bold"
                          >
                            e-Tourist Visa
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            🛂 Online Application Required
                          </Text>
                        </VStack>

                        {/* Details Section */}
                        <VStack align="start" gap="4" w="full">
                          <Box
                            p="4"
                            bg="rgba(255, 255, 255, 0.1)"
                            borderRadius="xl"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            w="full"
                          >
                            <VStack align="start" gap="3">
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <Text as="span" fontWeight="700" color="#1f576e">Processing:</Text> 2-4 business days
                              </Text>
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <Text as="span" fontWeight="700" color="#1f576e">Cost:</Text> $25-$80 USD (varies by nationality)
                              </Text>
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <Text as="span" fontWeight="700" color="#1f576e">Apply at:</Text> indianvisaonline.gov.in
                              </Text>
                            </VStack>
                          </Box>
                        </VStack>

                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bg="linear-gradient(135deg, rgba(232, 180, 184, 0.15) 0%, rgba(193, 154, 108, 0.1) 100%)"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.3)"
                          w="full"
                        >
                          <HStack gap="3">
                            <Text fontSize="xl">💫</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600" lineHeight="1.4">
                              Start early to avoid any last-minute stress - we want you to enjoy every moment!
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading 
                            fontSize={{ base: "2xl", md: "3xl" }}
                            color="#1f576e"
                            fontFamily="'Aparajita', serif"
                            fontWeight="bold"
                          >
                            Passport Requirements
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            📋 Document Checklist
                          </Text>
                        </VStack>

                        {/* Details Section */}
                        <VStack align="start" gap="4" w="full">
                          <Box
                            p="4"
                            bg="rgba(255, 255, 255, 0.1)"
                            borderRadius="xl"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            w="full"
                          >
                            <VStack align="start" gap="3">
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <Text as="span" fontWeight="700" color="#1f576e">Validity:</Text> Minimum 6 months from entry date
                              </Text>
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <Text as="span" fontWeight="700" color="#1f576e">Pages:</Text> 2 blank visa pages recommended
                              </Text>
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <Text as="span" fontWeight="700" color="#1f576e">Check-in:</Text> Passport + OCI/Visa required at venue
                              </Text>
                            </VStack>
                          </Box>
                        </VStack>

                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bg="linear-gradient(135deg, rgba(166, 176, 166, 0.15) 0%, rgba(193, 154, 108, 0.1) 100%)"
                          borderRadius="xl"
                          border="1px solid rgba(166, 176, 166, 0.3)"
                          w="full"
                        >
                          <HStack gap="3">
                            <Text fontSize="xl">💝</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600" lineHeight="1.4">
                              Check your passport now so there are no surprises later!
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Grid>
                </Box>

                {/* Flight Information */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Flight Options
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    gap="6"
                  >
                    {airports.map((airport, index) => (
                      <Box
                        key={index}
                        p={{ base: "6", md: "8" }}
                        bg="rgba(255, 255, 255, 0.15)"
                        backdropFilter="blur(10px) saturate(130%)"
                        borderRadius="2xl"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                      >
                        <VStack align="start" gap="6">
                          {/* Header Section */}
                          <VStack align="start" gap="2" w="full">
                            <Heading 
                              fontSize={{ base: "2xl", md: "3xl" }}
                              color="#1f576e"
                              fontFamily="'Aparajita', serif"
                              fontWeight="bold"
                            >
                              {airport.name}
                            </Heading>
                            <Text 
                              fontSize="lg" 
                              color="#1f576e" 
                              fontWeight="600" 
                              opacity="0.8"
                            >
                              ✈️ {airport.details}
                            </Text>
                          </VStack>
                          
                          {/* Details Section */}
                          <Box
                            p="4"
                            bg="rgba(255, 255, 255, 0.1)"
                            backdropFilter="blur(5px)"
                            borderRadius="xl"
                            border="1px solid rgba(255, 255, 255, 0.15)"
                            w="full"
                          >
                            <VStack align="start" gap="3" w="full">
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <strong>Distance:</strong> {airport.distance} from venue
                              </Text>
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <strong>Drive time:</strong> {airport.driveTime}
                              </Text>
                            </VStack>
                          </Box>
                          
                          {/* Highlight Section */}
                          <Box
                            p="4"
                            bgGradient="linear(to-r, rgba(193, 154, 108, 0.1), rgba(232, 180, 184, 0.1))"
                            borderRadius="xl"
                            border="1px solid rgba(193, 154, 108, 0.2)"
                            w="full"
                          >
                            <HStack gap="3" align="center">
                              <Text fontSize="2xl">💡</Text>
                              <Text fontSize="sm" color="#1f576e" fontWeight="600">
                                {airport.recommendation}
                              </Text>
                            </HStack>
                          </Box>
                        </VStack>
                      </Box>
                    ))}
                  </Grid>
                </Box>

              </VStack>
            )}

            {/* Travel Preparation Section */}
            {activeSection === 'travel-prep' && (
              <VStack gap="8" align="stretch">
                {/* Weather & Packing */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Weather & Packing Guide
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "1fr 2fr" }}
                    gap="8"
                    mb="8"
                    maxW="6xl"
                    mx="auto"
                  >
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Weather
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            🌤️ Perfect Wedding Weather
                          </Text>
                        </VStack>
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="lg"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          maxW="320px"
                          mx="auto"
                        >
                          <VStack align="center" gap="5" w="full">
                            {/* Main Temperature Display */}
                            <HStack gap="8" justify="center" align="center">
                              <VStack align="center" gap="1">
                                <Text fontSize="sm" color="#2b5a72" fontWeight="600" textTransform="uppercase">
                                  Day
                                </Text>
                                <Text fontSize="3xl" color="#1f576e" fontWeight="bold" lineHeight="1">
                                  29°
                                </Text>
                                <Text fontSize="sm" color="#2b5a72">
                                  81-86°F
                                </Text>
                              </VStack>
                              
                              <Box w="1px" h="16" bg="rgba(43, 90, 114, 0.2)" />
                              
                              <VStack align="center" gap="1">
                                <Text fontSize="sm" color="#2b5a72" fontWeight="600" textTransform="uppercase">
                                  Night
                                </Text>
                                <Text fontSize="3xl" color="#1f576e" fontWeight="bold" lineHeight="1">
                                  15°
                                </Text>
                                <Text fontSize="sm" color="#2b5a72">
                                  55-61°F
                                </Text>
                              </VStack>
                            </HStack>

                            {/* Weather Details Grid */}
                            <HStack gap="8" justify="center" w="full">
                              <VStack align="center" gap="1">
                                <Text fontSize="xl">💧</Text>
                                <Text fontSize="xs" color="#2b5a72" fontWeight="600" textTransform="uppercase">
                                  Humidity
                                </Text>
                                <Text fontSize="lg" color="#1f576e" fontWeight="bold">
                                  50%
                                </Text>
                              </VStack>
                              
                              <VStack align="center" gap="1">
                                <Text fontSize="xl">☁️</Text>
                                <Text fontSize="xs" color="#2b5a72" fontWeight="600" textTransform="uppercase">
                                  Rain
                                </Text>
                                <Text fontSize="lg" color="#1f576e" fontWeight="bold">
                                  0%
                                </Text>
                              </VStack>
                            </HStack>
                          </VStack>
                        </Box>

                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <VStack gap="2" align="center">
                            <HStack gap="3" align="center">
                              <Text fontSize="2xl">☀️</Text>
                              <Text fontSize="sm" color="#1f576e" fontWeight="600">
                                Perfect weather for our celebration!
                              </Text>
                            </HStack>
                            <a 
                              href="https://www.accuweather.com/en/in/karjat/194641/january-weather/194641?year=2026" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: "#1f576e", textDecoration: "underline", fontSize: "12px", fontWeight: "500" }}
                            >
                              View detailed forecast on AccuWeather
                            </a>
                          </VStack>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Check-in Requirements
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            📋 Documentation Made Simple
                          </Text>
                        </VStack>

                        {/* Guest Type Cards - Compact Vertical Layout */}
                        <VStack gap="3" w="full">
                          {/* Indian Guests Card */}
                          <Box
                            p="4"
                            bg="rgba(166, 176, 166, 0.08)"
                            borderRadius="lg"
                            border="1px solid rgba(166, 176, 166, 0.15)"
                            w="full"
                          >
                            <VStack align="start" gap="2" w="full">
                              <HStack gap="2" align="center">
                                <Text fontSize="lg">🇮🇳</Text>
                                <Text fontSize="md" color="#1f576e" fontWeight="bold">
                                  Indian Guests
                                </Text>
                              </HStack>
                              <Text fontSize="sm" color="#2b5a72" lineHeight="1.5">
                                Any of these documents work:
                              </Text>
                              <HStack gap="4" wrap="wrap" w="full">
                                <Text fontSize="sm" color="#2b5a72">• Driving license</Text>
                                <Text fontSize="sm" color="#2b5a72">• PAN card</Text>
                                <Text fontSize="sm" color="#2b5a72">• Aadhar card</Text>
                              </HStack>
                            </VStack>
                          </Box>

                          {/* International Guests Card */}
                          <Box
                            p="4"
                            bg="rgba(232, 180, 184, 0.08)"
                            borderRadius="lg"
                            border="1px solid rgba(232, 180, 184, 0.15)"
                            w="full"
                          >
                            <VStack align="start" gap="2" w="full">
                              <HStack gap="2" align="center">
                                <Text fontSize="lg">🌍</Text>
                                <Text fontSize="md" color="#1f576e" fontWeight="bold">
                                  International Guests
                                </Text>
                              </HStack>
                              <Text fontSize="sm" color="#2b5a72" lineHeight="1.5">
                                Please bring both documents:
                              </Text>
                              <HStack gap="4" wrap="wrap" w="full">
                                <Text fontSize="sm" color="#2b5a72">• Passport</Text>
                                <Text fontSize="sm" color="#2b5a72">• OCI/Visa documentation</Text>
                              </HStack>
                            </VStack>
                          </Box>
                        </VStack>

                        {/* Help Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(193, 154, 108, 0.1), rgba(166, 176, 166, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(193, 154, 108, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">💬</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Questions about documentation? We&apos;re here to help - just reach out!
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                  </Grid>

                  {/* Packing Essentials - Consolidated Card */}
                  <Box
                    p={{ base: "6", md: "8" }}
                    bg="rgba(255, 255, 255, 0.15)"
                    backdropFilter="blur(10px) saturate(130%)"
                    borderRadius="2xl"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    maxW="4xl"
                    mx="auto"
                  >
                    <VStack align="start" gap="6">
                      {/* Header Section */}
                      <VStack align="start" gap="2" w="full">
                        <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                          Essential Packing List
                        </Heading>
                        <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                          🎆 Everything You Need for January Weather
                        </Text>
                      </VStack>
                      
                      {/* Details Section */}
                      <VStack gap="6" w="full">
                        {/* Packing Essentials */}
                        <Box
                          p="6"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack gap="4" w="full">
                            <Text fontSize="lg" color="#1f576e" fontWeight="bold" textAlign="center">
                              Essential Items to Pack
                            </Text>
                            <Grid 
                              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                              gap="6"
                            >
                              {weatherEssentials.map((essential, index) => (
                                <HStack key={index} align="start" gap="4">
                                  <Text fontSize="3xl" lineHeight="1">
                                    {essential.icon}
                                  </Text>
                                  <VStack align="start" gap="1" flex="1">
                                    <Text fontSize="lg" color="#1f576e" fontWeight="bold">
                                      {essential.item}
                                    </Text>
                                    <Text fontSize="md" color="#2b5a72" lineHeight="1.5">
                                      {essential.description}
                                    </Text>
                                  </VStack>
                                </HStack>
                              ))}
                            </Grid>
                          </VStack>
                        </Box>
                        
                        {/* Wedding Attire Quick Note */}
                        <Box
                          p="4"
                          bg="rgba(232, 180, 184, 0.08)"
                          backdropFilter="blur(3px)"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.15)"
                          w="full"
                        >
                          <HStack gap="3" align="center" justify="center">
                            <Text fontSize="2xl">👗</Text>
                            <Text fontSize="md" color="#2b5a72" textAlign="center">
                              <strong>Wedding Attire:</strong> Visit our{' '}
                              <Link href="/dress-code" style={{ color: '#E8B4B8', textDecoration: 'underline', fontWeight: '600' }}>
                                Dress Code Guide
                              </Link>{' '}
                              for outfit inspiration and guidelines!
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                      
                      {/* Highlight Section */}
                      <Box
                        p="5"
                        bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                        borderRadius="xl"
                        border="1px solid rgba(232, 180, 184, 0.2)"
                        w="full"
                      >
                        <HStack gap="4" align="center" justify="center">
                          <Text fontSize="2xl">🌟</Text>
                          <Text fontSize="md" color="#1f576e" fontWeight="600" textAlign="center">
                            Pack light and comfortable - we want you to enjoy every moment of our celebration!
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>

                </Box>

                {/* Money & Connectivity */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Money & Connectivity
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                    mb="6"
                  >
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Currency Exchange
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            💱 Money Matters Made Easy
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Current Rate:</strong> 1 EUR ≈ ₹102-104
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Best Methods:</strong> Airport forex counters or major bank branches
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>ATMs:</strong> Available in Karjat (SBI, ICICI, HDFC, Axis)
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(193, 154, 108, 0.1), rgba(166, 176, 166, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(193, 154, 108, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">💳</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Visa/Mastercard accepted at Oleander Farms
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Connectivity Options
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            📱 Stay Connected
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Tourist SIMs:</strong> Available at airports (Airtel, Jio recommended) - ₹249-299 for 1.5-2GB/day (28 days)
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Airalo eSIM India:</strong> 1GB/7days ($4.50), 3GB/30days ($11), 5GB/30days ($16), 10GB/30days ($26)
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>International Roaming:</strong> Coordinate with your carrier for best rates
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">📶</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Excellent coverage at Oleander Farms
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Grid>

                </Box>

                {/* Transportation & Travel Assistance */}
                <Box>
                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Transportation & Travel Assistance
                  </Heading>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                  >
                    {/* Transportation Options */}
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading
                            fontSize={{ base: "2xl", md: "3xl" }}
                            color="#1f576e"
                            fontFamily="'Aparajita', serif"
                            fontWeight="bold"
                          >
                            Getting to the Venue
                          </Heading>
                          <Text
                            fontSize="lg"
                            color="#1f576e"
                            fontWeight="600"
                            opacity="0.8"
                          >
                            🚗 Multiple convenient options
                          </Text>
                        </VStack>

                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Let us pick you up!</strong> We&apos;re organizing comfortable shuttle service from Mumbai Airport - just let us know your flight details
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Prefer your own ride?</strong> Perfect! Many guests enjoy the scenic 2-hour drive from Mumbai (68-71km)
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Flying into Pune?</strong> That works too! It&apos;s a beautiful 1.5-hour drive through the countryside (104km)
                            </Text>
                          </VStack>
                        </Box>

                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(166, 176, 166, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(166, 176, 166, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🎭</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              The venue is only 2 hours from Mumbai - arrive relaxed and ready to celebrate!
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    {/* Travel Agent Assistance */}
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading
                            fontSize={{ base: "2xl", md: "3xl" }}
                            color="#1f576e"
                            fontFamily="'Aparajita', serif"
                            fontWeight="bold"
                          >
                            Alifiya Karachiwala
                          </Heading>
                          <Text
                            fontSize="lg"
                            color="#1f576e"
                            fontWeight="600"
                            opacity="0.8"
                          >
                            ✈️ Your Travel Planning Partner
                          </Text>
                        </VStack>

                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Services:</strong> Flight bookings, pan-India excursions, car rentals, and all transportation needs
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Contact:</strong>{' '}
                              <a
                                href="tel:+919820188682"
                                style={{
                                  color: '#E8B4B8',
                                  textDecoration: 'underline',
                                  fontWeight: '600'
                                }}
                              >
                                +91 98201 88682
                              </a>
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>International guests:</strong> WhatsApp preferred for easy communication
                            </Text>
                          </VStack>
                        </Box>

                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">💬</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Alifiya can help arrange your entire trip - from flights to local sightseeing!
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Grid>
                </Box>
              </VStack>
            )}

            {/* Venue & Local Info Section */}
            {activeSection === 'venue-local' && (
              <VStack gap="8" align="stretch">
                {/* Hotel Overview */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Hotel Overview
                  </Heading>
                  <VStack gap="8" align="stretch">
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Oleander Farms Overview
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            🏛️ Luxury Resort Experience
                          </Text>
                        </VStack>
                        
                        {/* Details Section - Two Column Layout */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="6" w="full">
                            {/* Left Column - Venue Details */}
                            <VStack align="start" gap="3" w="full">
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <strong>Location:</strong> 180-acre luxury resort in Western Ghats, Karjat
                              </Text>
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <strong>Address:</strong> Karjat Chowk Road, Wavarle Village, Khalapur, Karjat 410201
                              </Text>
                              <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                                <strong>Amenities:</strong> Infinity pool, spa, multiple dining venues
                              </Text>
                            </VStack>
                            
                            {/* Right Column - Google Maps Embed */}
                            <VStack align="start" gap="3" w="full">
                              <Box
                                w="full"
                                h="200px"
                                borderRadius="lg"
                                overflow="hidden"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                position="relative"
                              >
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968777.477318!2d73.2940524!3d18.9148418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f5!3m3!1m2!1s0x3be7fb6826b24a5f%3A0x54850d6bd73b6698!2sOleander%20Farms%20Luxury%20Resort%20in%20Karjat!5e0!3m2!1sen!2sin!4v1735317600000!5m2!1sen!2sin"
                                  width="100%"
                                  height="100%"
                                  style={{ border: 0 }}
                                  allowFullScreen
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  title="Oleander Farms Location"
                                />
                              </Box>
                              <a 
                                href="https://maps.app.goo.gl/aKSjmJPfpQJjZnzt5" 
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", width: "100%" }}
                              >
                                <HStack 
                                  gap="2" 
                                  p="2" 
                                  bg="rgba(31, 87, 110, 0.1)" 
                                  borderRadius="lg"
                                  border="1px solid rgba(31, 87, 110, 0.2)"
                                  _hover={{
                                    bg: "rgba(31, 87, 110, 0.15)",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 4px 12px rgba(31, 87, 110, 0.2)"
                                  }}
                                  transition="all 0.3s ease"
                                  cursor="pointer"
                                  justify="center"
                                >
                                  <Text fontSize="sm">📍</Text>
                                  <Text fontSize="xs" color="#1f576e" fontWeight="600">
                                    Open in Google Maps
                                  </Text>
                                </HStack>
                              </a>
                            </VStack>
                          </Grid>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🌊</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              A magical destination where luxury meets nature&apos;s beauty
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>

                {/* Hotel Services */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Hotel Services
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                    gap="6"
                  >
                    {/* Room Services Card */}
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Room Services
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            🚪 Your comfort needs
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Available:</strong> 24-hour room service for all your needs
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Housekeeping:</strong> Daily cleaning and maintenance
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Laundry:</strong> Professional dry cleaning & wedding attire pressing
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🛏️</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Available 24/7 for your comfort
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    {/* Safety & Security Card */}
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Safety & Security
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            🔒 Your peace of mind
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Security:</strong> 24/7 front desk & professional security team
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Storage:</strong> In-room safes & secure document storage
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Luggage:</strong> Safe storage facilities for all belongings
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(166, 176, 166, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(166, 176, 166, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🛡️</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Secure and protected environment
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    {/* Guest Services Card */}
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Guest Services
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            🏨 Concierge assistance
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Currency:</strong> Onsite exchange & financial assistance
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Connectivity:</strong> Free high-speed WiFi throughout resort
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Support:</strong> Transportation coordination & 24/7 medical assistance
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(193, 154, 108, 0.1), rgba(232, 180, 184, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(193, 154, 108, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🎆</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Dedicated wedding coordination team
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Grid>
                </Box>
              </VStack>
            )}

            {/* Wedding Schedule Section */}
            {activeSection === 'wedding-schedule' && (
              <VStack gap="8" align="stretch">
                {/* Schedule Overview */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Wedding Weekend Schedule
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    gap="6"
                  >
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            January 14, 2026
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            Tuesday - Welcome Day
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            Arrival & welcome celebrations. Evening will kick off with Mehendi & Welcome Dinner.
                          </Text>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🛬</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Recommended arrival day
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            January 15, 2026
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            Wednesday - Wedding Day
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            Morning Haldi, sacred wedding ceremony, and evening celebration. The main event!
                          </Text>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(193, 154, 108, 0.1), rgba(232, 180, 184, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(193, 154, 108, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">💒</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Haldi, Wedding & After Party
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            January 16, 2026
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            Thursday - Sangeet Day
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            Relax, recharge, and prepare for tonight&apos;s grand Sangeet with music and dancing!
                          </Text>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(166, 176, 166, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(166, 176, 166, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🎵</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Evening Sangeet celebration
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Grid>
                </Box>

                {/* Emergency Contacts & Logistics */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Emergency Contacts & Day-of Logistics
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                  >
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Emergency Contacts
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            📞 24/7 support available
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Wedding Coordinator:</strong> Details will be shared before event
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Venue Contact:</strong> Oleander Farms front desk
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Medical Emergency:</strong> Local hospital information provided on arrival
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🚨</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              WhatsApp group for real-time updates
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Day-of Logistics
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            📋 Essential information
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Check-in:</strong> Passport + visa documentation required
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Transportation:</strong> Shuttle schedules provided on arrival
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Event Updates:</strong> Real-time notifications via WhatsApp group
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(166, 176, 166, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(166, 176, 166, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">📱</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Detailed timeline shared 2 weeks before
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Grid>
                </Box>
              </VStack>
            )}

            {/* FAQ & Support Section */}
            {activeSection === 'faq-support' && (
              <VStack gap="8" align="stretch">
                {/* Contact Information */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Contact Information
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                  >
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Wedding Queries
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            💌 Personal assistance
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Have questions?</strong> Please reach out to us directly! We love hearing from you and want to make sure you have everything you need
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>We&apos;re here to help with:</strong> Travel planning, special requests, or anything else that&apos;ll make your experience amazing
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">💬</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              We&apos;re always here to help!
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Venue Support
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            🏨 Oleander Farms assistance
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Oleander Farms:</strong> Direct venue contact for room service, amenities, and facility questions
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Concierge:</strong> Available 24/7 for guest services and local recommendations
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(193, 154, 108, 0.1), rgba(232, 180, 184, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(193, 154, 108, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🛎️</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Luxury hospitality at your service
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Grid>
                </Box>

                {/* Frequently Asked Questions */}
                <Box>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    Frequently Asked Questions
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                  >
                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            General Questions
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            ❓ Common queries
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Q: Are children welcome?</strong><br />
                              A: Absolutely! Family-friendly facilities and activities available.
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Q: Are medical facilities available nearby?</strong><br />
                              A: Yes, medical facilities are available near Oleander Farms.
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Q: Is laundry service available?</strong><br />
                              A: Yes, laundry services are available with at least 6 hours turnaround time.
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(166, 176, 166, 0.1), rgba(193, 154, 108, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(166, 176, 166, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🏠</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              Family-friendly venue with all amenities
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>

                    <Box
                      p={{ base: "6", md: "8" }}
                      bg="rgba(255, 255, 255, 0.15)"
                      backdropFilter="blur(10px) saturate(130%)"
                      borderRadius="2xl"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                    >
                      <VStack align="start" gap="6">
                        {/* Header Section */}
                        <VStack align="start" gap="2" w="full">
                          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="#1f576e" fontFamily="'Aparajita', serif" fontWeight="bold">
                            Travel & Logistics
                          </Heading>
                          <Text fontSize="lg" color="#1f576e" fontWeight="600" opacity="0.8">
                            ✈️ Travel support
                          </Text>
                        </VStack>
                        
                        {/* Details Section */}
                        <Box
                          p="4"
                          bg="rgba(255, 255, 255, 0.1)"
                          backdropFilter="blur(5px)"
                          borderRadius="xl"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          w="full"
                        >
                          <VStack align="start" gap="3" w="full">
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Q: Can I stay extra nights at this beautiful venue?</strong><br />
                              A: Absolutely! We&apos;d love for you to extend your stay. Just let us know early since the venue books up quickly during wedding season.
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Q: What if my dietary needs change?</strong><br />
                              A: No worries at all! Just give us a heads up and we&apos;ll make sure the kitchen takes wonderful care of you.
                            </Text>
                            <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                              <strong>Q: My flight got delayed - what should I do?</strong><br />
                              A: Don&apos;t stress! Just shoot us a message and we&apos;ll adjust your pickup time. These things happen!
                            </Text>
                          </VStack>
                        </Box>
                        
                        {/* Highlight Section */}
                        <Box
                          p="4"
                          bgGradient="linear(to-r, rgba(232, 180, 184, 0.1), rgba(166, 176, 166, 0.1))"
                          borderRadius="xl"
                          border="1px solid rgba(232, 180, 184, 0.2)"
                          w="full"
                        >
                          <HStack gap="3" align="center">
                            <Text fontSize="2xl">🤝</Text>
                            <Text fontSize="sm" color="#1f576e" fontWeight="600">
                              We&apos;re flexible and here to help with any changes
                            </Text>
                          </HStack>
                        </Box>
                      </VStack>
                    </Box>
                  </Grid>
                </Box>
              </VStack>
            )}
          </motion.div>
        </Container>
      </Box>
    </BackgroundWrapper>
  );
}