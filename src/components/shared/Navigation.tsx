'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Container,
  Flex,
  Grid,
  Button,
  VStack
} from '@chakra-ui/react';
import { SCROLL_THRESHOLD, NAVIGATION_ITEMS } from '@/constants/wedding';

const Navigation = () => {
  const pathname = usePathname();

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
          <Link href="/">
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
          </Link>
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
                  <Link href="/">
                    <Button
                      variant="ghost"
                      px="3"
                      py="2"
                      borderRadius="md"
                      fontSize="xl"
                      fontWeight="bold"
                      color="#1f576e"
                      textShadow="0 1px 2px rgba(255,255,255,0.8)"
                      transition="all 0.2s ease"
                      border={pathname === '/' ? "2px solid #C19A6C" : "2px solid transparent"}
                      boxShadow={pathname === '/' ? "0 0 15px rgba(193, 154, 108, 0.4), 0 4px 12px rgba(193, 154, 108, 0.2)" : "none"}
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
                  </Link>
                  
                  {NAVIGATION_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link key={item.name} href={item.href}>
                        <Button
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
                      </Link>
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
              display={(scrolled && pathname === '/wedding-invite') ? "none" : "block"}
              transition="all 0.3s ease"
            >
              <Link href="/">
                <Box 
                  position="relative" 
                  w="100px" 
                  h="100px"
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
              </Link>
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
                {NAVIGATION_ITEMS.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button
                      onClick={() => setMobileMenuOpen(false)}
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
                  </Link>
                ))}
              </VStack>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Navigation;