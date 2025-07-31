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
      { type: 'rose', colors: ['white', 'red', 'pink'], weight: 25 },
      { type: 'marigold', colors: ['orange', 'yellow'], weight: 35 },
      { type: 'jasmine', colors: ['white'], weight: 25 },
      { type: 'lotus', colors: ['white', 'pink'], weight: 15 }
    ];

    const createPetal = () => {
      const petal = document.createElement('div');
      
      // Select flower type based on weight
      const rand = Math.random() * 100;
      let selectedFlower;
      if (rand < 25) selectedFlower = flowerTypes[0]; // rose
      else if (rand < 60) selectedFlower = flowerTypes[1]; // marigold  
      else if (rand < 85) selectedFlower = flowerTypes[2]; // jasmine
      else selectedFlower = flowerTypes[3]; // lotus

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

const Navigation = () => {
  const navigation = [
    { name: 'Wedding Invite', href: '#wedding-invite' },
    { name: 'Dress Code', href: '#dress-code' },
    { name: 'Mood Boards', href: '#mood-boards' },
    { name: 'Logistics', href: '#logistics' },
    { name: 'Things to do at Oleander', href: '#oleander' },
    { name: 'Travel Tips for Mumbai', href: '#travel-tips' },
    { name: 'RSVP', href: '#rsvp' }
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
        transition="all 0.3s ease"
        aria-label="Main navigation"
      >
        {/* Logo - Positioned absolutely outside grid */}
        <Box
          position="absolute"
          top={scrolled ? "calc(50% + 8px)" : "calc(50% + 16px)"}
          left="12"
          transform="translateY(-50%)"
          display={{ base: "none", lg: "block" }}
          transition="all 0.3s ease"
        >
          <Box position="relative" w="120px" h="120px">
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
                    <Link
                      key={item.name}
                      href={item.href}
                      px="3"
                      py="2"
                      borderRadius="md"
                      fontSize="xl"
                      fontWeight="bold"
                      color="#1f576e"
                      textShadow="0 1px 2px rgba(255,255,255,0.8)"
                      letterSpacing="0.02em"
                      textDecoration="none"
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
                    </Link>
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

          {/* Mobile Menu Button */}
          <Flex display={{ base: "flex", lg: "none" }} justify="center" p="4">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              aria-label="Toggle navigation menu"
              size="md"
              p="2"
              color="gray.700"
              bg="rgba(255, 255, 255, 0.9)"
              borderRadius="lg"
              _hover={{
                bg: "rgba(232, 180, 184, 0.2)",
              }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </Button>
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
                  <Link
                    key={item.name}
                    href={item.href}
                    p="3"
                    borderRadius="md"
                    fontWeight="medium"
                    color="gray.700"
                    textDecoration="none"
                    transition="all 0.2s ease"
                    display="block"
                    _hover={{
                      bg: "rgba(232, 180, 184, 0.1)",
                      color: "gray.900",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Box pt="2">
                  <Link href="#rsvp" textDecoration="none" onClick={() => setMobileMenuOpen(false)}>
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
                    >
                      RSVP
                    </Button>
                  </Link>
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
  const weddingDate = useMemo(() => new Date(WEDDING_DATE), []);

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

      <Navigation />

      {/* Main Hero Section */}
      <Box 
        as="main" 
        id="main-content"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px="6"
        pt="20"
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
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "6xl" }}
                  fontWeight="normal"
                  color="#1f576e"
                  textShadow="0 2px 4px rgba(255,255,255,0.8)"
                  lineHeight="none"
                  letterSpacing="-0.02em"
                  fontFamily="'Bernhard Tango', cursive"
                >
                  Shivani <Text as="span" color="#1f576e" textShadow="0 2px 4px rgba(255,255,255,0.8)" fontFamily="'Bernhard Tango', cursive" fontWeight="normal">&</Text> Saurav
                </Heading>
                <HStack gap="6" align="center">
                  <Box w="12" h="1px" bg="gray.300" />
                  <Box w="2" h="2" borderRadius="full" bg="gray.400" />
                  <Box w="12" h="1px" bg="gray.300" />
                </HStack>
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
    </Box>
  );
}