# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding website for Shivani & Saurav's wedding celebration at Oleander Farms, Karjat (January 14-16, 2026). Built as a modern, elegant single-page application showcasing wedding details, logistics, and RSVP functionality.

## Tech Stack & Architecture

**Framework**: Next.js 15.4.5 with App Router
**UI Library**: Chakra UI v3 with custom wedding theme system
**Styling**: Custom theme tokens with glass morphism effects
**Typography**: Inter font with variable weights (300-600)
**Language**: TypeScript with strict mode enabled

### Key Architectural Patterns

1. **Custom Theme System** (`src/theme/system.ts`):
   - Wedding color palette: soft pink (#E8B4B8), warm gold (#C19A6C), sage green (#A6B0A6), cream (#F5F5F0)
   - Semantic tokens for consistent styling across components
   - Glass morphism utility classes with backdrop blur effects
   - Gradient tokens for elegant visual transitions

2. **Provider Pattern** (`src/components/ui/provider.tsx`):
   - Wraps the entire app with ChakraProvider using custom theme system
   - Applied at the root layout level for global theme consistency

3. **Error Handling** (`src/components/ErrorBoundary.tsx`):
   - Class-based error boundary with graceful fallback UI
   - Includes HOC pattern (`withErrorBoundary`) for functional components
   - Provides user-friendly error recovery with page refresh option

4. **Component Architecture**:
   - Single-page application with navigation anchors
   - Fixed navigation bar with scroll-based styling changes
   - Responsive design with mobile-first approach
   - Countdown timer with real-time updates

## Development Commands

```bash
# Development with Turbopack (faster builds)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Code linting
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main wedding page
│   └── globals.css        # Global styles
├── components/
│   ├── ErrorBoundary.tsx  # Error handling component
│   └── ui/
│       └── provider.tsx   # Chakra UI provider wrapper
└── theme/
    └── system.ts          # Custom Chakra UI theme system
```

## Important Development Notes

### Theme Usage
- Always use semantic tokens from the custom theme system
- Wedding color palette is defined in `src/theme/system.ts`
- Glass morphism effects are available via `.glass-card` utility class
- Use responsive breakpoints: `base` (mobile), `md` (tablet), `lg` (desktop)

### Navigation Component
- Fixed positioning with scroll-based animations
- Centers navigation items using Flexbox with `justify="center"`
- Responsive breakpoint switches to mobile menu at `lg` breakpoint
- RSVP button uses wedding theme colors with hover effects

### Component Patterns
- Use Chakra UI `Link` component for internal navigation
- Wrap buttons in `Link` components instead of using `as` prop with href
- Apply wedding theme gradients using `bgGradient` and `bgClip="text"`
- Implement smooth scroll behavior for anchor navigation

### Performance Considerations
- Uses Turbopack for faster development builds
- Inter font is optimized with `next/font/google`
- Countdown timer updates are throttled to 1-second intervals
- Scroll event listeners are properly cleaned up with useEffect

### Wedding-Specific Features
- Wedding date: January 14-16, 2026
- Venue: Oleander Farms, Karjat, India
- Navigation sections: Wedding Invite, Dress Code, Mood Boards, Logistics, Things to do at Oleander, Travel Tips for Mumbai, RSVP
- Real-time countdown timer to wedding date
- Glass morphism design aesthetic throughout

## Current Development Status

The navigation bar has been recently refactored with:
- Proper centering using Chakra UI Flex components
- Enhanced logo styling with gradient text effects
- Improved responsive behavior and mobile menu
- Fixed TypeScript errors related to Link usage
- Consistent wedding theme application throughout

When making changes to navigation or theme-related components, ensure compatibility with the custom theme system and maintain the elegant glass morphism aesthetic.

## Research Pattern for Complex Issues

When encountering complex technical problems that require deeper research, you can ask the user to conduct research on Perplexity using this pattern:

**Request Format:**
"Can you please give me a prompt for Perplexity? I will ask Perplexity and give you the result back so we can figure out what's happening."

**Research Prompt Structure:**
1. **Problem Statement**: Clear description of the issue
2. **Context**: What has been tried and current state
3. **Specific Research Needs**: Numbered list of technical questions
4. **Desired Outcomes**: What type of solutions/examples are needed

**Example Research Areas:**
- CSS/Layout issues (centering, responsive design, flex/grid problems)
- Framework-specific patterns (Chakra UI, Next.js best practices)
- Performance optimization techniques
- Browser compatibility issues
- Advanced styling patterns (animations, transitions, theming)

This research pattern proved highly effective for solving the navigation centering issue by providing expert-level technical insights and working code examples.