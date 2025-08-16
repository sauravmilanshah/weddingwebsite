# Dress Code Section Documentation

This document provides the standardized format and guidelines for creating consistent dress code sections on the wedding website.

## Overall Structure

Each dress code event follows this exact structure:

```jsx
{/* Event Name */}
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
    {/* Main Description */}
    {/* Detailed Guidance */}
    {/* Goal Statement */}
    {/* Mood Board Link */}
  </VStack>
</Box>
```

## Section Components

### 1. Header Section
```jsx
<VStack align="start" gap="3" w="full">
  <HStack gap="3">
    <Text fontSize="2xl">[EMOJI]</Text>
    <Heading 
      fontSize={{ base: "xl", md: "2xl" }}
      color="#1f576e"
      fontFamily="'Aparajita', serif"
    >
      [Event Name]
    </Heading>
  </HStack>
  
  <Text 
    fontSize={{ base: "md", md: "lg" }}
    color="#2b5a72"
    fontWeight="600"
    bg="rgba([THEME_COLOR], 0.1)"
    px="3"
    py="2"
    borderRadius="lg"
    border="1px solid rgba([THEME_COLOR], 0.2)"
  >
    [Theme] • [Style Description]
  </Text>
</VStack>
```

### 2. Main Description
```jsx
<Text 
  fontSize={{ base: "md", md: "lg" }}
  color="#2b5a72"
  lineHeight="1.7"
>
  [Evocative scene-setting description with theme explanation]
  <Text as="span" fontWeight="600" color="#1f576e">
    [Key highlighted concept]
  </Text>
  [Additional context and practical considerations]
</Text>
```

### 3. Detailed Guidance
```jsx
<VStack align="start" gap="3" w="full">
  <Text 
    fontSize={{ base: "md", md: "lg" }}
    color="#2b5a72"
    lineHeight="1.7"
  >
    <Text as="span" fontWeight="600" color="#1f576e">For the gentlemen:</Text> [Specific outfit suggestions and style guidance]
  </Text>
  
  <Text 
    fontSize={{ base: "md", md: "lg" }}
    color="#2b5a72"
    lineHeight="1.7"
  >
    <Text as="span" fontWeight="600" color="#1f576e">For the ladies:</Text> [Specific outfit suggestions and style guidance]
  </Text>
</VStack>
```

### 4. Goal Statement
```jsx
<Text 
  fontSize={{ base: "md", md: "lg" }}
  color="#2b5a72"
  lineHeight="1.7"
  fontStyle="italic"
>
  The goal? [Aspirational statement about the overall vibe and feeling]
</Text>
```

### 5. Mood Board Link
```jsx
<Box 
  p="4"
  bg="rgba(193, 154, 108, 0.1)"
  borderRadius="xl"
  border="1px solid rgba(193, 154, 108, 0.3)"
  w="full"
>
  <VStack align="start" gap="3">
    <HStack gap="2">
      <Text fontSize="lg">💡</Text>
      <Text 
        fontSize="md" 
        color="#1f576e" 
        fontWeight="600"
      >
        Need Inspiration?
      </Text>
    </HStack>
    <Text fontSize="sm" color="#2b5a72" mb="2">
      [Custom description for the mood board content]
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
```

## Style Guidelines

### Typography
- **Headings**: `fontFamily="'Aparajita', serif"`, `color="#1f576e"`
- **Body Text**: `color="#2b5a72"`, `lineHeight="1.7"`
- **Highlights**: `fontWeight="600"`, `color="#1f576e"`
- **Responsive Sizing**: `fontSize={{ base: "md", md: "lg" }}` for body text
- **Responsive Sizing**: `fontSize={{ base: "xl", md: "2xl" }}` for headings

### Colors
- **Primary Text**: `#2b5a72`
- **Accent/Highlights**: `#1f576e`
- **Button Primary**: `#C19A6C`
- **Button Hover**: `#A6825A`
- **Mood Board Background**: `rgba(193, 154, 108, 0.1)` with `rgba(193, 154, 108, 0.3)` border

### Spacing
- **Main Container**: `gap="6"`
- **Sub-sections**: `gap="3"`
- **Padding**: `p={{ base: "6", md: "8" }}` for main box
- **Mood Board Padding**: `p="4"`
- **Button Padding**: `px="6"` and `py="3"` for mood board buttons

## Content Writing Guidelines

### Tone & Voice
- **Engaging & Descriptive**: Use vivid imagery and scene-setting
- **Practical & Helpful**: Provide specific, actionable guidance
- **Aspirational**: End with inspirational goal statements
- **Conversational**: Use contractions and friendly language

### Structure
1. **Hook**: Start with evocative scene-setting
2. **Context**: Explain the theme and practical considerations
3. **Specifics**: Separate guidance for gentlemen and ladies
4. **Inspiration**: Aspirational closing statement
5. **Resources**: Mood board with encouraging call-to-action

### Required Elements
- **Event emoji** in header
- **Theme description** (e.g., "Indo-Western • Darker Colors")
- **"For the gentlemen:" and "For the ladies:"** sections
- **Italicized goal statement** starting with "The goal?"
- **Mood board link** with consistent button styling

## Example Events Implemented

### 1. Mehendi & Welcome Dinner
- **Theme**: Indo-Western • Darker Colors
- **Emoji**: 🎨
- **Vibe**: Sophisticated fusion with playful twist
- **Key Points**: Henna-friendly darker colors, Indo-western styles

### 2. Haldi Ceremony
- **Theme**: Spanish Style • Light & Breezy
- **Emoji**: ☀️
- **Vibe**: Mediterranean coastal elegance
- **Key Points**: Light fabrics, Spanish-inspired cuts, vacation chic

## Implementation Notes

### Technical Requirements
- All mood board links use `window.open()` with `_blank` target
- Consistent use of Chakra UI components
- Responsive design with base/md breakpoints
- Glass morphism effects with backdrop blur

### Accessibility
- Proper heading hierarchy
- Sufficient color contrast
- Descriptive link text
- Keyboard navigation support

### Maintenance
- Keep mood board URLs updated
- Ensure consistent spacing and typography
- Test responsive behavior on mobile devices
- Validate all external links

## Future Events Template

When adding new dress code events, copy this template and fill in the bracketed sections:

```
Event: [EVENT_NAME]
Emoji: [EMOJI]
Theme: [THEME] • [STYLE_DESCRIPTION]
Mood Board: [URL]
Vibe: [OVERALL_AESTHETIC_DESCRIPTION]
Gentlemen: [SPECIFIC_OUTFIT_GUIDANCE]
Ladies: [SPECIFIC_OUTFIT_GUIDANCE]
Goal: [ASPIRATIONAL_STATEMENT]
```

This ensures consistency across all dress code sections while maintaining each event's unique character.