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

export default function TravelTipsPage() {
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
    </BackgroundWrapper>
  );
}