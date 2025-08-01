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
  Grid,
  useBreakpointValue
} from '@chakra-ui/react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

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
  const timelineData = [
    {
      date: "14th January",
      dayTitle: "Day 1 - Arrival & Mehndi",
      color: "#2b5a72", // Deeper blue
      events: [
        { time: "13:00", name: "Check In" },
        { time: "16:30", name: "Mehndi" },
        { time: "20:30", name: "Welcome Dinner" }
      ]
    },
    {
      date: "15th January", 
      dayTitle: "Day 2 - Wedding Day",
      color: "#1f576e", // Signature blue
      events: [
        { time: "9:00", name: "Breakfast" },
        { time: "10:30", name: "Haldi" },
        { time: "12:00", name: "Lunch" },
        { time: "16:30", name: "Baarat" },
        { time: "18:00", name: "Wedding Pheras" },
        { time: "00:30", name: "After Party" }
      ]
    },
    {
      date: "16th January",
      dayTitle: "Day 3 - Sangeet",
      color: "#1a4a5c", // Darker blue
      events: [
        { time: "9:00", name: "Breakfast" },
        { time: "12:00", name: "Lunch" },
        { time: "20:30", name: "Sangeet" }
      ]
    },
    {
      date: "17th January",
      dayTitle: "Day 4 - Farewell",
      color: "#0f3a4a", // Darkest blue
      events: [
        { time: "9:00", name: "Breakfast" },
        { time: "11:00", name: "Checkout" }
      ]
    }
  ];

  const DayTimeline = ({ day }: { day: typeof timelineData[0] }) => {
    const timelinePosition = useBreakpointValue({ base: 'left', md: 'alternate' }) || 'left';
    
    return (
    <Box
      w="100%"
      maxW={{ base: "100%", md: "600px", lg: "650px" }}
      mx="auto"
      p={{ base: "3", md: "5" }}
      bg="rgba(255, 255, 255, 0.12)"
      borderRadius="2xl"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.25)"
      boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.25)"
      transition="all 0.3s ease"
      css={{
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)"
      }}
      _hover={{
        bg: "rgba(255, 255, 255, 0.18)",
        transform: "translateY(-4px)",
        boxShadow: "0 16px 48px 0 rgba(31, 38, 135, 0.35)",
      }}
    >
      {/* Day Header */}
      <VStack gap="3" mb="6" textAlign="center">
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="bold"
          color={day.color}
          fontFamily="'Bernhard Tango', cursive"
          textShadow="0 1px 2px rgba(255,255,255,0.8)"
          letterSpacing="0.05em"
        >
          {day.date}
        </Text>
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="bold"
          color="#1f576e"
          fontFamily="'Aparajita', serif"
          textShadow="0 1px 2px rgba(255,255,255,0.8)"
          opacity="0.8"
        >
          {day.dayTitle}
        </Text>
        <Box w="60%" h="2px" bg={day.color} opacity="0.6" />
      </VStack>

      {/* Timeline */}
      <Timeline 
        position={timelinePosition as 'left' | 'alternate'}
        sx={{ 
          '& .MuiTimelineItem-root': { 
            minHeight: 'auto',
            '&:before': {
              content: timelinePosition === 'left' ? 'none' : '""',
              padding: 0
            }
          },
          '& .MuiTimelineContent-root': {
            px: { base: 2, md: 3 },
            py: { base: '12px', md: '16px' }
          },
          '& .MuiTimelineOppositeContent-root': {
            display: timelinePosition === 'left' ? 'none' : 'block',
            px: { base: 2, md: 3 },
            py: { base: '12px', md: '16px' }
          }
        }}
      >
        {day.events.map((event, eventIndex) => (
          <TimelineItem key={eventIndex}>
            {timelinePosition === 'alternate' && (
              <TimelineOppositeContent />
            )}
            
            <TimelineSeparator>
              <TimelineDot 
                sx={{ 
                  bgcolor: day.color,
                  border: '2px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: `0 3px 8px ${day.color}40`,
                  width: { xs: 12, md: 16 },
                  height: { xs: 12, md: 16 }
                }} 
              />
              {eventIndex < day.events.length - 1 && (
                <TimelineConnector 
                  sx={{ 
                    bgcolor: day.color,
                    opacity: 0.4,
                    width: 2
                  }} 
                />
              )}
            </TimelineSeparator>

            <TimelineContent>
              <Box
                w="100%" // Make box take full width of timeline content
                p={{ base: "3", md: "4" }}
                bg="rgba(255, 255, 255, 0.08)"
                borderRadius="xl"
                border="1px solid"
                borderColor="rgba(255, 255, 255, 0.15)"
                css={{
                  backdropFilter: "blur(8px) saturate(120%)",
                  WebkitBackdropFilter: "blur(8px) saturate(120%)"
                }}
                transition="all 0.2s ease"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.12)",
                  transform: { md: "translateX(4px)" },
                }}
              >
                <Flex 
                  justify="space-between" 
                  align="center" 
                  gap={{ base: "3", md: "4" }}
                >
                  <Text
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                    fontWeight="bold"
                    color="#1f576e"
                    fontFamily="'Aparajita', serif"
                    textShadow="0 1px 2px rgba(255,255,255,0.8)"
                    flex="1"
                  >
                    {event.name}
                  </Text>
                  <Text
                    fontSize={{ base: "md", md: "lg", lg: "xl" }}
                    fontWeight="bold"
                    color="white"
                    fontFamily="'Aparajita', serif"
                    textShadow="0 1px 2px rgba(0,0,0,0.3)"
                    bg="#1f576e"
                    px={{ base: "3", md: "4" }}
                    py={{ base: "2", md: "2" }}
                    borderRadius="lg"
                    boxShadow="0 2px 8px rgba(31, 87, 110, 0.3)"
                    minW="fit-content"
                  >
                    {event.time}
                  </Text>
                </Flex>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
    );
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
        <VStack gap={{ base: "8", md: "12" }} align="center">
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

          {/* All 4 Timelines Stacked Vertically */}
          <VStack gap={{ base: "8", md: "10" }} w="100%" align="stretch">
            {timelineData.map((day, index) => (
              <DayTimeline key={index} day={day} />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

