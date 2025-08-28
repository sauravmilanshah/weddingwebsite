'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

// Constants  
const SCROLL_THRESHOLD = 50;
const COUNTDOWN_UPDATE_INTERVAL = 1000;
const WEDDING_DATE = '2026-01-14T00:00:00';

const PETAL_TYPES = [
  { type: 'white', colors: ['#ffffff', '#f8fafc', '#f1f5f9'], weight: 40 },
  { type: 'pink', colors: ['#ff69b4', '#f472b6', '#ec4899'], weight: 30 },
  { type: 'red', colors: ['#dc143c', '#ef4444', '#dc2626'], weight: 30 }
];

const IndianWeddingFlowerShower = () => {
  const [isClient, setIsClient] = useState(false);
  const [showPetals, setShowPetals] = useState(true);
  const [petals, setPetals] = useState<Array<{ id: string; x: number; y: number; rotation: number; type: string; color: string; size: number; swayAmplitude: number; swayDirection: number }>>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Stop creating new petals after 6 seconds
    const timer = setTimeout(() => {
      setShowPetals(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showPetals || !isClient) return;

    const createPetal = () => {
      // Select flower type based on weight
      const rand = Math.random() * 100;
      let selectedFlower;
      if (rand < 40) selectedFlower = PETAL_TYPES[0]; // white
      else if (rand < 70) selectedFlower = PETAL_TYPES[1]; // pink  
      else selectedFlower = PETAL_TYPES[2]; // red

      const color = selectedFlower.colors[Math.floor(Math.random() * selectedFlower.colors.length)];
      const isSmall = Math.random() > 0.7;
      
      const swayAmplitude = 15 + Math.random() * 25; // Gentler sway (15-40px)
      const swayDirection = Math.random() > 0.5 ? 1 : -1; // Random initial direction
      
      const newPetal = {
        id: `petal-${Date.now()}-${Math.random()}`,
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        type: selectedFlower.type,
        color: color,
        size: isSmall ? 0.6 : 1,
        swayAmplitude,
        swayDirection
      };

      setPetals(prev => [...prev, newPetal]);
    };

    // Extra intense shower - create petals every 12.5ms for first 2 seconds, then every 25ms
    const interval1 = setInterval(createPetal, 12.5);
    
    setTimeout(() => {
      clearInterval(interval1);
      const interval2 = setInterval(createPetal, 25);
      
      setTimeout(() => {
        clearInterval(interval2);
      }, 3000);
    }, 2000);

    return () => {
      clearInterval(interval1);
    };
  }, [showPetals, isClient]);

  const handlePetalComplete = (petalId: string) => {
    setPetals(prev => prev.filter(p => p.id !== petalId));
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ 
            x: petal.x, 
            y: petal.y, 
            rotate: petal.rotation,
            scale: petal.size,
            opacity: 0
          }}
          animate={{ 
            x: petal.x + petal.swayDirection * petal.swayAmplitude,
            y: window.innerHeight + 50,
            rotate: petal.rotation + 720, // Two full rotations
            opacity: [0, 0.9, 0.9, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 4, // 4-7 seconds for gentle fall
            ease: "linear",
            x: {
              type: "spring",
              damping: 2,
              stiffness: 20,
              mass: 2
            },
            opacity: {
              times: [0, 0.1, 0.9, 1],
              duration: Math.random() * 3 + 4
            }
          }}
          onAnimationComplete={() => handlePetalComplete(petal.id)}
          className="absolute"
          style={{
            width: 10,
            height: 14,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            backgroundColor: petal.color,
            boxShadow: petal.type === 'white' 
              ? '0 2px 4px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.8)'
              : petal.type === 'pink'
              ? '0 2px 4px rgba(255, 105, 180, 0.4)'
              : '0 2px 4px rgba(220, 20, 60, 0.4)'
          }}
        />
      ))}
    </div>
  );
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
  const [isClient, setIsClient] = useState(false);
  const targetTime = useMemo(() => targetDate.getTime(), [targetDate]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    if (!isClient) return;
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, COUNTDOWN_UPDATE_INTERVAL);
    return () => clearInterval(timer);
  }, [calculateTimeLeft, isClient]);

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

  if (!isClient) {
    return (
      <HStack 
        gap={{ base: "2", sm: "4", md: "6" }}
        justify="center"
        role="timer"
        aria-live="polite"
        aria-label="Wedding countdown"
      >
        <TimeUnit value={0} label="Days" />
        <TimeUnit value={0} label="Hours" />
        <TimeUnit value={0} label="Minutes" />
        <TimeUnit value={0} label="Seconds" />
      </HStack>
    );
  }

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

// Logistics Page Component
const LogisticsPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
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

              {/* RSVP Process */}
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
                          WhatsApp RSVP
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
                            We&apos;ll reach out to you personally via WhatsApp to chat about all the details and make sure everything is perfect for your stay!
                          </Text>
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            <strong>We&apos;ll ask about:</strong> Number of guests, dietary preferences, and arrival coordination
                          </Text>
                          <Text fontSize="md" color="#2b5a72" lineHeight="1.6">
                            <strong>Please share:</strong> All details that&apos;ll help us make your experience magical!
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
                            We can&apos;t wait to hear from you and help plan your perfect trip!
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
                          Transportation Options
                        </Heading>
                        <Text 
                          fontSize="lg" 
                          color="#1f576e" 
                          fontWeight="600" 
                          opacity="0.8"
                        >
                          🚗 Getting to the venue
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
                            <strong>Prefer your own ride?</strong> Perfect! Many guests enjoy the scenic 1-hour drive from Mumbai (68-71km)
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
                          <Text fontSize="2xl">🌟</Text>
                          <Text fontSize="sm" color="#1f576e" fontWeight="600">
                            The sooner you let us know, the better we can plan for your perfect experience!
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
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
                            <strong>Wedding Attire:</strong> 
                            <button 
                              onClick={() => setCurrentPage('dress-code')}
                              style={{ color: "#1f576e", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", fontWeight: "600", marginLeft: "6px" }}
                            >
                              Visit our Dress Code Guide
                            </button> for outfit inspiration and guidelines!
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
                            <strong>Current Rate:</strong> 1 USD ≈ ₹83-84.50
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
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.2951623!2d73.2940524!3d18.9148418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7fb6826b24a5f%3A0x54850d6bd73b6698!2sOleander%20Farms%20Luxury%20Resort%20in%20Karjat!5e0!3m2!1sen!2sin!4v1735317600000!5m2!1sen!2sin"
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
    } else if (currentPage === 'logistics') {
      return <LogisticsPage setCurrentPage={setCurrentPage} />;
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
          currentPage === 'logistics' ? "url('/background2.png')" :
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
    location?: string;
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
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Welcome Dinner':
        return (
          <Image 
            src="/dinner-table.png" 
            alt="Welcome dinner icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Breakfast':
        return (
          <Image 
            src="/breakfast.png" 
            alt="Breakfast icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Lunch':
        return (
          <Image 
            src="/lunch.png" 
            alt="Lunch icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Baarat':
        return (
          <Image 
            src="/car.png" 
            alt="Baarat procession icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Dinner':
        return (
          <Image 
            src="/romantic-dinner.png" 
            alt="Dinner celebration icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'High Tea':
        return (
          <Image 
            src="/high-tea.png" 
            alt="High tea icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Checkout':
        return (
          <Image 
            src="/namaste.png" 
            alt="Checkout farewell icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Mehndi':
        return (
          <Image 
            src="/mehndi.png" 
            alt="Mehndi icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Haldi':
        return (
          <Image 
            src="/turmeric.png" 
            alt="Haldi icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Wedding Pheras':
        return (
          <Image 
            src="/hindu-wedding.png" 
            alt="Wedding icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'Sangeet':
        return (
          <Image 
            src="/dancing.png" 
            alt="Sangeet icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
          />
        );
      case 'After Party':
        return (
          <Image 
            src="/dj.png" 
            alt="After Party icon" 
            width={size} 
            height={size}
            style={{ 
              filter: iconFilter,
              width: `${size}px`,
              height: `${size}px`,
              minWidth: `${size}px`,
              minHeight: `${size}px`
            }}
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
      location: "South Reception",
      color: "#2b5a72"
    },
    {
      day: 1, 
      id: "mehndi",
      title: "Mehndi",
      since: "2026-01-14T16:30:00",
      till: "2026-01-14T19:30:00",
      description: eventDescriptions["Mehndi"]?.description,
      location: "Lakeside Lawn",
      color: "#2b5a72"
    },
    {
      day: 1,
      id: "welcome-dinner",
      title: "Welcome Dinner", 
      since: "2026-01-14T19:30:00",
      till: "2026-01-15T00:30:00",
      description: eventDescriptions["Welcome Dinner"]?.description,
      location: "Lakeside Lawn",
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
      location: "The Veranda",
      color: "#1f576e"
    },
    {
      day: 2,
      id: "haldi",
      title: "Haldi",
      since: "2026-01-15T10:30:00",
      till: "2026-01-15T13:00:00", 
      description: eventDescriptions["Haldi"]?.description,
      location: "Splash Infinity Pool",
      color: "#1f576e"
    },
    {
      day: 2,
      id: "lunch1", 
      title: "Lunch",
      since: "2026-01-15T13:00:00",
      till: "2026-01-15T16:00:00",
      description: eventDescriptions["Lunch"]?.description,
      location: "Splash Infinity Pool",
      color: "#1f576e"
    },
    {
      day: 2,
      id: "baarat",
      title: "Baarat",
      since: "2026-01-15T16:30:00",
      till: "2026-01-15T18:00:00",
      description: eventDescriptions["Baarat"]?.description,
      location: "Hill top", 
      color: "#1f576e"
    },
    {
      day: 2,
      id: "wedding-pheras",
      title: "Wedding Pheras",
      since: "2026-01-15T18:30:00",
      till: "2026-01-15T20:30:00",
      description: eventDescriptions["Wedding Pheras"]?.description,
      location: "Hill top",
      color: "#1f576e"
    },
    {
      day: 2,
      id: "dinner1",
      title: "Dinner",
      since: "2026-01-15T20:30:00",
      till: "2026-01-16T00:30:00",
      description: eventDescriptions["Dinner"]?.description,
      location: "Hill top",
      color: "#1f576e"
    },
    {
      day: 2, 
      id: "after-party1",
      title: "After Party",
      since: "2026-01-16T00:30:00",
      till: "2026-01-16T05:00:00",
      description: eventDescriptions["After Party"]?.description,
      location: "Common House Micro Brewery",
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
      location: "The Veranda",
      color: "#1a4a5c"
    },
    {
      day: 3,
      id: "lunch2",
      title: "Lunch", 
      since: "2026-01-16T13:00:00",
      till: "2026-01-16T16:00:00",
      description: eventDescriptions["Lunch"]?.description,
      location: "Splash Infinity Pool",
      color: "#1a4a5c"
    },
    {
      day: 3,
      id: "high-tea",
      title: "High Tea", 
      since: "2026-01-16T17:00:00",
      till: "2026-01-16T19:00:00",
      description: eventDescriptions["High Tea"]?.description,
      location: "The Den",
      color: "#1a4a5c"
    },
    {
      day: 3,
      id: "sangeet",
      title: "Sangeet",
      since: "2026-01-16T20:30:00",
      till: "2026-01-17T00:30:00",
      description: eventDescriptions["Sangeet"]?.description,
      location: "Oleander Farms Garden",
      color: "#1a4a5c"
    },
    {
      day: 3, 
      id: "after-party2",
      title: "After Party",
      since: "2026-01-17T00:30:00",
      till: "2026-01-17T05:00:00",
      description: eventDescriptions["After Party"]?.description,
      location: "Common House",
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
      location: "The Veranda",
      color: "#0f3a4a"
    },
    {
      day: 4,
      id: "checkout",
      title: "Checkout",
      since: "2026-01-17T10:00:00", 
      till: "2026-01-17T12:00:00",
      description: eventDescriptions["Checkout"]?.description,
      location: "South Reception",
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
    location?: string;
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
                { day: 4, title: "Jan 17", subtitle: "Farewell & Departure", emoji: "✈️", color: "#0f3a4a" }
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
                            <VStack align="flex-start" gap={{ base: "4", md: "5" }} w="100%">
                              {/* Event Header with Location - Responsive Layout */}
                              <Box w="100%">
                                {/* Desktop: All in one line */}
                                <Flex 
                                  justify="space-between" 
                                  align="center" 
                                  w="100%"
                                  display={{ base: "none", md: "flex" }}
                                  gap="4"
                                >
                                  {/* Left: Icon + Title + Location */}
                                  <HStack gap="5" align="center" flex="1" minW="0">
                                    {/* Emoji with enhanced styling */}
                                    <Box
                                      w="14"
                                      h="14"
                                      bg="rgba(31, 87, 110, 0.1)"
                                      borderRadius="xl"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      border="1px solid rgba(31, 87, 110, 0.2)"
                                      flexShrink="0"
                                    >
                                      <Box fontSize="3xl">
                                        {getEventIcon(event.title, 32)}
                                      </Box>
                                    </Box>
                                    
                                    {/* Event Title */}
                                    <Text
                                      fontSize={{ md: "3xl", lg: "4xl" }}
                                      fontFamily="'Bernhard Tango', cursive"
                                      fontWeight="normal"
                                      color={isCurrentEvent ? "#C19A6C" : "#1f576e"}
                                      lineHeight="1.1"
                                      textShadow="0 2px 6px rgba(255,255,255,0.8)"
                                      letterSpacing="-0.02em"
                                      flexShrink="0"
                                    >
                                      {event.title}
                                    </Text>
                                    
                                    {/* Location Badge */}
                                    {event.location && (
                                      <Box
                                        bg="rgba(255, 255, 255, 0.2)"
                                        backdropFilter="blur(8px) saturate(110%)"
                                        borderRadius="full"
                                        px="3"
                                        py="1.5"
                                        border="1px solid rgba(255, 255, 255, 0.3)"
                                        boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                                        flexShrink="0"
                                      >
                                        <HStack gap="1.5" align="center">
                                          <Image
                                            src="/location.png"
                                            alt="Location"
                                            width={12}
                                            height={12}
                                            style={{
                                              width: '12px',
                                              height: '12px',
                                              filter: 'brightness(0) saturate(100%) invert(13%) sepia(47%) saturate(1235%) hue-rotate(188deg) brightness(91%) contrast(93%)'
                                            }}
                                          />
                                          <Text
                                            fontSize="xs"
                                            color="#1f576e"
                                            fontFamily="'Inter', sans-serif"
                                            fontWeight="600"
                                            textShadow="0 1px 2px rgba(255,255,255,0.8)"
                                          >
                                            {event.location}
                                          </Text>
                                        </HStack>
                                      </Box>
                                    )}
                                  </HStack>
                                  
                                  {/* Right: Time Badge */}
                                  <Box
                                    bg="linear-gradient(135deg, #1f576e, #2b5a72)"
                                    borderRadius="full"
                                    px="4"
                                    py="2"
                                    border="1px solid rgba(255, 255, 255, 0.2)"
                                    boxShadow="0 2px 8px rgba(31, 87, 110, 0.3)"
                                    flexShrink="0"
                                  >
                                    <Text
                                      fontSize="xs"
                                      color="white"
                                      fontFamily="'Inter', sans-serif"
                                      fontWeight="600"
                                      textTransform="uppercase"
                                      letterSpacing="0.5px"
                                      textShadow="0 1px 2px rgba(0,0,0,0.3)"
                                      textAlign="center"
                                    >
                                      {eventData.time}
                                    </Text>
                                  </Box>
                                </Flex>

                                {/* Mobile: Stacked layout */}
                                <VStack 
                                  align="flex-start" 
                                  gap="3" 
                                  w="100%"
                                  display={{ base: "flex", md: "none" }}
                                >
                                  {/* Row 1: Icon + Title */}
                                  <HStack gap="4" align="center" w="100%">
                                    {/* Emoji with enhanced styling */}
                                    <Box
                                      w="12"
                                      h="12"
                                      bg="rgba(31, 87, 110, 0.1)"
                                      borderRadius="xl"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      border="1px solid rgba(31, 87, 110, 0.2)"
                                      flexShrink="0"
                                    >
                                      <Box fontSize="2xl">
                                        {getEventIcon(event.title, 32)}
                                      </Box>
                                    </Box>
                                    
                                    {/* Event Title */}
                                    <Text
                                      fontSize="2xl"
                                      fontFamily="'Bernhard Tango', cursive"
                                      fontWeight="normal"
                                      color={isCurrentEvent ? "#C19A6C" : "#1f576e"}
                                      lineHeight="1.1"
                                      textShadow="0 2px 6px rgba(255,255,255,0.8)"
                                      letterSpacing="-0.02em"
                                      flex="1"
                                    >
                                      {event.title}
                                    </Text>
                                  </HStack>

                                  {/* Row 2: Location + Time */}
                                  <Flex 
                                    justify="space-between" 
                                    align="center" 
                                    w="100%" 
                                    pl="16"
                                    gap="3"
                                    flexWrap="wrap"
                                  >
                                    {/* Location Badge */}
                                    {event.location && (
                                      <Box
                                        bg="rgba(255, 255, 255, 0.2)"
                                        backdropFilter="blur(8px) saturate(110%)"
                                        borderRadius="full"
                                        px="3"
                                        py="1.5"
                                        border="1px solid rgba(255, 255, 255, 0.3)"
                                        boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                                        flexShrink="0"
                                      >
                                        <HStack gap="1.5" align="center">
                                          <Image
                                            src="/location.png"
                                            alt="Location"
                                            width={12}
                                            height={12}
                                            style={{
                                              width: '12px',
                                              height: '12px',
                                              filter: 'brightness(0) saturate(100%) invert(13%) sepia(47%) saturate(1235%) hue-rotate(188deg) brightness(91%) contrast(93%)'
                                            }}
                                          />
                                          <Text
                                            fontSize="2xs"
                                            color="#1f576e"
                                            fontFamily="'Inter', sans-serif"
                                            fontWeight="600"
                                            textShadow="0 1px 2px rgba(255,255,255,0.8)"
                                          >
                                            {event.location}
                                          </Text>
                                        </HStack>
                                      </Box>
                                    )}
                                    
                                    {/* Time Badge */}
                                    <Box
                                      bg="linear-gradient(135deg, #1f576e, #2b5a72)"
                                      borderRadius="full"
                                      px="3"
                                      py="1.5"
                                      border="1px solid rgba(255, 255, 255, 0.2)"
                                      boxShadow="0 2px 8px rgba(31, 87, 110, 0.3)"
                                      flexShrink="0"
                                    >
                                      <Text
                                        fontSize="2xs"
                                        color="white"
                                        fontFamily="'Inter', sans-serif"
                                        fontWeight="600"
                                        textTransform="uppercase"
                                        letterSpacing="0.5px"
                                        textShadow="0 1px 2px rgba(0,0,0,0.3)"
                                        textAlign="center"
                                      >
                                        {eventData.time}
                                      </Text>
                                    </Box>
                                  </Flex>
                                </VStack>
                              </Box>
                              
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

      {/* Clean Drawer Modal */}
      {isEventModalOpen && selectedEvent && (
        <>
          {/* Simple Backdrop */}
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 9998
            }}
            onClick={() => setIsEventModalOpen(false)}
          />
          
          {/* Slide-up Drawer */}
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
              maxHeight: "85vh"
            }}
          >
            <Box
              bg="rgba(255, 255, 255, 0.25)"
              backdropFilter="blur(20px) saturate(130%)"
              borderTopRadius="24px"
              boxShadow="0 -10px 50px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)"
              border="1px solid rgba(255, 255, 255, 0.3)"
              overflow="hidden"
              mx={{ base: "0", md: "4" }}
            >
              {/* Drag Handle */}
              <Box
                w="40px"
                h="4px"
                bg="rgba(255, 255, 255, 0.6)"
                borderRadius="full"
                mx="auto"
                mt="3"
                mb="4"
                cursor="grab"
                boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                _active={{ cursor: "grabbing", bg: "rgba(255, 255, 255, 0.8)" }}
                _hover={{ bg: "rgba(255, 255, 255, 0.7)" }}
                transition="all 0.2s ease"
              />

              {/* Header */}
              <Box p="6" borderBottom="1px solid" borderColor="rgba(255, 255, 255, 0.4)">
                <HStack justify="space-between" align="center">
                  <HStack gap="4" flex="1">
                    {/* Icon */}
                    <Box
                      w="20"
                      h="20"
                      bg="rgba(255, 255, 255, 0.2)"
                      backdropFilter="blur(12px) saturate(120%)"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="1px solid rgba(255, 255, 255, 0.3)"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
                      minW="20"
                      minH="20"
                      flexShrink="0"
                    >
                      {getEventIcon(selectedEvent.title, 40)}
                    </Box>
                    
                    {/* Title & Time - Responsive Layout */}
                    <Box flex="1" minW="0">
                      {/* Desktop: Title and Time in same line */}
                      <VStack 
                        align="start" 
                        display={{ base: "none", md: "flex" }}
                        gap="2"
                      >
                        <HStack align="center" gap="4" justify="space-between" w="100%">
                          {/* Left: Title + Location */}
                          <HStack gap="4" align="center" flex="1" minW="0">
                            <Heading 
                              fontSize="3xl"
                              color="#1f576e"
                              fontFamily="'Bernhard Tango', cursive"
                              textShadow="0 2px 4px rgba(255,255,255,0.8)"
                              flexShrink="0"
                            >
                              {selectedEvent.title}
                            </Heading>
                            
                            {/* Location Badge next to heading */}
                            {selectedEvent.location && (
                              <Box
                                bg="rgba(255, 255, 255, 0.2)"
                                backdropFilter="blur(8px) saturate(110%)"
                                borderRadius="full"
                                px="3"
                                py="1.5"
                                border="1px solid rgba(255, 255, 255, 0.3)"
                                boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                                flexShrink="0"
                              >
                                <HStack gap="1.5" align="center">
                                  <Image
                                    src="/location.png"
                                    alt="Location"
                                    width={14}
                                    height={14}
                                    style={{
                                      width: '14px',
                                      height: '14px',
                                      filter: 'brightness(0) saturate(100%) invert(13%) sepia(47%) saturate(1235%) hue-rotate(188deg) brightness(91%) contrast(93%)'
                                    }}
                                  />
                                  <Text
                                    fontSize="sm"
                                    color="#1f576e"
                                    fontFamily="'Inter', sans-serif"
                                    fontWeight="600"
                                    textShadow="0 1px 2px rgba(255,255,255,0.8)"
                                  >
                                    {selectedEvent.location}
                                  </Text>
                                </HStack>
                              </Box>
                            )}
                          </HStack>
                          
                          {/* Right: Time Badge */}
                          <Box
                            bg="linear-gradient(135deg, #1f576e, #2b5a72)"
                            borderRadius="full"
                            px="4"
                            py="2"
                            border="1px solid rgba(255, 255, 255, 0.2)"
                            boxShadow="0 2px 8px rgba(31, 87, 110, 0.3)"
                            flexShrink="0"
                          >
                            <Text
                              fontSize="sm"
                              color="white"
                              fontFamily="'Inter', sans-serif"
                              fontWeight="600"
                              textTransform="uppercase"
                              letterSpacing="0.5px"
                              textShadow="0 1px 2px rgba(0,0,0,0.3)"
                              textAlign="center"
                            >
                              {eventDescriptions[selectedEvent.title as keyof typeof eventDescriptions]?.time || 
                               `${new Date(selectedEvent.since).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - ${new Date(selectedEvent.till).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`}
                            </Text>
                          </Box>
                        </HStack>
                      </VStack>

                      {/* Mobile: Title and Time stacked */}
                      <VStack 
                        align="start" 
                        gap="2" 
                        display={{ base: "flex", md: "none" }}
                      >
                        {/* Title + Location row */}
                        <HStack gap="3" align="center" flexWrap="wrap">
                          <Heading 
                            fontSize="2xl"
                            color="#1f576e"
                            fontFamily="'Bernhard Tango', cursive"
                            textShadow="0 2px 4px rgba(255,255,255,0.8)"
                            flexShrink="0"
                          >
                            {selectedEvent.title}
                          </Heading>
                          
                          {/* Location Badge next to heading */}
                          {selectedEvent.location && (
                            <Box
                              bg="rgba(255, 255, 255, 0.2)"
                              backdropFilter="blur(8px) saturate(110%)"
                              borderRadius="full"
                              px="3"
                              py="1.5"
                              border="1px solid rgba(255, 255, 255, 0.3)"
                              boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
                              flexShrink="0"
                            >
                              <HStack gap="1.5" align="center">
                                <Image
                                  src="/location.png"
                                  alt="Location"
                                  width={12}
                                  height={12}
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    filter: 'brightness(0) saturate(100%) invert(13%) sepia(47%) saturate(1235%) hue-rotate(188deg) brightness(91%) contrast(93%)'
                                  }}
                                />
                                <Text
                                  fontSize="xs"
                                  color="#1f576e"
                                  fontFamily="'Inter', sans-serif"
                                  fontWeight="600"
                                  textShadow="0 1px 2px rgba(255,255,255,0.8)"
                                >
                                  {selectedEvent.location}
                                </Text>
                              </HStack>
                            </Box>
                          )}
                        </HStack>
                        
                        {/* Time Badge */}
                        <Box
                          bg="linear-gradient(135deg, #1f576e, #2b5a72)"
                          borderRadius="full"
                          px="3"
                          py="1.5"
                          border="1px solid rgba(255, 255, 255, 0.2)"
                          boxShadow="0 2px 8px rgba(31, 87, 110, 0.3)"
                          alignSelf="flex-start"
                        >
                          <Text
                            fontSize="xs"
                            color="white"
                            fontFamily="'Inter', sans-serif"
                            fontWeight="600"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                            textShadow="0 1px 2px rgba(0,0,0,0.3)"
                            textAlign="center"
                          >
                            {eventDescriptions[selectedEvent.title as keyof typeof eventDescriptions]?.time || 
                             `${new Date(selectedEvent.since).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} - ${new Date(selectedEvent.till).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`}
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </HStack>
                  
                  {/* Close Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEventModalOpen(false)}
                    color="#1f576e"
                    borderRadius="full"
                    bg="rgba(255, 255, 255, 0.2)"
                    backdropFilter="blur(12px) saturate(120%)"
                    border="1px solid rgba(255, 255, 255, 0.3)"
                    w="10"
                    h="10"
                    fontSize="xl"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.3)",
                      transform: "scale(1.05)"
                    }}
                    transition="all 0.2s ease"
                  >
                    ✕
                  </Button>
                </HStack>
              </Box>
              
              {/* Content */}
              <Box p="6" maxH="60vh" overflow="auto">
                {selectedEvent.description && (
                  <VStack gap="4" align="stretch">
                    <Heading
                      fontSize={{ base: "xl", md: "2xl" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                      fontWeight="700"
                      textShadow="0 2px 4px rgba(255,255,255,0.8)"
                    >
                      What to Expect
                    </Heading>
                    <Text 
                      fontSize={{ base: "lg", md: "xl" }}
                      color="#1f576e"
                      lineHeight="1.6"
                      fontFamily="'Aparajita', serif"
                      bg="rgba(255, 255, 255, 0.2)"
                      backdropFilter="blur(12px) saturate(120%)"
                      border="1px solid rgba(255, 255, 255, 0.3)"
                      p="5"
                      borderRadius="16px"
                      textShadow="0 1px 2px rgba(255,255,255,0.8)"
                      boxShadow="0 4px 16px rgba(0, 0, 0, 0.05)"
                    >
                      {selectedEvent.description}
                    </Text>
                    
                    {/* Action Button */}
                    <Flex justify="center" mt="6">
                      <Button
                        bg="#C19A6C"
                        color="white"
                        fontFamily="'Aparajita', serif"
                        fontWeight="600"
                        fontSize={{ base: "lg", md: "xl" }}
                        px="10"
                        py="4"
                        borderRadius="full"
                        onClick={() => setIsEventModalOpen(false)}
                        boxShadow="0 4px 12px rgba(193, 154, 108, 0.3)"
                        _hover={{
                          bg: "#B8916A",
                          transform: "translateY(-1px)",
                          boxShadow: "0 6px 16px rgba(193, 154, 108, 0.4)"
                        }}
                        transition="all 0.2s ease"
                      >
                        Perfect! 💫
                      </Button>
                    </Flex>
                  </VStack>
                )}
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

