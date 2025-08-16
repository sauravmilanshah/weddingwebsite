'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button,
  HStack,
  VStack,
  Grid
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Constants  
const SCROLL_THRESHOLD = 50;
const COUNTDOWN_UPDATE_INTERVAL = 1000;
const WEDDING_DATE = '2026-01-14T00:00:00';

const IndianWeddingFlowerShower = () => {
  const [showPetals, setShowPetals] = useState(true);

  useEffect(() => {
    // Stop the animation after 5 seconds
    const timer = setTimeout(() => {
      setShowPetals(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showPetals) return;

    const flowerTypes = [
      { type: 'white-petal', colors: ['white'], weight: 40 },
      { type: 'pink-petal', colors: ['pink'], weight: 30 },
      { type: 'red-petal', colors: ['red'], weight: 30 }
    ];

    const createPetal = () => {
      const petal = document.createElement('div');
      
      // Select flower type based on weight
      const rand = Math.random() * 100;
      let selectedFlower;
      if (rand < 40) selectedFlower = flowerTypes[0]; // white
      else if (rand < 70) selectedFlower = flowerTypes[1]; // pink  
      else selectedFlower = flowerTypes[2]; // red

      const color = selectedFlower.colors[Math.floor(Math.random() * selectedFlower.colors.length)];
      const isSmall = Math.random() > 0.7; // 30% chance of small petals for intensity
      const driftDirection = Math.random() > 0.6 ? (Math.random() > 0.5 ? 'drift-left' : 'drift-right') : '';
      
      petal.className = `flower-petal ${selectedFlower.type} ${color} ${isSmall ? 'small' : ''} ${driftDirection}`;
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = (Math.random() * 2.5 + 1.5) + 's'; // Faster fall
      petal.style.animationDelay = Math.random() * 1 + 's'; // Less delay
      
      // Add some rotation variation
      petal.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(petal);

      // Remove petal after animation
      setTimeout(() => {
        if (petal.parentNode) {
          petal.parentNode.removeChild(petal);
        }
      }, 6000);
    };

    // MAXIMUM intensity - create petals every 25ms for first 2 seconds, then every 50ms
    // Absolutely massive shower for first 2 seconds (40 petals per second!)
    const interval1 = setInterval(createPetal, 25);
    
    setTimeout(() => {
      clearInterval(interval1);
      // Intense shower for remaining 3 seconds (20 petals per second)
      const interval2 = setInterval(createPetal, 50);
      
      setTimeout(() => {
        clearInterval(interval2);
      }, 3000);
    }, 2000);

    return () => {
      clearInterval(interval1);
    };
  }, [showPetals]);

  return null;
};

const Navigation = ({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) => {
  const navigation = [
    { name: 'Wedding Flow', href: 'wedding-invite' },
    { name: 'Dress Code', href: 'dress-code' },
    { name: 'Logistics', href: 'logistics' },
    { name: 'Things to do at Oleander', href: 'oleander' },
    { name: 'Travel Tips for Mumbai', href: 'travel-tips' }
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      {/* Main Navigation */}
      <Box
        as="nav"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="40"
        py={scrolled ? "2" : "4"}
        transform={scrolled ? "translateY(-100%)" : "translateY(0)"}
        transition="all 0.3s ease"
        aria-label="Main navigation"
      >
        {/* Logo - Positioned absolutely outside grid */}
        <Box
          position="absolute"
          top={scrolled ? "calc(50% + 8px)" : "calc(50% + 16px)"}
          left="12"
          transform="translateY(-50%)"
          display={{ 
            base: "none", 
            lg: scrolled ? "none" : "block" 
          }}
          transition="all 0.3s ease"
        >
          <Box position="relative" w="120px" h="120px" onClick={() => setCurrentPage('home')}>
            <Image
              src="/logo-transparent-refined.png"
              alt="Shivani & Saurav Wedding Logo"
              width={120}
              height={120}
              style={{
                objectFit: "contain",
                cursor: "pointer",
                filter: "drop-shadow(0 2px 8px rgba(31, 87, 110, 0.3))",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "drop-shadow(0 4px 12px rgba(31, 87, 110, 0.4))";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "drop-shadow(0 2px 8px rgba(31, 87, 110, 0.3))";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </Box>
        </Box>

        <Container maxW="full" p={0}>
          <Grid 
            templateColumns="1fr auto 1fr"
            alignItems="center" 
            w="100%" 
            h="10"
            gap={0}
            px="8"
            display={{ base: "none", lg: "grid" }}
          >
            {/* Empty space for logo - Column 1 */}
            <Box />

            {/* Navigation - Center - Column 2 */}
            <Box w="100%" py="2">
              <Box
                mx="auto"
                px="6"
                py="2"
                borderRadius="2xl"  
                bg="rgba(255, 255, 255, 0.1)"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.2)"
                boxShadow="0 4px 16px 0 rgba(31, 38, 135, 0.2)"
                w="fit-content"
                transition="all 0.3s ease"
                css={{
                  backdropFilter: "blur(4px) saturate(110%)",
                  WebkitBackdropFilter: "blur(4px) saturate(110%)"
                }}
                _hover={{
                  bg: "rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 20px 40px -5px rgba(31, 38, 135, 0.5)",
                  transform: "translateY(-2px)",
                }}
              >
                <Flex as="nav" gap={6} wrap="nowrap" align="center">
                  {/* Home Icon */}
                  <Button
                    onClick={() => setCurrentPage('home')}
                    variant="ghost"
                    px="3"
                    py="2"
                    borderRadius="md"
                    fontSize="xl"
                    fontWeight="bold"
                    color="#1f576e"
                    textShadow="0 1px 2px rgba(255,255,255,0.8)"
                    transition="all 0.2s ease"
                    border={currentPage === 'home' ? "2px solid #C19A6C" : "2px solid transparent"}
                    boxShadow={currentPage === 'home' ? "0 0 15px rgba(193, 154, 108, 0.4), 0 4px 12px rgba(193, 154, 108, 0.2)" : "none"}
                    _hover={{
                      color: "#1a4d63",
                      bg: "rgba(255, 255, 255, 0.15)",
                      textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                      transform: "translateY(-1px)",
                    }}
                    aria-label="Go to home page"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </Button>
                  
                  {navigation.map((item) => {
                    const isActive = currentPage === item.href;
                    return (
                      <Button
                        key={item.name}
                        onClick={() => setCurrentPage(item.href)}
                        variant="ghost"
                        px="3"
                        py="2"
                        borderRadius="md"
                        fontSize="xl"
                        fontWeight="bold"
                        color="#1f576e"
                        textShadow="0 1px 2px rgba(255,255,255,0.8)"
                        letterSpacing="0.02em"
                        transition="all 0.2s ease"
                        whiteSpace="nowrap"
                        fontFamily="'Aparajita', serif"
                        border={isActive ? "2px solid #C19A6C" : "2px solid transparent"}
                        boxShadow={isActive ? "0 0 15px rgba(193, 154, 108, 0.4), 0 4px 12px rgba(193, 154, 108, 0.2)" : "none"}
                        _hover={{
                          color: "#1a4d63",
                          bg: "rgba(255, 255, 255, 0.15)",
                          textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                          transform: "translateY(-1px)",
                        }}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
                </Flex>
              </Box>
            </Box>

          </Grid>

          {/* Mobile Layout: Menu Button Left, Logo Center */}
          <Flex 
            display={{ base: "flex", lg: "none" }} 
            justify="space-between" 
            align="center"
            p="4"
            position="relative"
          >
            {/* Menu Button - Left Side */}
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              aria-label="Toggle navigation menu"
              size="lg"
              p="4"
              fontSize="xl"
              color="#1f576e"
              bg="rgba(255, 255, 255, 0.1)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.2)"
              borderRadius="lg"
              boxShadow="0 4px 16px 0 rgba(31, 38, 135, 0.2)"
              css={{
                backdropFilter: "blur(4px) saturate(110%)",
                WebkitBackdropFilter: "blur(4px) saturate(110%)"
              }}
              _hover={{
                bg: "rgba(255, 255, 255, 0.15)",
                transform: "translateY(-1px)",
              }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </Button>
            
            {/* Logo - Center */}
            <Box 
              position="absolute" 
              left="50%" 
              transform="translateX(-50%)"
              display={(scrolled && currentPage === 'wedding-invite') ? "none" : "block"}
              transition="all 0.3s ease"
            >
              <Box 
                position="relative" 
                w="100px" 
                h="100px"
                onClick={() => setCurrentPage('home')}
                cursor="pointer"
              >
                <Image
                  src="/logo-transparent-refined.png"
                  alt="Shivani & Saurav Wedding Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>
            </Box>
            
            {/* Invisible spacer for balance */}
            <Box w="72px" h="56px" />
          </Flex>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <Box
              display={{ base: "block", lg: "none" }}
              mx="6"
              px="8"
              py="4"
              borderRadius="2xl"
              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(4px) saturate(110%)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.2)"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
            >
              <VStack gap="2" align="stretch">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    onClick={() => {
                      setCurrentPage(item.href);
                      setMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    p="3"
                    borderRadius="md"
                    fontWeight="medium"
                    color="gray.700"
                    transition="all 0.2s ease"
                    width="full"
                    justifyContent="flex-start"
                    _hover={{
                      bg: "rgba(232, 180, 184, 0.1)",
                      color: "gray.900",
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </VStack>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const targetTime = useMemo(() => targetDate.getTime(), [targetDate]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const difference = targetTime - now;

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }
  }, [targetTime]);

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, COUNTDOWN_UPDATE_INTERVAL);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <VStack gap={{ base: "1", md: "2" }}>
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        color="#1f576e"
        borderRadius="xl"
        p={{ base: "2", md: "4" }}
        minW={{ base: "45px", md: "60px" }}
        textAlign="center"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.2)"
        boxShadow="0 4px 16px 0 rgba(31, 38, 135, 0.2)"
        transition="all 0.3s ease"
        css={{
          backdropFilter: "blur(4px) saturate(110%)",
          WebkitBackdropFilter: "blur(4px) saturate(110%)"
        }}
        _hover={{
          bg: "rgba(255, 255, 255, 0.15)",
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 20px 40px -5px rgba(31, 38, 135, 0.5)",
        }}
        aria-labelledby={`${label.toLowerCase()}-label`}
      >
        <Text 
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="bold" 
          fontVariantNumeric="tabular-nums"
          fontFamily="'Aparajita', serif"
          textShadow="0 2px 4px rgba(255,255,255,0.8)"
        >
          {value.toString().padStart(2, '0')}
        </Text>
      </Box>
      <Text
        id={`${label.toLowerCase()}-label`}
        fontSize={{ base: "sm", md: "md", lg: "xl" }}
        fontWeight="bold"
        color="#1f576e"
        textTransform="uppercase"
        letterSpacing="wide"
        fontFamily="'Aparajita', serif"
        textShadow="0 1px 2px rgba(255,255,255,0.8)"
      >
        {label}
      </Text>
    </VStack>
  );

  return (
    <HStack 
      gap={{ base: "2", sm: "4", md: "6" }}
      justify="center" 
      role="timer" 
      aria-live="polite" 
      aria-label="Wedding countdown timer"
      wrap={{ base: "wrap", md: "nowrap" }}
    >
      <TimeUnit value={timeLeft.days} label="Days" />
      <Text color="gray.400" fontSize={{ base: "md", md: "lg", lg: "xl" }} display={{ base: "none", md: "block" }}>•</Text>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <Text color="gray.400" fontSize={{ base: "md", md: "lg", lg: "xl" }} display={{ base: "none", md: "block" }}>•</Text>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <Text color="gray.400" fontSize={{ base: "md", md: "lg", lg: "xl" }} display={{ base: "none", md: "block" }}>•</Text>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </HStack>
  );
};

// Things to do at Oleander Farms Page Component
const OleanderPage = () => {
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
  );
};

// Travel Tips for Mumbai Page Component
const TravelTipsPage = () => {
  const [activeSection, setActiveSection] = useState('hotels');
  
  const sections = [
    { id: 'hotels', name: 'Hotels', icon: '🏨' },
    { id: 'restaurants', name: 'Restaurants', icon: '🍽️' },
    { id: 'shopping', name: 'Shopping & Landmarks', icon: '🛍️' },
    { id: 'experiences', name: 'Unique Experiences', icon: '🎭' },
    { id: 'practical', name: 'Practical Tips', icon: '✈️' }
  ];

  const hotels = [
    {
      name: "The Taj Mahal Palace",
      area: "Colaba",
      description: "Heritage icon with sea views and grand service",
      highlight: "Award-winning Jiva Spa with many top Mumbai restaurants including Wasabi, Souk",
      address: "Apollo Bunder, Mumbai 400001 (Colaba)"
    },
    {
      name: "Trident Nariman Point",
      area: "Marine Drive", 
      description: "Panoramic bay views, luxury amenities",
      highlight: "Well-appointed spa with multiple on-site dining options",
      address: "Marine Drive, Nariman Point, Mumbai 400021"
    },
    {
      name: "Four Seasons Hotel",
      area: "Worli",
      description: "Rooftop bar (AER), modern luxury",
      highlight: "AER rooftop, Opus (pan-Asian)",
      address: "1/136 Dr. E. Moses Road, Worli, Mumbai 400018"
    },
    {
      name: "Taj President (Vivanta by Taj)",
      area: "Cuffe Parade",
      description: "Elegant hotel in prestigious location",
      highlight: "Classic Taj hospitality with modern amenities",
      address: "90, Cuffe Parade, Mumbai 400005"
    },
    {
      name: "InterContinental Marine Drive",
      area: "Marine Drive",
      description: "Best rooftop views, excellent location",
      highlight: "Panoramic ocean views with Mediterranean-inspired menu at Dome",
      address: "135 Marine Drive, Mumbai 400020"
    }
  ];

  const restaurants = [
    {
      category: "Saurav & Shivani's Personal Favorites",
      places: [
        {
          name: "Trishna",
          location: "Fort",
          description: "Old-school, world-famous for butter garlic crab",
          recommendedBy: "Shivani",
          personalNote: "The Harjani family has a standing reservation here. Dad orders the same crab dish every single time - we've given up trying to expand his culinary horizons. At this point, the waiters just nod and bring 'the usual' 🦀"
        },
        {
          name: "Gigis",
          location: "Bandra",
          description: "Contemporary dining with Bollywood vibes",
          recommendedBy: "Shivani",
          personalNote: "Where Bollywood meets food and pretends to be healthy! Perfect for when you want to feel fancy while eating comfort food 🎬"
        },
        {
          name: "Status",
          location: "Bandra",
          description: "Classic Mumbai restaurant with traditional Indian cuisine",
          recommendedBy: "Shivani",
          personalNote: "Papa's favorite lunch spot! You'll probably find him here on any weekday afternoon, enjoying his thali and sharing stories with the regulars. It's like his second office! 👨‍💼"
        },
        {
          name: "Foo",
          location: "Bandra",
          description: "Pan-Asian cuisine with creative presentations",
          recommendedBy: "Shivani & Saurav",
          personalNote: "Our 'I don't know what I want to eat' restaurant. The yellow curry and blue rice combo sounds weird but tastes like magic - trust us on this culinary adventure! 🌈"
        },
        {
          name: "Little Italy",
          location: "Bandra",
          description: "Italian cuisine in cozy setting",
          recommendedBy: "Saurav",
          personalNote: "My childhood obesity headquarters! Mom would drop me here thinking it was healthier than McDonald's. Spoiler alert: their pasta portions could feed a small Italian village 🍝"
        },
        {
          name: "Cream Centre",
          location: "Multiple locations",
          description: "Vegetarian Indian-Chinese and continental cuisine",
          recommendedBy: "Saurav",
          personalNote: "Home of the legendary Indian nachos that confused my American friends but converted them to the cause. Also, their chole bhatura could end world hunger - one plate feeds approximately 7 people 🌮"
        },
        {
          name: "Peshawri",
          location: "ITC Grand Central",
          description: "North Indian cuisine with rustic ambiance",
          recommendedBy: "Saurav",
          personalNote: "Their black dal is so good, I've considered writing poetry about it. It's like a warm hug from your grandmother, if your grandmother was a world-class chef 🖤"
        },
        {
          name: "Burma Burma",
          location: "Multiple locations",
          description: "Vegetarian Burmese cuisine",
          recommendedBy: "Saurav",
          personalNote: "Finally, vegetarian food that doesn't make you miss meat! They've somehow made vegetables exciting - it's basically culinary witchcraft 🥗✨"
        }
      ]
    },
    {
      category: "Street Food (Safe for Tourists)",
      places: [
        {
          name: "Elco Pani Puri Centre",
          location: "Bandra",
          description: "Hugely popular, clean, all-veg chaat, air-conditioned option"
        },
        {
          name: "Swati Snacks",
          location: "Tardeo", 
          description: "Celebrity favorite for regional Gujarati/Maharashtrian snacks in hygienic setting"
        }
      ]
    },
    {
      category: "Seafood & Iconic Institutions",
      places: [
        {
          name: "Mahesh Lunch Home",
          location: "Fort/Juhu",
          description: "Go-to for Malvani specialties, legendary with locals"
        },
        {
          name: "Gajalee",
          location: "Vile Parle East",
          description: "For oysters, crab, and rustic coast vibes"
        },
        {
          name: "Leopold Cafe",
          location: "Colaba",
          description: "Iconic, historic, lively eclectic menu, bullet holes from 26/11"
        }
      ]
    },
    {
      category: "Rooftop/Views",
      places: [
        {
          name: "AER",
          location: "Four Seasons, Worli",
          description: "City and sea vistas, sophisticated cocktails; dress code applies"
        },
        {
          name: "Dome",
          location: "InterContinental Marine Drive",
          description: "Panoramic ocean views, Mediterranean-inspired menu"
        }
      ]
    }
  ];

  const shopping = [
    {
      category: "Luxury Shopping",
      items: [
        {
          name: "Palladium Mall",
          location: "462 Senapati Bapat Marg, Lower Parel, Mumbai 400013",
          description: "Mumbai's most upscale mall",
          tip: "Perfect for luxury international brands"
        }
      ]
    },
    {
      category: "Culture & Street Shopping",
      items: [
        {
          name: "Kala Ghoda",
          location: "Fort, Mumbai 400001",
          description: "Art & culture precinct with boutique shops, galleries, cafes",
          tip: "Perfect for afternoon gallery hopping and unique finds"
        },
        {
          name: "Colaba Causeway",
          location: "Colaba, Mumbai 400001",
          description: "Famous for street shopping, boutiques, and accessories",
          tip: "Great for souvenirs and local fashion"
        }
      ]
    }
  ];

  const experiences = [
    {
      category: "Must-See Mumbai Landmarks",
      items: [
        {
          name: "Gateway of India",
          location: "Apollo Bunder, Colaba, Mumbai 400001",
          description: "Iconic Mumbai landmark and must-see historic monument",
          tip: "Early morning for fewer crowds and best photos"
        },
        {
          name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
          location: "159-161 Mahatma Gandhi Rd, Fort, Mumbai 400023",
          description: "Classic museum (formerly Prince of Wales Museum) with extensive Indian art and artifacts",
          tip: "Allow 2-3 hours for a proper visit"
        },
        {
          name: "Marine Drive",
          location: "Nariman Point, Mumbai 400021",
          description: "Must-see promenade with iconic 'Queen's Necklace' view",
          tip: "Perfect for sunset walks, very safe area"
        }
      ]
    },
    {
      category: "Art & Culture",
      items: [
        {
          name: "Kala Ghoda Art Precinct",
          location: "Fort, Mumbai 400001",
          description: "Arts & culture hub with galleries, cafes, and street art",
          tip: "Perfect for afternoon exploration and gallery hopping"
        },
        {
          name: "Colaba Causeway",
          location: "Colaba, Mumbai 400001",
          description: "Iconic shopping and walking area with street vendors and cafes",
          tip: "Great for people watching and street food"
        }
      ]
    }
  ];

  const practicalTips = [
    {
      title: "Weather in January 2026", 
      content: "Perfect weather! Daytime: 28–30°C, Night: 19–22°C. No rain expected - it's the dry season. Pack light cottons and a light jacket for evenings.",
      icon: "☀️"
    },
    {
      title: "Getting Around Mumbai",
      content: "Use app-based cabs (Uber/Ola) for transparency and safety. Mumbai is generally very safe for tourists. The areas we've recommended (Colaba, Fort, Marine Drive) are all pedestrian-friendly.",
      icon: "🚗"
    }
  ];

  return (
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
              Travel Tips for Mumbai
            </Heading>
            <Box w={{ base: "40", md: "48" }} h="2px" bg="#1f576e" opacity="0.6" mx="auto" />
            <Text 
              fontSize={{ base: "lg", md: "xl" }}
              color="#2b5a72"
              maxW="2xl"
              textShadow="0 2px 4px rgba(255,255,255,0.7)"
              fontWeight="500"
            >
              Our personal guide to exploring the incredible city of Mumbai! 
              Discover our favorite spots with insider tips from Saurav & Shivani.
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
          {activeSection === 'hotels' && (
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap="6"
            >
              {hotels.map((hotel, index) => (
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
                    <VStack align="start" gap="1" w="full">
                      <Heading 
                        fontSize={{ base: "xl", md: "2xl" }}
                        color="#1f576e"
                        fontFamily="'Aparajita', serif"
                      >
                        {hotel.name}
                      </Heading>
                      <Text fontSize="md" color="#2b5a72" fontWeight="600">
                        📍 {hotel.area}
                      </Text>
                      {hotel.address && (
                        <Text fontSize="sm" color="#2b5a72">
                          {hotel.address}
                        </Text>
                      )}
                    </VStack>
                    
                    <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                      {hotel.description}
                    </Text>
                    
                    <Box
                      p="3"
                      bg="rgba(232, 180, 184, 0.1)"
                      borderRadius="lg"
                      border="1px solid rgba(232, 180, 184, 0.2)"
                    >
                      <Text fontSize="sm" color="#1f576e" fontWeight="600" mb="1">
                        💫 {hotel.highlight}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              ))}
            </Grid>
          )}

          {activeSection === 'restaurants' && (
            <VStack gap="8" align="stretch">
              {restaurants.map((category, categoryIndex) => (
                <Box key={categoryIndex}>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    {category.category}
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                  >
                    {category.places.map((place, placeIndex) => (
                      <Box
                        key={placeIndex}
                        p={{ base: "5", md: "6" }}
                        bg="rgba(255, 255, 255, 0.15)"
                        backdropFilter="blur(10px) saturate(130%)"
                        borderRadius="xl"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        boxShadow="0 6px 24px rgba(31, 87, 110, 0.1)"
                      >
                        <VStack align="start" gap="3" w="full">
                          <HStack justify="space-between" align="start" w="full">
                            <Heading 
                              fontSize={{ base: "xl", md: "2xl" }}
                              color="#1f576e"
                              fontFamily="'Aparajita', serif"
                              flex="1"
                            >
                              {place.name}
                            </Heading>
                            {'recommendedBy' in place && place.recommendedBy && (
                              <Box
                                px="3"
                                py="1"
                                bg="rgba(193, 154, 108, 0.2)"
                                borderRadius="full"
                                border="1px solid rgba(193, 154, 108, 0.3)"
                                flexShrink="0"
                              >
                                <Text fontSize="xs" color="#1f576e" fontWeight="600">
                                  {'recommendedBy' in place ? place.recommendedBy : ''}&apos;s pick
                                </Text>
                              </Box>
                            )}
                          </HStack>
                          <Text fontSize="sm" color="#2b5a72" fontWeight="600">
                            📍 {place.location}
                          </Text>
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            {place.description}
                          </Text>
                          {'personalNote' in place && place.personalNote && (
                            <Box
                              p="3"
                              bg="rgba(245, 245, 240, 0.2)"
                              borderRadius="lg"
                              border="1px solid rgba(245, 245, 240, 0.3)"
                              borderLeft="4px solid rgba(232, 180, 184, 0.5)"
                            >
                              <Text fontSize="sm" color="#1f576e" fontStyle="italic">
                                &quot;{place.personalNote}&quot; - {'recommendedBy' in place ? place.recommendedBy : ''}
                              </Text>
                            </Box>
                          )}
                        </VStack>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              ))}
            </VStack>
          )}

          {activeSection === 'shopping' && (
            <VStack gap="8" align="stretch">
              {shopping.map((category, categoryIndex) => (
                <Box key={categoryIndex}>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    {category.category}
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                  >
                    {category.items.map((item, itemIndex) => (
                      <Box
                        key={itemIndex}
                        p={{ base: "5", md: "6" }}
                        bg="rgba(255, 255, 255, 0.15)"
                        backdropFilter="blur(10px) saturate(130%)"
                        borderRadius="xl"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        boxShadow="0 6px 24px rgba(31, 87, 110, 0.1)"
                      >
                        <VStack align="start" gap="3">
                          <Heading 
                            fontSize={{ base: "lg", md: "xl" }}
                            color="#1f576e"
                            fontFamily="'Aparajita', serif"
                          >
                            {item.name}
                          </Heading>
                          {item.location && (
                            <Text fontSize="sm" color="#2b5a72" fontWeight="600">
                              📍 {item.location}
                            </Text>
                          )}
                          
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            {item.description}
                          </Text>
                          
                          {item.tip && (
                            <Box
                              p="2"
                              bg="rgba(193, 154, 108, 0.1)"
                              borderRadius="md"
                              border="1px solid rgba(193, 154, 108, 0.2)"
                            >
                              <Text fontSize="sm" color="#1f576e" fontWeight="600">
                                💡 {item.tip}
                              </Text>
                            </Box>
                          )}
                        </VStack>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              ))}
            </VStack>
          )}

          {activeSection === 'experiences' && (
            <VStack gap="8" align="stretch">
              {experiences.map((category, categoryIndex) => (
                <Box key={categoryIndex}>
                  <Heading 
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    mb="6"
                    textAlign="center"
                  >
                    {category.category}
                  </Heading>
                  <Grid 
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap="6"
                  >
                    {category.items.map((item, itemIndex) => (
                      <Box
                        key={itemIndex}
                        p={{ base: "5", md: "6" }}
                        bg="rgba(255, 255, 255, 0.15)"
                        backdropFilter="blur(10px) saturate(130%)"
                        borderRadius="xl"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        boxShadow="0 6px 24px rgba(31, 87, 110, 0.1)"
                      >
                        <VStack align="start" gap="3">
                          <Heading 
                            fontSize={{ base: "lg", md: "xl" }}
                            color="#1f576e"
                            fontFamily="'Aparajita', serif"
                          >
                            {item.name}
                          </Heading>
                          {item.location && (
                            <Text fontSize="sm" color="#2b5a72" fontWeight="600">
                              📍 {item.location}
                            </Text>
                          )}
                          {'locations' in item && (item as {locations: string}).locations && (
                            <Text fontSize="sm" color="#2b5a72" fontWeight="600">
                              📍 {(item as {locations: string}).locations}
                            </Text>
                          )}
                          
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            {item.description}
                          </Text>
                          
                          {item.tip && (
                            <Box
                              p="2"
                              bg="rgba(193, 154, 108, 0.1)"
                              borderRadius="md"
                              border="1px solid rgba(193, 154, 108, 0.2)"
                            >
                              <Text fontSize="sm" color="#1f576e" fontWeight="600">
                                💡 {item.tip}
                              </Text>
                            </Box>
                          )}
                        </VStack>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              ))}
            </VStack>
          )}

          {activeSection === 'practical' && (
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap="6"
            >
              {practicalTips.map((tip, index) => (
                <Box
                  key={index}
                  p={{ base: "6", md: "8" }}
                  bg="rgba(255, 255, 255, 0.15)"
                  backdropFilter="blur(10px) saturate(130%)"
                  borderRadius="2xl"
                  border="1px solid rgba(255, 255, 255, 0.2)"
                  boxShadow="0 8px 32px rgba(31, 87, 110, 0.1)"
                >
                  <HStack align="start" gap="4">
                    <Text fontSize="3xl">{tip.icon}</Text>
                    <VStack align="start" gap="2" flex="1">
                      <Heading 
                        fontSize={{ base: "xl", md: "2xl" }}
                        color="#1f576e"
                        fontFamily="'Aparajita', serif"
                      >
                        {tip.title}
                      </Heading>
                      <Text 
                        fontSize="md" 
                        color="#2b5a72" 
                        lineHeight="1.6"
                      >
                        {tip.content}
                      </Text>
                    </VStack>
                  </HStack>
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
                Need More Help? 🤗
              </Heading>
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                color="#2b5a72"
                maxW="2xl"
                lineHeight="1.6"
              >
                These are just our personal favorites! For more detailed itineraries, 
                specific bookings, or any questions about Mumbai, feel free to reach out to us directly. 
                We&apos;re so excited to share our favorite city with you!
              </Text>
              <Text 
                fontSize="sm"
                color="#1f576e"
                fontStyle="italic"
                mt="2"
              >
                With love, Saurav & Shivani ❤️
              </Text>
            </VStack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showIconCredits, setShowIconCredits] = useState(false);
  
  const renderCurrentPage = () => {
    if (currentPage === 'wedding-invite') {
      return <WeddingInvitePage />;
    } else if (currentPage === 'dress-code') {
      return <DressCodePage />;
    } else if (currentPage === 'travel-tips') {
      return <TravelTipsPage />;
    } else if (currentPage === 'oleander') {
      return <OleanderPage />;
    }
    // For now, return the hero section for all other pages
    return <HeroSection setCurrentPage={setCurrentPage} />;
  };

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* Indian Wedding Flower Shower */}
      <IndianWeddingFlowerShower />
      
      {/* Background Image */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage={
          currentPage === 'wedding-invite' ? "url('/background2.png')" : 
          currentPage === 'dress-code' ? "url('/background2.png')" : 
          currentPage === 'travel-tips' ? "url('/background2.png')" : 
          currentPage === 'oleander' ? "url('/background2.png')" :
          "url('/wedding-background.png')"
        }
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        opacity="0.7"
      />

      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {renderCurrentPage()}

      {/* Collapsible Icon Attribution */}
      <Box
        position="fixed"
        bottom="2"
        right="2"
        zIndex="1000"
        opacity="0.6"
        _hover={{ opacity: "1" }}
        transition="all 0.2s"
      >
        {/* Toggle Button */}
        <Text
          fontSize="xs"
          color="#666"
          bg="rgba(255, 255, 255, 0.9)"
          px="2"
          py="1"
          borderRadius="md"
          cursor="pointer"
          userSelect="none"
          _hover={{ bg: "rgba(255, 255, 255, 1)" }}
          onClick={() => setShowIconCredits(!showIconCredits)}
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
            border="1px solid rgba(0, 0, 0, 0.1)"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
            p="3"
            maxW="280px"
            minW="260px"
          >
            <Text
              fontSize="xs"
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
    </Box>
  );
}

// Hero Section Component
const HeroSection = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const weddingDate = useMemo(() => new Date(WEDDING_DATE), []);

  return (
    <Box 
        as="main" 
        id="main-content"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px="6"
        pt={{ base: "8", md: "20" }}
        pb="0"
        position="relative"
        zIndex="10"
        role="main"
      >
        <Container maxW={{ base: "100%", sm: "xl", md: "2xl" }} px={{ base: "4", md: "6" }}>
          <Box 
            p={{ base: "4", md: "8" }}
            textAlign="center"
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="3xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
            boxShadow="0 4px 16px 0 rgba(31, 38, 135, 0.2)"
            transition="all 0.3s ease"
            css={{
              backdropFilter: "blur(4px) saturate(110%)",
              WebkitBackdropFilter: "blur(4px) saturate(110%)"
            }}
            _hover={{
              bg: "rgba(255, 255, 255, 0.15)",
              boxShadow: "0 20px 40px -5px rgba(31, 38, 135, 0.5)",
              transform: "translateY(-2px)",
            }}
          >
            {/* Date Range */}
            <VStack gap={{ base: "3", md: "6" }} mb={{ base: "4", md: "8" }}>
              <VStack gap="4">
                <VStack gap="0">
                  {/* Top decorative line */}
                  <Box w="133%" h="2px" bg="#1f576e" opacity="0.6" />
                  
                  <HStack gap={{ base: "3", md: "6" }} align="center" py={{ base: "2", md: "4" }} w="100%">
                    <Text 
                      fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "8xl" }}
                      fontWeight="normal" 
                      color="#b8860b"
                      textShadow="0 2px 4px rgba(255,255,255,0.8)"
                      fontVariantNumeric="tabular-nums"
                      fontFamily="'Wasted Vindey', cursive"
                      lineHeight="0.9"
                    >
                      14
                    </Text>
                    <Text 
                      fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                      fontWeight="bold" 
                      color="#1f576e"
                      textShadow="0 1px 2px rgba(255,255,255,0.8)"
                      textTransform="uppercase"
                      letterSpacing="0.3em"
                      fontFamily="'Aparajita', serif"
                      alignSelf="center"
                    >
                      to
                    </Text>
                    <Text 
                      fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "8xl" }}
                      fontWeight="normal" 
                      color="#b8860b"
                      textShadow="0 2px 4px rgba(255,255,255,0.8)"
                      fontVariantNumeric="tabular-nums"
                      fontFamily="'Wasted Vindey', cursive"
                      lineHeight="0.9"
                    >
                      16
                    </Text>
                  </HStack>
                  
                  {/* Bottom decorative line */}
                  <Box w="133%" h="2px" bg="#1f576e" opacity="0.6" />
                </VStack>
                
                <Text 
                  color="#1f576e"
                  textShadow="0 1px 2px rgba(255,255,255,0.8)"
                  fontWeight="bold"
                  letterSpacing="0.25em"
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                  textTransform="uppercase"
                  fontFamily="'Aparajita', serif"
                >
                  Jan 2026
                </Text>
              </VStack>
            </VStack>

            {/* Names */}
            <VStack gap={{ base: "4", md: "8" }} mb={{ base: "6", md: "10" }}>
              <VStack gap="4">
                <Heading 
                  fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "8xl" }}
                  fontWeight="normal"
                  color="#1f576e"
                  textShadow="0 2px 4px rgba(255,255,255,0.8)"
                  lineHeight="none"
                  letterSpacing="-0.02em"
                  fontFamily="'Bernhard Tango', cursive"
                >
                  Shivani <Text as="span" color="#1f576e" textShadow="0 2px 4px rgba(255,255,255,0.8)" fontFamily="'Bernhard Tango', cursive" fontWeight="normal">&</Text> Saurav
                </Heading>
              </VStack>
            </VStack>

            {/* Location */}
            <VStack gap={{ base: "4", md: "8" }} mb={{ base: "6", md: "10" }}>
              <VStack gap="1">
                <Text 
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  fontWeight="bold"
                  color="#1f576e"
                  textShadow="0 1px 2px rgba(255,255,255,0.8)"
                  textTransform="uppercase"
                  letterSpacing="0.15em"
                  fontFamily="'Aparajita', serif"
                >
                  Oleander Farms, Karjat
                </Text>
                <Text 
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  fontWeight="bold"
                  color="#1f576e"
                  textShadow="0 1px 2px rgba(255,255,255,0.8)"
                  textTransform="uppercase"
                  letterSpacing="0.2em"
                  fontFamily="'Aparajita', serif"
                >
                  India
                </Text>
              </VStack>
            </VStack>

            {/* Countdown Timer */}
            <VStack gap={{ base: "4", md: "8" }}>
              <CountdownTimer targetDate={weddingDate} />
            </VStack>

            {/* Call to Action */}
            <Box mt={{ base: "6", md: "10" }}>
              <Button
                size={{ base: "lg", md: "xl" }}
                bg="#1f576e"
                color="white"
                px={{ base: "6", md: "10" }}
                py={{ base: "4", md: "6" }}
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontWeight="bold"
                borderRadius="lg"
                fontFamily="'Aparajita', serif"
                boxShadow="0 3px 6px rgba(31,87,110,0.4)"
                _hover={{
                  bg: "#1a4d63",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(31,87,110,0.5)",
                }}
                transition="all 0.2s ease"
                onClick={() => setCurrentPage('wedding-invite')}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
  );
};

// Dress Code Page Component
const DressCodePage = () => {
  return (
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
                    width={32} 
                    height={32}
                    style={{ filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)' }}
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
                Think sophisticated fusion with a playful twist! We&apos;re talking rich jewel tones, elegant silhouettes with an Indian flair, and outfits that can transition from henna artistry to dinner dancing.{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  Darker colors work best
                </Text>
                {' '}as they won&apos;t show henna stains, and{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  Indo-western styles
                </Text>
                {' '}give you the perfect blend of comfort and cultural celebration.
              </Text>
              
              <VStack align="start" gap="3" w="full">
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Jodhpuri suits or bandgalas with darker jewel tones, kurta bundis with dhoti pants, or embroidered shirts with palazzo pants.
                </Text>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Flowing palazzo pants with embroidered kurtas, stylish dhoti pants with crop tops, or elegant sarees with contemporary blouses.
                </Text>
              </VStack>
              
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                color="#2b5a72"
                lineHeight="1.7"
                fontStyle="italic"
              >
                The goal? Look effortlessly chic while getting your hands beautifully decorated!
              </Text>
              
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
                      width={24} 
                      height={24}
                      style={{ filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)' }}
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
                    width={32} 
                    height={32}
                    style={{ filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)' }}
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
                Embrace the Mediterranean coastal vibe with effortless elegance! Picture yourself strolling through a Spanish courtyard - light, flowing fabrics that catch the breeze, natural textures, and that relaxed sophistication that says{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  &apos;vacation chic meets cultural celebration.&apos;
                </Text>
              </Text>
              
              <VStack align="start" gap="3" w="full">
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Linen pants with crisp shirts or Spanish-inspired kurta bundis. Light colors, breathable fabrics, effortlessly dapper.
                </Text>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Summer dresses that flow with movement or light kurtis in soft, natural fabrics.
                </Text>
              </VStack>
              
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                color="#2b5a72"
                lineHeight="1.7"
                fontStyle="italic"
              >
                The goal? Look like you belong in a dreamy Spanish villa while celebrating this joyful turmeric ceremony!
              </Text>
              
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
                      width={24} 
                      height={24}
                      style={{ filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)' }}
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
                    width={32} 
                    height={32}
                    style={{ filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)' }}
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
                Step into the sacred circle of eternal love with timeless Indian elegance! This is the moment where traditions come alive - think classic silhouettes, rich fabrics, and those{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  traditional light colors
                </Text>
                {' '}that have blessed countless generations of couples. Picture yourself as part of a beautiful tapestry of culture, where every thread tells a story of heritage and{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  formal reverence
                </Text>
                {' '}for this most sacred of ceremonies.
              </Text>
              
              <VStack align="start" gap="3" w="full">
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Classic sherwanis in ivory, cream, or soft gold, traditional achkans with silk churidars, or elegant kurta pajamas in pastel tones with rich embroidery.
                </Text>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Traditional sarees in light silks, lehengas in soft pastels with intricate work, or elegant anarkalis in ivory, blush, or champagne with traditional embellishments.
                </Text>
              </VStack>
              
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                color="#2b5a72"
                lineHeight="1.7"
                fontStyle="italic"
              >
                The goal? Honor the sacred traditions while looking absolutely radiant in colors that symbolize new beginnings and pure love!
              </Text>
              
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
                      width={24} 
                      height={24}
                      style={{ filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)' }}
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
                    width={32} 
                    height={32}
                    style={{ filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)' }}
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
                Time to turn up the heat and dance the night away! Picture yourself stepping into a chic club - think sleek silhouettes, bold statement pieces, and that perfect balance of{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  sophisticated edge
                </Text>
                {' '}meets high-energy nightlife. We&apos;re talking outfits that can handle the dance floor while still looking effortlessly cool under those{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  neon lights
                </Text>. This is your moment to embrace that chic clubbing aesthetic where fashion meets function!
              </Text>
              
              <VStack align="start" gap="3" w="full">
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Stylish shirts with cool jackets, well-fitted dark pants or trendy chinos, statement accessories, and comfortable yet stylish shoes perfect for dancing the night away.
                </Text>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Bodycon dresses with interesting textures, chic jumpsuits or co-ord sets, bold accessories that catch the light, and comfortable heels or trendy sneakers that can handle the dance floor.
                </Text>
              </VStack>
              
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                color="#2b5a72"
                lineHeight="1.7"
                fontStyle="italic"
              >
                The goal? Look effortlessly cool while you dance, laugh, and celebrate into the early hours - think nightlife glamour with serious style!
              </Text>
              
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
                      width={24} 
                      height={24}
                      style={{ filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)' }}
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
                    width={32} 
                    height={32}
                    style={{ filter: 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)' }}
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
                Get ready for an evening of music, dance, and pure celebration! The Sangeet is where black tie elegance meets festivity - think{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  sophisticated glamour
                </Text>
                {' '}with rich, darker tones that command attention. Picture yourself moving gracefully through the evening in outfits that exude formal elegance while honoring the celebratory spirit. We&apos;re talking about that perfect balance of{' '}
                <Text as="span" fontWeight="600" color="#1f576e">
                  black tie sophistication
                </Text>
                {' '}and festive energy, where every step you take adds to the magic of this musical celebration!
              </Text>
              
              <VStack align="start" gap="3" w="full">
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> Sharp blazers with ties in dark, rich colors for a polished black tie look, or elegant Indian formal wear like bandhgalas in deep jewel tones with sophisticated styling.
                </Text>
                
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#2b5a72"
                  lineHeight="1.7"
                >
                  <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> Flowing long gowns in luxurious dark fabrics with elegant draping, or sophisticated sarees in rich, darker silks with intricate work and graceful styling.
                </Text>
              </VStack>
              
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                color="#2b5a72"
                lineHeight="1.7"
                fontStyle="italic"
              >
                The goal? Strike the perfect pose between black tie elegance and festive celebration - think sophisticated glamour meets cultural richness in beautiful dark tones!
              </Text>
              
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
                      width={24} 
                      height={24}
                      style={{ filter: 'brightness(0) saturate(100%) invert(58%) sepia(28%) saturate(466%) hue-rotate(21deg) brightness(96%) contrast(88%)' }}
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
  );
};

// Wedding Invite Page Component
const WeddingInvitePage = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    description: string;
    since: string;
    till: string;
  } | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Helper function to get icon for events
  const getEventIcon = (eventName: string, size: number = 24) => {
    const iconFilter = 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)';
    
    switch (eventName) {
      case 'Check In':
        return (
          <Image 
            src="/resort.png" 
            alt="Resort check-in icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Welcome Dinner':
        return (
          <Image 
            src="/dinner-table.png" 
            alt="Welcome dinner icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Breakfast':
        return (
          <Image 
            src="/breakfast.png" 
            alt="Breakfast icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Lunch':
        return (
          <Image 
            src="/lunch.png" 
            alt="Lunch icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Baarat':
        return (
          <Image 
            src="/car.png" 
            alt="Baarat procession icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Dinner':
        return (
          <Image 
            src="/romantic-dinner.png" 
            alt="Dinner celebration icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'High Tea':
        return (
          <Image 
            src="/high-tea.png" 
            alt="High tea icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Checkout':
        return (
          <Image 
            src="/namaste.png" 
            alt="Checkout farewell icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Mehndi':
        return (
          <Image 
            src="/mehndi.png" 
            alt="Mehndi icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Haldi':
        return (
          <Image 
            src="/turmeric.png" 
            alt="Haldi icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Wedding Pheras':
        return (
          <Image 
            src="/hindu-wedding.png" 
            alt="Wedding icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'Sangeet':
        return (
          <Image 
            src="/dancing.png" 
            alt="Sangeet icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      case 'After Party':
        return (
          <Image 
            src="/dj.png" 
            alt="After Party icon" 
            width={size} 
            height={size}
            style={{ filter: iconFilter }}
          />
        );
      default:
        return <Text fontSize={`${size}px`}>{eventDescriptions[eventName as keyof typeof eventDescriptions]?.emoji || "🎉"}</Text>;
    }
  };
  
  
  // Event descriptions with fun and quirky content
  const eventDescriptions = useMemo(() => ({
    "Check In": {
      title: "The Great Arrival!",
      description: "Welcome to paradise! Check into your rooms and get ready for an amazing 4-day celebration. Pro tip: The lobby has amazing welcome drinks!",
      emoji: "🏨",
      time: "1:00 PM - 4:00 PM"
    },
    "Mehndi": {
      title: "Henna Magic Time!",
      description: "Get your hands decorated with beautiful henna designs while enjoying music, snacks, and lots of laughter. The more intricate, the better!",
      emoji: "🎨", 
      time: "4:30 PM - 7:30 PM"
    },
    "Welcome Dinner": {
      title: "Let's Feast Together!",
      description: "Kick off the celebration with a delicious dinner featuring Indian delicacies. Come hungry and ready to mingle!",
      emoji: "🍽️",
      time: "7:30 PM - 12:30 AM"
    },
    "Breakfast": {
      title: "Fuel Up for Fun!", 
      description: "Start your day right with some delicious breakfast! You'll need all the energy you can get for the day ahead.",
      emoji: "☕",
      time: "7:00 AM - 10:00 AM"
    },
    "Haldi": {
      title: "Time to Get Messy!",
      description: "Time to get messy! This turmeric ceremony will leave everyone glowing (and slightly yellow). Wear clothes you don't mind getting stained!",
      emoji: "💛",
      time: "10:30 AM - 1:00 PM"
    },
    "Lunch": {
      title: "Refuel & Relax",
      description: "Take a break from all the festivities and enjoy a hearty lunch. Perfect time to rest up before the main events!",
      emoji: "🥘",
      time: "1:00 PM - 4:00 PM"
    },
    "Baarat": {
      title: "The Grand Procession!",
      description: "Join the groom's epic procession! Expect dancing, music, and maybe even a horse. This is where the real party begins!",
      emoji: "🐎",
      time: "4:30 PM - 6:00 PM"
    },
    "Wedding Pheras": {
      title: "The Sacred Moment",
      description: "Witness the beautiful ceremony as Saurav and Shivani take their vows around the sacred fire. Bring tissues - it's going to be emotional!",
      emoji: "💍",
      time: "6:30 PM - 8:30 PM"
    },
    "Dinner": {
      title: "Celebration Feast!",
      description: "Celebrate the newlyweds with an incredible dinner spread! Dance, eat, and make memories that will last a lifetime.",
      emoji: "🍽️",
      time: "8:30 PM - 12:30 AM"
    },
    "Sangeet": {
      title: "Dance Like Nobody's Watching!",
      description: "The ultimate dance party! Come ready to show off your moves (or learn some new ones). The dance floor will be calling your name!",
      emoji: "💃",
      time: "8:30 PM - 12:30 AM"
    },
    "After Party": {
      title: "Keep the Party Going!",
      description: "For the night owls who aren't ready to call it a night! Keep dancing and celebrating until the sun comes up.",  
      emoji: "🕺",
      time: "12:30 AM - 5:00 AM"
    },
    "High Tea": {
      title: "Elegant Afternoon Delight",
      description: "Enjoy a sophisticated high tea with delicious snacks and conversations. Perfect for those who love a more refined gathering!",
      emoji: "🫖", 
      time: "5:00 PM - 7:00 PM"
    },
    "Checkout": {
      title: "Until We Meet Again!",
      description: "All good things must come to an end. Check out and take with you all the beautiful memories we've created together!",
      emoji: "👋",
      time: "10:00 AM - 12:00 PM"
    }
  }), []);

  // All events data
  const allWeddingEvents = useMemo(() => [
    // Day 1 Events
    {
      day: 1,
      id: "checkin",
      title: "Check In",
      since: "2026-01-14T13:00:00",
      till: "2026-01-14T16:00:00",
      description: eventDescriptions["Check In"]?.description,
      color: "#2b5a72"
    },
    {
      day: 1, 
      id: "mehndi",
      title: "Mehndi",
      since: "2026-01-14T16:30:00",
      till: "2026-01-14T19:30:00",
      description: eventDescriptions["Mehndi"]?.description,
      color: "#2b5a72"
    },
    {
      day: 1,
      id: "welcome-dinner",
      title: "Welcome Dinner", 
      since: "2026-01-14T19:30:00",
      till: "2026-01-15T00:30:00",
      description: eventDescriptions["Welcome Dinner"]?.description,
      color: "#2b5a72"
    },
    // Day 2 Events
    {
      day: 2,
      id: "breakfast1",
      title: "Breakfast",
      since: "2026-01-15T07:00:00", 
      till: "2026-01-15T10:00:00",
      description: eventDescriptions["Breakfast"]?.description,
      color: "#1f576e"
    },
    {
      day: 2,
      id: "haldi",
      title: "Haldi",
      since: "2026-01-15T10:30:00",
      till: "2026-01-15T13:00:00", 
      description: eventDescriptions["Haldi"]?.description,
      color: "#1f576e"
    },
    {
      day: 2,
      id: "lunch1", 
      title: "Lunch",
      since: "2026-01-15T13:00:00",
      till: "2026-01-15T16:00:00",
      description: eventDescriptions["Lunch"]?.description,
      color: "#1f576e"
    },
    {
      day: 2,
      id: "baarat",
      title: "Baarat",
      since: "2026-01-15T16:30:00",
      till: "2026-01-15T18:00:00",
      description: eventDescriptions["Baarat"]?.description, 
      color: "#1f576e"
    },
    {
      day: 2,
      id: "wedding-pheras",
      title: "Wedding Pheras",
      since: "2026-01-15T18:30:00",
      till: "2026-01-15T20:30:00",
      description: eventDescriptions["Wedding Pheras"]?.description,
      color: "#1f576e"
    },
    {
      day: 2,
      id: "dinner1",
      title: "Dinner",
      since: "2026-01-15T20:30:00",
      till: "2026-01-16T00:30:00",
      description: eventDescriptions["Dinner"]?.description,
      color: "#1f576e"
    },
    {
      day: 2, 
      id: "after-party1",
      title: "After Party",
      since: "2026-01-16T00:30:00",
      till: "2026-01-16T05:00:00",
      description: eventDescriptions["After Party"]?.description,
      color: "#1f576e"
    },
    // Day 3 Events
    {
      day: 3,
      id: "breakfast2",
      title: "Breakfast",
      since: "2026-01-16T07:00:00",
      till: "2026-01-16T10:00:00",
      description: eventDescriptions["Breakfast"]?.description,
      color: "#1a4a5c"
    },
    {
      day: 3,
      id: "lunch2",
      title: "Lunch", 
      since: "2026-01-16T13:00:00",
      till: "2026-01-16T16:00:00",
      description: eventDescriptions["Lunch"]?.description,
      color: "#1a4a5c"
    },
    {
      day: 3,
      id: "high-tea",
      title: "High Tea", 
      since: "2026-01-16T17:00:00",
      till: "2026-01-16T19:00:00",
      description: eventDescriptions["High Tea"]?.description,
      color: "#1a4a5c"
    },
    {
      day: 3,
      id: "sangeet",
      title: "Sangeet",
      since: "2026-01-16T20:30:00",
      till: "2026-01-17T00:30:00",
      description: eventDescriptions["Sangeet"]?.description,
      color: "#1a4a5c"
    },
    {
      day: 3, 
      id: "after-party2",
      title: "After Party",
      since: "2026-01-17T00:30:00",
      till: "2026-01-17T05:00:00",
      description: eventDescriptions["After Party"]?.description,
      color: "#1a4a5c"
    },
    // Day 4 Events  
    {
      day: 4,
      id: "breakfast3",
      title: "Breakfast",
      since: "2026-01-17T07:00:00",
      till: "2026-01-17T10:00:00",
      description: eventDescriptions["Breakfast"]?.description,
      color: "#0f3a4a"
    },
    {
      day: 4,
      id: "checkout",
      title: "Checkout",
      since: "2026-01-17T10:00:00", 
      till: "2026-01-17T12:00:00",
      description: eventDescriptions["Checkout"]?.description,
      color: "#0f3a4a"
    }
  ], [eventDescriptions]);

  // Get current and next events based on real time
  const getCurrentAndNextEvents = useCallback(() => {
    const now = new Date();
    const allEvents = allWeddingEvents.sort((a, b) => 
      new Date(a.since).getTime() - new Date(b.since).getTime()
    );
    
    let currentEvent = null;
    let nextEvent = null;
    
    for (let i = 0; i < allEvents.length; i++) {
      const event = allEvents[i];
      const eventStart = new Date(event.since);
      const eventEnd = new Date(event.till);
      
      if (now >= eventStart && now <= eventEnd) {
        currentEvent = event;
        nextEvent = allEvents[i + 1] || null;
        break;
      } else if (now < eventStart) {
        nextEvent = event;
        break;
      }
    }
    
    return { currentEvent, nextEvent };
  }, [allWeddingEvents]);

  const { currentEvent, nextEvent } = getCurrentAndNextEvents();

  // Filter events for selected day
  const weddingEpg = useMemo(() => {
    return allWeddingEvents.filter(event => event.day === selectedDay);
  }, [allWeddingEvents, selectedDay]);

  const handleEventClick = (event: {
    title: string;
    description: string;
    since: string;
    till: string;
  }) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };



  return (
    <Box 
      as="main" 
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={{ base: "4", md: "6" }}
      py={{ base: "28", md: "40" }}
      position="relative"
      zIndex="10"
    >
      <Container maxW="100%" px={{ base: "2", md: "6" }}>
        <VStack gap="8" w="100%" align="stretch">
          {/* Section Title */}
          <VStack gap="4" textAlign="center">
            <Heading 
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="normal"
              color="#1f576e"
              textShadow="0 2px 4px rgba(255,255,255,0.8)"
              fontFamily="'Bernhard Tango', cursive"
            >
              Wedding Flow
            </Heading>
            <Box w={{ base: "20", md: "32" }} h="2px" bg="#1f576e" opacity="0.6" />
          </VStack>

          {/* Modern Timeline Interface */}
          <VStack gap="8" w="100%" align="stretch">
            
            {/* Now & Next Sticky Banner */}
            {(currentEvent || nextEvent) && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  position="sticky"
                  top="4"
                  zIndex="10"
                  bg="rgba(255, 255, 255, 0.16)"
                  backdropFilter="blur(4px) saturate(110%)"
                  borderRadius="16px"
                  border="2px solid #C19A6C"
                  boxShadow="0 8px 32px rgba(193, 154, 108, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                  p={{ base: "4", md: "6" }}
                  mb="6"
                  maxW="500px"
                  mx="auto"
                >
                  <VStack gap="3" align="center">
                    {currentEvent && (
                      <HStack gap="3" align="center">
                        <Box
                          w="8px"
                          h="8px"
                          borderRadius="full"
                          bg="#C19A6C"
                          boxShadow="0 0 8px rgba(193, 154, 108, 0.6)"
                        />
                          <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="#1f576e"
                            fontFamily="'Aparajita', serif"
                            fontWeight="bold"
                            textShadow="0 2px 4px rgba(255,255,255,0.8)"
                          >
                            Now: {currentEvent.title}
                          </Text>
                          <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="#2b5a72"
                            fontFamily="'Aparajita', serif"
                            fontWeight="bold"
                            textShadow="0 1px 3px rgba(255,255,255,0.8)"
                          >
                            {new Date(currentEvent.since).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </Text>
                      </HStack>
                    )}
                    
                    {nextEvent && (
                      <HStack gap="3" align="center">
                        <Box
                          w="6px"
                          h="6px"
                          borderRadius="full"
                          bg="#A6B0A6"
                        />
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          color="#1f576e"
                          fontFamily="'Aparajita', serif"
                          fontWeight="bold"
                          textShadow="0 2px 4px rgba(255,255,255,0.8)"
                        >
                          Next: {nextEvent.title}
                        </Text>
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          color="#2b5a72"
                          fontFamily="'Aparajita', serif"
                          fontWeight="bold"
                          textShadow="0 1px 3px rgba(255,255,255,0.8)"
                        >
                          {new Date(nextEvent.since).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                </Box>
              </motion.div>
            )}
            
            <HStack gap={{ base: "2", md: "4" }} justify="center" wrap="wrap">
              {[
                { day: 1, title: "Jan 14", subtitle: "Mehndi & Welcome", eventName: "Mehndi", color: "#2b5a72" },
                { day: 2, title: "Jan 15", subtitle: "Haldi & Wedding", eventName: "Wedding Pheras", color: "#1f576e" },
                { day: 3, title: "Jan 16", subtitle: "Sangeet & Party", eventName: "Sangeet", color: "#1a4a5c" },
                { day: 4, title: "Jan 17", subtitle: "Farewell Brunch", emoji: "✈️", color: "#0f3a4a" }
              ].map((dayInfo, index) => {
                const isSelected = selectedDay === dayInfo.day;
                
                return (
                  <motion.div
                    key={dayInfo.day}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Box
                      p={{ base: "4", md: "6" }}
                      bg={isSelected ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.16)"}
                      borderRadius="xl"
                      cursor="pointer"
                      onClick={() => setSelectedDay(dayInfo.day)}
                      border="2px solid"
                      borderColor={isSelected ? "#C19A6C" : "rgba(255, 255, 255, 0.2)"}
                      backdropFilter="blur(4px) saturate(110%)"
                      _hover={{
                        bg: isSelected ? "rgba(255, 255, 255, 0.35)" : "rgba(255, 255, 255, 0.2)",
                        transform: "translateY(-2px)",
                        boxShadow: isSelected 
                          ? "0 8px 32px rgba(193, 154, 108, 0.4), 0 0 0 1px rgba(193, 154, 108, 0.3)" 
                          : "0 8px 32px rgba(31, 87, 110, 0.37)"
                      }}
                      transition="all 0.3s ease"
                      boxShadow={isSelected 
                        ? "0 4px 12px rgba(193, 154, 108, 0.3), 0 0 0 1px rgba(193, 154, 108, 0.2)" 
                        : "0 4px 12px rgba(31, 87, 110, 0.1)"
                      }
                      minW={{ base: "140px", md: "180px" }}
                      textAlign="center"
                    >
                      <VStack gap="2">
                        <Text
                          fontSize={{ base: "xl", md: "2xl" }}
                          color={isSelected ? "#1f576e" : "#1f576e"}
                          fontFamily="'Aparajita', serif"
                          fontWeight="bold"
                          textShadow="0 2px 6px rgba(255,255,255,0.8)"
                        >
                          {dayInfo.title}
                        </Text>
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          color="#2b5a72"
                          fontFamily="'Aparajita', serif"
                          fontWeight="bold"
                          textShadow="0 1px 4px rgba(255,255,255,0.8)"
                        >
                          {dayInfo.subtitle}
                        </Text>
                      </VStack>
                    </Box>
                  </motion.div>
                );
              })}
            </HStack>

            {/* Main Timeline - Constrained Width on Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ 
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <Box
                p="6"
                bg="rgba(255, 255, 255, 0.16)"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="20px"
                backdropFilter="blur(4px) saturate(110%)"
                boxShadow="0 20px 60px rgba(31, 87, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                w={{ base: "100%", md: "90%", lg: "80%", xl: "70%" }}
                maxW="900px"
              >
                {/* Vertical Timeline */}
                <VStack gap="4" align="stretch" w="100%">
                    {weddingEpg.map((event, index) => {
                      const isCurrentEvent = currentEvent?.id === event.id;
                      const eventTime = new Date(event.since);
                      const endTime = new Date(event.till);
                      const eventData = eventDescriptions[event.title as keyof typeof eventDescriptions] || { emoji: "🎉", title: event.title };
                      
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.05,
                            ease: "easeOut"
                          }}
                        >
                          <Box
                            position="relative"
                            p={{ base: "4", md: "5" }}
                            minH={{ base: "160px", md: "180px" }}
                            bg="rgba(255, 255, 255, 0.1)"
                            backdropFilter="blur(4px) saturate(110%)"
                            borderRadius="20px"
                            border={isCurrentEvent 
                              ? "2px solid #C19A6C" 
                              : "1px solid rgba(31, 87, 110, 0.3)"
                            }
                            boxShadow={isCurrentEvent 
                              ? "0 8px 25px rgba(193, 154, 108, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)" 
                              : "0 8px 32px rgba(31, 87, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                            }
                            cursor="pointer"
                            onClick={() => handleEventClick(event)}
                            transition="all 0.3s ease"
                            _hover={{
                              transform: "translateY(-2px)",
                              boxShadow: isCurrentEvent 
                                ? "0 12px 30px rgba(193, 154, 108, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.5)" 
                                : "0 12px 32px rgba(31, 87, 110, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                            }}
                            overflow="hidden"
                          >
                            {/* Time Bubble - Top Right */}
                            <Box
                              position="absolute"
                              top={{ base: "4", md: "5" }}
                              right={{ base: "4", md: "5" }}
                              px={{ base: "3", md: "4" }}
                              py={{ base: "2", md: "2.5" }}
                              bg={isCurrentEvent 
                                ? "linear-gradient(135deg, #C19A6C, #E8B4B8)" 
                                : "rgba(31, 87, 110, 0.9)"
                              }
                              borderRadius="full"
                              backdropFilter="blur(12px)"
                              boxShadow="0 4px 16px rgba(0, 0, 0, 0.15)"
                              border="1px solid rgba(255, 255, 255, 0.2)"
                              zIndex="2"
                            >
                              <VStack gap="0" align="center">
                                <Text
                                  fontSize={{ base: "xs", md: "sm" }}
                                  fontWeight="bold"
                                  color="white"
                                  fontFamily="'Aparajita', serif"
                                  lineHeight="1"
                                  textShadow="0 1px 2px rgba(0,0,0,0.2)"
                                >
                                  {eventTime.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                  })}
                                </Text>
                                <Text
                                  fontSize="2xs"
                                  color="rgba(255, 255, 255, 0.8)"
                                  fontFamily="'Aparajita', serif"
                                  lineHeight="1"
                                >
                                  to
                                </Text>
                                <Text
                                  fontSize={{ base: "xs", md: "sm" }}
                                  fontWeight="bold"
                                  color="white"
                                  fontFamily="'Aparajita', serif"
                                  lineHeight="1"
                                  textShadow="0 1px 2px rgba(0,0,0,0.2)"
                                >
                                  {endTime.toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                  })}
                                </Text>
                              </VStack>
                            </Box>

                            {/* Happening Now Badge */}
                            {isCurrentEvent && (
                              <Box
                                position="absolute"
                                top="4"
                                left="4"
                                zIndex="3"
                                px="3"
                                py="1.5"
                                bg="linear-gradient(135deg, #C19A6C, #E8B4B8)"
                                borderRadius="full"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                boxShadow="0 2px 8px rgba(193, 154, 108, 0.3)"
                              >
                                <Text
                                  fontSize="xs"
                                  color="white"
                                  fontFamily="'Aparajita', serif"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                  letterSpacing="0.5px"
                                  textShadow="0 1px 2px rgba(0,0,0,0.2)"
                                >
                                  HAPPENING NOW
                                </Text>
                              </Box>
                            )}

                            
                            {/* Main Content Area */}
                            <VStack align="flex-start" gap={{ base: "4", md: "5" }} w="100%" pr={{ base: "16", md: "20" }}>
                              {/* Event Header - Left Side */}
                              <HStack gap={{ base: "4", md: "5" }} align="center" w="100%">
                                {/* Emoji with enhanced styling */}
                                <Box
                                  w={{ base: "12", md: "14" }}
                                  h={{ base: "12", md: "14" }}
                                  bg="rgba(31, 87, 110, 0.1)"
                                  borderRadius="xl"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  border="1px solid rgba(31, 87, 110, 0.2)"
                                  flexShrink="0"
                                >
                                  <Box fontSize={{ base: "2xl", md: "3xl" }}>
                                    {getEventIcon(event.title, 32)}
                                  </Box>
                                </Box>
                                
                                {/* Event Title with Signature Blue */}
                                <VStack align="flex-start" gap="1" flex="1">
                                  <Text
                                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                                    fontFamily="'Bernhard Tango', cursive"
                                    fontWeight="normal"
                                    color={isCurrentEvent ? "#C19A6C" : "#1f576e"}
                                    lineHeight="1.1"
                                    textShadow="0 2px 6px rgba(255,255,255,0.8)"
                                    letterSpacing="-0.02em"
                                  >
                                    {event.title}
                                  </Text>
                                  <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    color="#2b5a72"
                                    fontFamily="'Aparajita', serif"
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                    letterSpacing="0.1em"
                                    textShadow="0 1px 3px rgba(255,255,255,0.8)"
                                  >
                                    {eventData.title || event.title}
                                  </Text>
                                </VStack>
                              </HStack>
                              
                              {/* Description Content */}
                              {event.description && (
                                <Box
                                  pl={{ base: "16", md: "19" }}
                                  w="100%"
                                  flex="1"
                                  display="flex"
                                  alignItems="flex-start"
                                >
                                  <Text
                                    fontSize={{ base: "lg", md: "xl" }}
                                    color={isCurrentEvent ? "#1f576e" : "#2b5a72"}
                                    fontFamily="'Aparajita', serif"
                                    lineHeight="1.5"
                                    fontWeight="bold"
                                    textShadow="0 2px 4px rgba(255,255,255,0.8)"
                                    overflow="hidden"
                                    display="-webkit-box"
                                    css={{
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: "vertical"
                                    }}
                                  >
                                    {event.description}
                                  </Text>
                                </Box>
                              )}

                              {/* Click for details hint */}
                              <Box
                                pl={{ base: "16", md: "19" }}
                                w="100%"
                                pt="2"
                              >
                                <Text
                                  fontSize="xs"
                                  color={isCurrentEvent ? "#C19A6C" : "#1f576e"}
                                  fontFamily="'Aparajita', serif"
                                  fontWeight="bold"
                                  textTransform="uppercase"
                                  letterSpacing="0.5px"
                                  textShadow="0 1px 2px rgba(255,255,255,0.8)"
                                >
                                  Click for details
                                </Text>
                              </Box>
                            </VStack>
                          </Box>
                        </motion.div>
                      );
                    })}
                </VStack>
              </Box>
            </motion.div>
          </VStack>
        </VStack>
      </Container>

      {/* Modern Event Details Modal */}
      {isEventModalOpen && selectedEvent && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(8px)",
              zIndex: 9998
            }}
            onClick={() => setIsEventModalOpen(false)}
          />
          
          {/* Modern Slide-up Modal */}
          <motion.div
            ref={modalRef}
            initial={{ y: "100%" }}
            animate={{ y: dragY }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 400 
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150) {
                setIsEventModalOpen(false);
              }
              setDragY(0);
            }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              maxHeight: "90vh"
            }}
          >
            <Box
              bg="rgba(255, 255, 255, 0.18)"
              backdropFilter="blur(8px) saturate(120%)"
              borderTopRadius="28px"
              boxShadow="0 4px 16px 0 rgba(31, 38, 135, 0.2)"
              border="1px solid rgba(255, 255, 255, 0.25)"
              p={0}
              maxH="90vh"
              overflow="hidden"
              position="relative"
              mx={{ base: "2", md: "6" }}
            >
              {/* Luxury Handle bar */}
              <Box
                w="60px"
                h="6px"
                bg="rgba(255, 255, 255, 0.35)"
                borderRadius="full"
                mx="auto"
                my="6"
                cursor="grab"
                boxShadow="0 4px 16px 0 rgba(31, 38, 135, 0.2)"
                border="1px solid rgba(255, 255, 255, 0.4)"
                position="relative"
                _active={{ cursor: "grabbing", transform: "scale(1.1)" }}
                _hover={{ transform: "scale(1.05)", bg: "rgba(255, 255, 255, 0.4)" }}
                transition="all 0.2s ease"
                css={{
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "1px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40px",
                    height: "2px",
                    background: "rgba(255,255,255,0.6)",
                    borderRadius: "full"
                  }
                }}
              />
              
              {/* Balanced Header Section */}
              <Box
                bg="rgba(255, 255, 255, 0.18)"
                backdropFilter="blur(8px) saturate(120%)"
                p={{ base: "3", md: "4" }}
                color="#1f576e"
                position="relative"
                overflow="hidden"
                borderTopRadius="28px"
                boxShadow="0 4px 16px 0 rgba(31, 38, 135, 0.2)"
                border="1px solid rgba(255, 255, 255, 0.25)"
              >
                {/* Compact Close Button */}
                <Button
                  position="absolute"
                  top="4"
                  right="4"
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEventModalOpen(false)}
                  color="#1f576e"
                  borderRadius="full"
                  bg="rgba(255, 255, 255, 0.15)"
                  w="8"
                  h="8"
                  fontSize="sm"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.25)",
                    transform: "scale(1.1)"
                  }}
                  transition="all 0.2s ease"
                  zIndex="2"
                >
                  ✕
                </Button>
                
                {/* Single Line Header */}
                <HStack w="full" justify="center" align="center" gap={{ base: "2", md: "3" }}>
                  {/* Emoji */}
                  <Box
                    fontSize={{ base: "3xl", md: "4xl" }}
                    bg="rgba(255, 255, 255, 0.18)"
                    backdropFilter="blur(8px) saturate(120%)"
                    borderRadius="xl"
                    border="1px solid rgba(255, 255, 255, 0.25)"
                    p={{ base: "2", md: "2.5" }}
                    boxShadow="0 3px 12px rgba(31, 87, 110, 0.1)"
                    flexShrink="0"
                  >
                    {getEventIcon(selectedEvent.title, 48)}
                  </Box>
                  
                  {/* Event Title - Center */}
                  <VStack flex="0.625" minW="0" textAlign="center" gap="0.5">
                    <Heading 
                      fontSize={{ base: "2xl", md: "3xl" }}
                      color="#1f576e"
                      fontFamily="'Bernhard Tango', cursive"
                      fontWeight="700"
                      textShadow="0 2px 4px rgba(255,255,255,0.8)"
                      lineHeight="1.1"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {selectedEvent.title}
                    </Heading>
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color="#2b5a72"
                      fontFamily="'Aparajita', serif"
                      fontWeight="600"
                      textShadow="0 1px 2px rgba(255,255,255,0.8)"
                      lineHeight="1.3"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {eventDescriptions[selectedEvent.title as keyof typeof eventDescriptions]?.title || selectedEvent.title}
                    </Text>
                  </VStack>
                  
                  {/* Time Badge */}
                  <Box
                    bg="rgba(255, 255, 255, 0.18)"
                    backdropFilter="blur(8px) saturate(120%)"
                    borderRadius="full"
                    border="1px solid rgba(255, 255, 255, 0.18)"
                    px={{ base: "2.5", md: "3" }}
                    py={{ base: "1.5", md: "2" }}
                    boxShadow="0 3px 12px rgba(31, 87, 110, 0.1)"
                    flexShrink="0"
                  >
                    <Text 
                      fontSize={{ base: "xs", md: "sm" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                      fontWeight="700"
                      textShadow="0 1px 2px rgba(255,255,255,0.8)"
                      textAlign="center"
                      whiteSpace="nowrap"
                    >
                      {new Date(selectedEvent.since).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })} - {new Date(selectedEvent.till).toLocaleTimeString('en-US', {
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true
                      })}
                    </Text>
                  </Box>
                </HStack>
              </Box>
              
              {/* Content Section */}
              <Box 
                p={{ base: "4", md: "5" }} 
                maxH="60vh" 
                overflow="auto"
                bg="transparent"
                position="relative"
              >
                <VStack gap="4" align="stretch">
                  {/* Description */}
                  {selectedEvent.description && (
                    <Box>
                      <Heading
                        fontSize={{ base: "xl", md: "xl" }}
                        color="#1f576e"
                        fontFamily="'Aparajita', serif"
                        fontWeight="700"
                        mb="3"
                        textShadow="0 2px 4px rgba(255,255,255,0.8)"
                      >
                        What to Expect
                      </Heading>
                      <Box
                        p="3"
                        bg="rgba(255, 255, 255, 0.18)"
                        backdropFilter="blur(8px) saturate(120%)"
                        borderRadius="xl"
                        border="1px solid rgba(255, 255, 255, 0.25)"
                        boxShadow="0 3px 12px 0 rgba(31, 38, 135, 0.15)"
                        position="relative"
                        overflow="hidden"
                        _hover={{
                          bg: "rgba(255, 255, 255, 0.25)",
                          boxShadow: "0 6px 20px -2px rgba(31, 38, 135, 0.25)",
                          transform: "translateY(-1px)",
                        }}
                        transition="all 0.3s ease"
                      >
                        {/* Decorative element */}
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          w="4px"
                          h="100%"
                          bg="rgba(255, 255, 255, 0.35)"
                          borderRadius="0 3px 3px 0"
                        />
                        <Text 
                          fontSize={{ base: "lg", md: "lg" }}
                          color="#1f576e"
                          lineHeight="1.6"
                          fontFamily="'Aparajita', serif"
                          fontWeight="600"
                          pl="4"
                          textShadow="0 1px 2px rgba(255,255,255,0.8)"
                        >
                          {selectedEvent.description}
                        </Text>
                      </Box>
                    </Box>
                  )}
                  
                  {/* Action Button */}
                  <Flex justify="center" mt="5">
                    <Button
                      size="md"
                      bg="linear-gradient(135deg, #C19A6C, #E8B4B8)"
                      color="white"
                      fontFamily="'Aparajita', serif"
                      fontWeight="600"
                      fontSize="md"
                      px="6"
                      py="3"
                      borderRadius="xl"
                      onClick={() => setIsEventModalOpen(false)}
                      boxShadow="0 4px 12px rgba(193, 154, 108, 0.3), 0 2px 6px rgba(193, 154, 108, 0.2)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      _hover={{
                        bg: "linear-gradient(135deg, #B8916A, #D1A4A8)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 6px 18px rgba(193, 154, 108, 0.4), 0 3px 8px rgba(193, 154, 108, 0.25)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Can&apos;t wait! 🎉
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          </motion.div>
        </>
      )}
    </Box>
  );
};

/*
 * Icon Attribution:
 * 
 * turmeric.png: Turmeric icons created by juicy_fish - Flaticon
 * mehendi.png: Henna-painted-hand icons created by Design View - Flaticon
 * dj.png: Night club icons created by surang - Flaticon
 * hindu-wedding.png: Wedding icons created by Freepik - Flaticon
 * dancing.png: Dancing icons created by Freepik - Flaticon
 * 
 * All icons used under Flaticon licensing terms.
 */

