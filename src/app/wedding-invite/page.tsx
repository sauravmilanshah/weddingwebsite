'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
  Flex,
  Button
} from '@chakra-ui/react';

interface EventType {
  title: string;
  description: string;
  since: string;
  till: string;
  location?: string;
  id: string;
  day: number;
  color: string;
}

export default function WeddingInvitePage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
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
      case 'Baraat':
        return (
          <Image
            src="/car.png"
            alt="Baraat procession icon"
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
      case 'Dinner & Cocktail':
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
      description: "Check into your room and get ready for 3 days of pure celebration! Your wedding adventure officially begins here. If the drive made you hungry, grab some lunch! PS: We may have left you a little something to start the party!",
      emoji: "🏨",
      time: "1:00 PM - 4:00 PM"
    },
    "Mehndi": {
      title: "Henna Magic Time!",
      description: "Time for henna, music, and pure joy! Get your hands beautifully decorated, then dance, drink, and celebrate while the designs set. The more intricate the mehndi, the longer you have to party!",
      emoji: "🎨",
      time: "4:30 PM - 7:30 PM"
    },
    "Welcome Dinner": {
      title: "Let's Feast Together!",
      description: "Let's begin with a Sufi night under the stars! Indulge in authentic Indian delicacies while mystical melodies transport you. Come hungry for food, thirsty for drinks, and ready for some serious soul-stirring music!",
      emoji: "🍽️",
      time: "7:30 PM - 12:30 AM"
    },
    "Breakfast": {
      title: "Fuel Up for Fun!",
      description: "Morning debrief session! Load up on breakfast while rehashing all the best moments from last night. Fair warning: the gossip might be spicier than the chai!",
      emoji: "☕",
      time: "7:00 AM - 10:00 AM"
    },
    "Haldi": {
      title: "Time to Get Messy!",
      description: "Haldi con sabor español! Turmeric ceremony meets Spanish brunch party - expect golden glow, incredible food, and energy like there's no mañana. Embrace the beautiful chaos!",
      emoji: "💛",
      time: "10:30 AM - 1:00 PM"
    },
    "Lunch": {
      title: "Refuel & Relax",
      description: "After that Spanish Haldi fiesta, you've definitely worked up an appetite! Grab some lunch, catch your breath, and get ready - because the real party starts tonight!",
      emoji: "🥘",
      time: "1:00 PM - 4:00 PM"
    },
    "Baraat": {
      title: "The Grand Procession!",
      description: "Join the groom's epic baraat! Expect a live band, DJ dropping beats, and a crowd that's ready to party hard. Let's give Saurav the send-off he deserves into this new adventure!",
      emoji: "🐎",
      time: "4:30 PM - 6:00 PM"
    },
    "Wedding Pheras": {
      title: "The Sacred Moment",
      description: "It's happening! Witness the beautiful ceremony as Saurav and Shivani become partners for life. Grab some flower petals and get ready to celebrate this magical moment. (Tissues optional but recommended!)",
      emoji: "💍",
      time: "6:30 PM - 8:30 PM"
    },
    "Dinner & Cocktail": {
      title: "Celebration Feast!",
      description: "Time to feast and celebrate! Enjoy incredible food and cocktails, witness an amazing live performance, and dance the night away. Warning: You will definitely be in someone's Instagram story!",
      emoji: "🍽️",
      time: "8:30 PM - 12:30 AM"
    },
    "Sangeet": {
      title: "Dance Like Nobody's Watching!",
      description: "Get glammed up for the night! Friends and cousins take the stage with performances that are equal parts impressive and potentially embarrassing. Grab a drink, enjoy the show, and prepare to witness some brave dance attempts!",
      emoji: "💃",
      time: "8:30 PM - 12:30 AM"
    },
    "After Party": {
      title: "Keep the Party Going!",
      description: "Still standing? Perfect! Shots are mandatory, being tipsy is encouraged, and dancing until sunrise is the only agenda. Sleep is for tomorrow!",
      emoji: "🕺",
      time: "12:30 AM - 5:00 AM"
    },
    "High Tea": {
      title: "Elegant Afternoon Delight",
      description: "Your afternoon rescue mission! For those who need serious caffeine to survive the day, we've got coffee, tea, and snacks. Take a breather, refuel, and get ready for the last big night!",
      emoji: "🫖",
      time: "5:00 PM - 7:00 PM"
    },
    "Checkout": {
      title: "Until We Meet Again!",
      description: "Time to say goodbye! We hope the memories from these 3 days stay with you forever (even if some details are a bit fuzzy). Don't worry - you've got all of Saturday to recover before real life kicks in!",
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
      title: "Baraat",
      since: "2026-01-15T16:30:00",
      till: "2026-01-15T18:00:00",
      description: eventDescriptions["Baraat"]?.description,
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
      title: "Dinner & Cocktail",
      since: "2026-01-15T20:30:00",
      till: "2026-01-16T00:30:00",
      description: eventDescriptions["Dinner & Cocktail"]?.description,
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
      description: "Morning after the BIG night! Load up on breakfast while processing everything - the vows, the dancing, the after party chaos. One more day of celebration to go!",
      location: "The Veranda",
      color: "#1a4a5c"
    },
    {
      day: 3,
      id: "lunch2",
      title: "Lunch",
      since: "2026-01-16T13:00:00",
      till: "2026-01-16T16:00:00",
      description: "Lunch and leisure time! Food is there if you want it, otherwise explore the venue, enjoy the amenities, or do absolutely nothing. Just be ready for tonight's grand finale!",
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
      description: "Round two! We knew you couldn't do this just once. Attempt to recreate last night's magic, except this is your final shot at dancing until sunrise. No pressure!",
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
      description: "The final breakfast! One last meal together before you head home. Discuss last night's performances, who danced the hardest, and start planning your recovery week!",
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

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };


  return (
    <BackgroundWrapper backgroundImage="/background2.png">
      {/* Navigation */}
      <Navigation />
      
      {/* Content */}
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

              {/* Quirky Dress Code Link */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "-8px",
                  marginBottom: "16px"
                }}
              >
                <Link href="/dress-code">
                  <Box
                    px={{ base: "8", md: "12", lg: "16" }}
                    py={{ base: "4", md: "5" }}
                    mx={{ base: "4", md: "6" }}
                    bg="rgba(255, 255, 255, 0.18)"
                    borderRadius="full"
                    border="2px dashed #C19A6C"
                    backdropFilter="blur(6px) saturate(110%)"
                    cursor="pointer"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="2"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.25)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 24px rgba(193, 154, 108, 0.25)",
                      borderStyle: "solid"
                    }}
                    transition="all 0.3s ease"
                    boxShadow="0 4px 12px rgba(31, 87, 110, 0.1)"
                  >
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      color="#1f576e"
                      fontFamily="'Aparajita', serif"
                      fontWeight="bold"
                      textShadow="0 2px 4px rgba(255,255,255,0.8)"
                      textAlign="center"
                    >
                      👗 Confused about what to wear? Click here to see our dress code guide!
                    </Text>
                  </Box>
                </Link>
              </motion.div>

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
                                  <VStack align="flex-start" gap="2" w="100%">
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
                                  </VStack>
                                )}

                                {/* Click for details hint */}
                                <Box
                                  w="100%"
                                  pt="3"
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <Text
                                    fontSize="2xs"
                                    color={isCurrentEvent ? "#C19A6C" : "#2b5a72"}
                                    fontFamily="'Aparajita', serif"
                                    fontStyle="italic"
                                    opacity="0.7"
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
    </BackgroundWrapper>
  );
}

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