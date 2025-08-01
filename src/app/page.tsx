'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
  Link,
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
    { name: 'Wedding Invite', href: 'wedding-invite' },
    { name: 'Dress Code', href: 'dress-code' },
    { name: 'Mood Boards', href: 'mood-boards' },
    { name: 'Logistics', href: 'logistics' },
    { name: 'Things to do at Oleander', href: 'oleander' },
    { name: 'Travel Tips for Mumbai', href: 'travel-tips' },
    { name: 'RSVP', href: 'rsvp' }
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
        transform={(scrolled && currentPage === 'wedding-invite') ? "translateY(-100%)" : "translateY(0)"}
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
            lg: (scrolled && currentPage === 'wedding-invite') ? "none" : "block" 
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
                bg="rgba(255, 255, 255, 0.16)"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.3)"
                boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                w="fit-content"
                transition="all 0.3s ease"
                css={{
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)"
                }}
                _hover={{
                  bg: "rgba(255, 255, 255, 0.25)",
                  boxShadow: "0 20px 40px -5px rgba(31, 38, 135, 0.5)",
                  transform: "translateY(-2px)",
                }}
              >
                <Flex as="nav" gap={6} wrap="nowrap" align="center">
                  {navigation.slice(0, -1).map((item) => (
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
                      _hover={{
                        color: "#1a4d63",
                        bg: "rgba(255, 255, 255, 0.3)",
                        textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                        transform: "translateY(-1px)",
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Flex>
              </Box>
            </Box>

            {/* RSVP Button - Right - Column 3 */}  
            <Box py="2" display="flex" justifyContent="center">
              <Link href="#rsvp" textDecoration="none">
                <Box
                  px="6"
                  py="2"
                  borderRadius="2xl"  
                  bg="rgba(255, 255, 255, 0.16)"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                  transition="all 0.3s ease"
                  cursor="pointer"
                  css={{
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)"
                  }}
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 20px 40px -5px rgba(31, 38, 135, 0.5)",
                    transform: "translateY(-2px)",
                  }}
                >
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="#1f576e"
                    textShadow="0 2px 4px rgba(255,255,255,0.8)"
                    letterSpacing="0.1em"
                    textAlign="center"
                    fontFamily="'Aparajita', serif"
                  >
                    RSVP
                  </Text>
                </Box>
              </Link>
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
              bg="rgba(255, 255, 255, 0.16)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.3)"
              borderRadius="lg"
              boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
              css={{
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)"
              }}
              _hover={{
                bg: "rgba(255, 255, 255, 0.25)",
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
              bg="rgba(255, 255, 255, 0.9)"
              backdropFilter="blur(20px)"
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
                <Box pt="2">
                  <Button
                    size="md"
                    width="full"
                    bg="#E8B4B8"
                    color="white"
                    fontWeight="medium"
                    borderRadius="full"
                    _hover={{
                      bg: "#C19A6C",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(232, 180, 184, 0.4)",
                    }}
                    transition="all 0.2s ease"
                    onClick={() => {
                      setCurrentPage('rsvp');
                      setMobileMenuOpen(false);
                    }}
                  >
                    RSVP
                  </Button>
                </Box>
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
        bg="rgba(255, 255, 255, 0.16)"
        color="#1f576e"
        borderRadius="xl"
        p={{ base: "2", md: "4" }}
        minW={{ base: "45px", md: "60px" }}
        textAlign="center"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.3)"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        transition="all 0.3s ease"
        css={{
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)"
        }}
        _hover={{
          bg: "rgba(255, 255, 255, 0.25)",
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

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  
  const renderCurrentPage = () => {
    if (currentPage === 'wedding-invite') {
      return <WeddingInvitePage />;
    }
    // For now, return the hero section for all other pages
    return <HeroSection />;
  };

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* Indian Wedding Flower Shower */}
      <IndianWeddingFlowerShower />
      
      {/* Background Image */}
      <Box
        position="absolute"
        inset="0"
        backgroundImage="url('/wedding-background.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        opacity="0.7"
      />

      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {renderCurrentPage()}
    </Box>
  );
}

// Hero Section Component
const HeroSection = () => {
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
            bg="rgba(255, 255, 255, 0.16)"
            borderRadius="3xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.3)"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            transition="all 0.3s ease"
            css={{
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)"
            }}
            _hover={{
              bg: "rgba(255, 255, 255, 0.25)",
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
              >
                View Details
              </Button>
            </Box>
          </Box>
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
            <Heading
              fontSize="2xl"
              color="#1f576e"
              fontFamily="'Aparajita', serif"
              textAlign="center"
              fontWeight="bold"
            >
              Wedding Schedule
            </Heading>
            
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
                  bg="rgba(255, 255, 255, 0.25)"
                  backdropFilter="blur(20px) saturate(180%)"
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
                          >
                            Now: {currentEvent.title}
                          </Text>
                          <Text
                            fontSize={{ base: "md", md: "lg" }}
                            color="#2b5a72"
                            fontFamily="'Aparajita', serif"
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
                          fontWeight="medium"
                        >
                          Next: {nextEvent.title}
                        </Text>
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          color="#2b5a72"
                          fontFamily="'Aparajita', serif"
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
                { day: 1, title: "Jan 14", subtitle: "Mehndi & Welcome", emoji: "🎨", color: "#2b5a72" },
                { day: 2, title: "Jan 15", subtitle: "Haldi & Wedding", emoji: "💍", color: "#1f576e" },
                { day: 3, title: "Jan 16", subtitle: "Sangeet & Party", emoji: "💃", color: "#1a4a5c" },
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
                      bg={isSelected ? `${dayInfo.color}20` : "rgba(255, 255, 255, 0.4)"}
                      borderRadius="xl"
                      cursor="pointer"
                      onClick={() => setSelectedDay(dayInfo.day)}
                      border="2px solid"
                      borderColor={isSelected ? dayInfo.color : "rgba(31, 87, 110, 0.2)"}
                      backdropFilter="blur(10px)"
                      _hover={{ 
                        bg: isSelected ? `${dayInfo.color}30` : "rgba(255, 255, 255, 0.6)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(31, 87, 110, 0.2)"
                      }}
                      transition="all 0.3s ease"
                      boxShadow="0 4px 12px rgba(31, 87, 110, 0.1)"
                      minW={{ base: "140px", md: "180px" }}
                      textAlign="center"
                    >
                      <VStack gap="2">
                        <Text
                          fontSize={{ base: "xl", md: "2xl" }}
                          color={isSelected ? dayInfo.color : "#1f576e"}
                          fontFamily="'Aparajita', serif"
                          fontWeight="bold"
                        >
                          {dayInfo.title}
                        </Text>
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          color="#2b5a72"
                          fontFamily="'Aparajita', serif"
                          fontWeight="medium"
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
                bg="rgba(255, 255, 255, 0.35)"
                border="2px solid rgba(31, 87, 110, 0.2)"
                borderRadius="20px"
                backdropFilter="blur(20px) saturate(200%)"
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
                            bg={isCurrentEvent 
                              ? "rgba(193, 154, 108, 0.15)" 
                              : "rgba(255, 255, 255, 0.25)"
                            }
                            backdropFilter="blur(16px) saturate(150%)"
                            borderRadius="20px"
                            border={isCurrentEvent 
                              ? "2px solid #C19A6C" 
                              : "1px solid rgba(31, 87, 110, 0.2)"
                            }
                            boxShadow={isCurrentEvent 
                              ? "0 8px 25px rgba(193, 154, 108, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)" 
                              : "0 4px 15px rgba(31, 87, 110, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                            }
                            cursor="pointer"
                            onClick={() => handleEventClick(event)}
                            transition="all 0.3s ease"
                            _hover={{
                              transform: "translateY(-2px)",
                              boxShadow: isCurrentEvent 
                                ? "0 12px 30px rgba(193, 154, 108, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)" 
                                : "0 8px 20px rgba(31, 87, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)"
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
                              border="1px solid rgba(255, 255, 255, 0.3)"
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
                                border="1px solid rgba(255, 255, 255, 0.4)"
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

                            {/* Subtle Gradient Overlay */}
                            <Box
                              position="absolute"
                              top="0"
                              left="0"
                              right="0"
                              bottom="0"
                              bg={isCurrentEvent 
                                ? "linear-gradient(135deg, rgba(193, 154, 108, 0.05) 0%, rgba(232, 180, 184, 0.05) 100%)"
                                : "linear-gradient(135deg, rgba(31, 87, 110, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)"
                              }
                              borderRadius="20px"
                              pointerEvents="none"
                            />
                            
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
                                  <Text fontSize={{ base: "2xl", md: "3xl" }}>
                                    {eventData.emoji}
                                  </Text>
                                </Box>
                                
                                {/* Event Title with Signature Blue */}
                                <VStack align="flex-start" gap="1" flex="1">
                                  <Text
                                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                                    fontFamily="'Bernhard Tango', cursive"
                                    fontWeight="normal"
                                    color={isCurrentEvent ? "#C19A6C" : "#1f576e"}
                                    lineHeight="1.1"
                                    textShadow="0 2px 4px rgba(255,255,255,0.8)"
                                    letterSpacing="-0.02em"
                                  >
                                    {event.title}
                                  </Text>
                                  <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    color="#2b5a72"
                                    fontFamily="'Aparajita', serif"
                                    fontWeight="medium"
                                    textTransform="uppercase"
                                    letterSpacing="0.1em"
                                    opacity="0.8"
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
                                    color={isCurrentEvent ? "#2b5a72" : "gray.700"}
                                    fontFamily="'Aparajita', serif"
                                    lineHeight="1.5"
                                    fontWeight="medium"
                                    textShadow="0 1px 2px rgba(255,255,255,0.5)"
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
                                  fontWeight="medium"
                                  opacity="0.6"
                                  textTransform="uppercase"
                                  letterSpacing="0.5px"
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

      {/* Event Details Slide-Up Sheet */}
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
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 9998
            }}
            onClick={() => setIsEventModalOpen(false)}
          />
          
          {/* Slide-up Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
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
              bg="rgba(255, 255, 255, 0.95)"
              backdropFilter="blur(20px) saturate(180%)"
              borderTopRadius="24px"
              border="1px solid rgba(255, 255, 255, 0.3)"
              boxShadow="0 -10px 40px rgba(0, 0, 0, 0.2)"
              p={{ base: "6", md: "8" }}
              maxH="85vh"
              overflow="auto"
            >
              {/* Handle bar */}
              <Box
                w="40px"
                h="4px"
                bg="rgba(31, 87, 110, 0.3)"
                borderRadius="full"
                mx="auto"
                mb="6"
              />
              
              <VStack gap="6" alignItems="flex-start" w="100%">
                {/* Header */}
                <HStack justify="space-between" w="100%">
                  <VStack align="flex-start" gap="2" flex="1">
                    <HStack gap="3" align="center">
                      <Text fontSize="3xl">
                        {eventDescriptions[selectedEvent.title as keyof typeof eventDescriptions]?.emoji || "🎉"}
                      </Text>
                      <Heading 
                        size="lg" 
                        color="#1f576e"
                        fontFamily="'Aparajita', serif"
                        fontWeight="bold"
                      >
                        {selectedEvent.title}
                      </Heading>
                    </HStack>
                    
                    <Text 
                      fontSize="md" 
                      color="#2b5a72"
                      fontFamily="'Aparajita', serif"
                      fontWeight="medium"
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
                  </VStack>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEventModalOpen(false)}
                    color="#2b5a72"
                    borderRadius="full"
                    p="2"
                  >
                    ✕
                  </Button>
                </HStack>
                
                {/* Description */}
                {selectedEvent.description && (
                  <Box
                    p="4"
                    bg="rgba(31, 87, 110, 0.05)"
                    borderRadius="12px"
                    border="1px solid rgba(31, 87, 110, 0.1)"
                    w="100%"
                  >
                    <Text 
                      fontSize="md" 
                      color="gray.700"
                      lineHeight="1.7"
                      fontFamily="'Aparajita', serif"
                    >
                      {selectedEvent.description}
                    </Text>
                  </Box>
                )}
                
                {/* Fun Action Button */}
                <Button
                  w="100%"
                  bg="linear-gradient(135deg, #C19A6C, #E8B4B8)"
                  color="white"
                  fontFamily="'Aparajita', serif"
                  fontWeight="bold"
                  fontSize="lg"
                  py="6"
                  borderRadius="16px"
                  onClick={() => setIsEventModalOpen(false)}
                  _hover={{
                    bg: "linear-gradient(135deg, #B8916A, #D1A4A8)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(193, 154, 108, 0.4)"
                  }}
                  transition="all 0.3s ease"
                >
                  Can&apos;t wait! 🎉
                </Button>
              </VStack>
            </Box>
          </motion.div>
        </>
      )}
    </Box>
  );
};

