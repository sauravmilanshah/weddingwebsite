// Wedding Event Descriptions
export const eventDescriptions = {
  "Check In": {
    title: "Welcome to Our Celebration!",
    description: "Check into your room and get ready for 3 days of pure celebration! Your wedding adventure officially begins here. If the drive made you hungry, grab some lunch! PS: We may have left you a little something to start the party!",
    emoji: "🏨",
    time: "1:00 PM - 4:00 PM"
  },
  "Mehndi": {
    title: "Art, Henna & Good Vibes!",
    description: "Get your hands (and maybe feet!) decorated with beautiful henna designs. It's not just about the art - it's about the stories, laughter, and bonding that happens!",
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
  "Baraat": {
    title: "The Grand Procession!",
    description: "Join the groom's epic baraat! Expect a live band, DJ dropping beats, and a crowd that's ready to party hard. Let's give Saurav the send-off he deserves into this new adventure!",
    emoji: "🐎",
    time: "4:30 PM - 6:00 PM"
  },
  "Wedding Pheras": {
    title: "The Sacred Moment",
    description: "Witness the beautiful ceremony as Saurav and Shivani take their vows around the sacred fire. Bring tissues - it's going to be emotional!",
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
};

// Wedding Events Data
export const allWeddingEvents = [
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
    location: "Splash Infinity Pool",
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
];

// Event icon mapping
export const getEventIcon = (eventName: string, size: number = 24) => {
  const iconFilter = 'brightness(0) saturate(100%) invert(16%) sepia(29%) saturate(1686%) hue-rotate(170deg) brightness(96%) contrast(88%)';
  
  const iconMap: Record<string, string> = {
    'Check In': '/resort.png',
    'Welcome Dinner': '/dinner-table.png',
    'Breakfast': '/breakfast.png',
    'Lunch': '/lunch.png',
    'Baraat': '/car.png',
    'Dinner & Cocktail': '/romantic-dinner.png',
    'High Tea': '/high-tea.png',
    'Checkout': '/namaste.png',
    'Mehndi': '/mehndi.png',
    'Haldi': '/turmeric.png',
    'Wedding Pheras': '/wedding-rings.png',
    'Sangeet': '/dj.png',
    'After Party': '/party.png'
  };

  return {
    src: iconMap[eventName] || '/calendar.png',
    alt: `${eventName} icon`,
    width: size,
    height: size,
    style: { 
      filter: iconFilter,
      width: `${size}px`,
      height: `${size}px`,
      minWidth: `${size}px`,
      minHeight: `${size}px`
    }
  };
};