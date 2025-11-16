# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding website for Shivani & Saurav's wedding celebration at Oleander Farms, Karjat (January 14-16, 2026). Originally built as a monolithic single-page application, completely refactored into a modern, modular Next.js App Router architecture.

## Major Refactoring Achievement (December 2024)

### The Challenge
- **Original State**: 6,265-line monolithic `page.tsx` file containing everything
- **Problem**: Unmaintainable codebase, no URL routing, poor SEO, impossible to bookmark specific sections
- **Solution**: Complete architectural transformation to modular Next.js App Router

### Comprehensive Migration Strategy

#### Phase 1: Infrastructure Setup
1. **Route Structure Creation**: Set up Next.js App Router directory structure for all pages
2. **Component Extraction**: Extracted shared components (Navigation, FlowerShower, BackgroundWrapper)
3. **Data Organization**: Centralized wedding data, constants, and event information
4. **Theme System Migration**: Maintained existing Chakra UI v3 theme system

#### Phase 2: Component Modularization  
1. **Navigation System**: Migrated to proper Next.js Link-based routing with usePathname()
2. **Background Management**: Created dynamic background system with different images for home vs other pages
3. **Shared Components**: 
   - `Navigation.tsx` - Fixed navigation with scroll effects and mobile menu
   - `FlowerShower.tsx` - Animated wedding petal effects with Framer Motion
   - `CountdownTimer.tsx` - Real-time wedding countdown
   - `BackgroundWrapper.tsx` - Consistent styling and background management

#### Phase 3: Page Migration (100% Functionality Preservation)
1. **Hero Page** (`/`) - Landing page with countdown and flower shower
2. **Wedding Timeline** (`/wedding-invite`) - Interactive 4-day timeline with 17 events, modal system
3. **Dress Code Guide** (`/dress-code`) - 5 event outfit guides with Pinterest mood boards
4. **Logistics Hub** (`/logistics`) - Google Maps integration, travel info, wedding schedule, FAQs
5. **Venue Activities** (`/oleander`) - Comprehensive venue amenities and activities guide  
6. **Travel Guide** (`/travel-tips`) - Complete Mumbai recommendations with personal anecdotes

### Technical Achievements

#### Routing Transformation
- **Before**: Client-side state management (`currentPage`, `setCurrentPage`)
- **After**: Proper URL-based routing with Next.js App Router
- **Benefits**: SEO optimization, bookmarking, browser navigation, social sharing

#### Bundle Optimization
- **Before**: Single 180kB page with everything loaded
- **After**: Optimized per-page bundles:
  - `/` - 1.98 kB (Hero)  
  - `/dress-code` - 3.12 kB
  - `/logistics` - 7.26 kB  
  - `/oleander` - 4.11 kB
  - `/travel-tips` - 5.19 kB
  - `/wedding-invite` - 6.16 kB

#### Functionality Preservation
✅ **Interactive Timeline**: Complete 4-day wedding schedule with event modals and drag gestures  
✅ **Google Maps Integration**: Actual Oleander Farms coordinates with embedded maps  
✅ **Pinterest Integration**: All dress code mood boards including updated Haldi board  
✅ **Animations**: All Framer Motion effects and glass morphism styling maintained  
✅ **Responsive Design**: Mobile-first design across all pages  
✅ **Theme Consistency**: Wedding colors, fonts, and styling patterns preserved  

## Current Architecture

### Tech Stack
- **Framework**: Next.js 15.4.5 with App Router
- **UI Library**: Chakra UI v3 with custom wedding theme system
- **Animations**: Framer Motion for smooth transitions
- **Styling**: Custom theme tokens with glass morphism effects
- **Typography**: Custom fonts (Bernhard Tango, Aparajita, Inter)
- **Language**: TypeScript with strict mode enabled

### Project Structure
```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Hero/landing page  
│   ├── wedding-invite/page.tsx   # Interactive timeline
│   ├── dress-code/page.tsx       # Outfit guides with Pinterest
│   ├── logistics/page.tsx        # Google Maps, travel, schedule
│   ├── oleander/page.tsx         # Venue activities guide
│   ├── travel-tips/page.tsx      # Mumbai recommendations
│   └── globals.css               # Global styles
├── components/
│   ├── shared/                   # Reusable components
│   │   ├── Navigation.tsx        # App-wide navigation
│   │   ├── FlowerShower.tsx      # Wedding petal animation
│   │   ├── CountdownTimer.tsx    # Real-time countdown
│   │   └── BackgroundWrapper.tsx # Background management
│   ├── page-specific/            # Page-specific components
│   │   └── hero/HeroSection.tsx  # Landing page hero
│   └── ui/provider.tsx           # Chakra UI provider
├── constants/
│   └── wedding.ts                # Wedding dates, navigation, theme tokens
├── data/
│   └── wedding-events.ts         # Complete event data and descriptions
├── types/                        # TypeScript interfaces
├── utils/                        # Helper functions
└── theme/
    └── system.ts                 # Chakra UI theme configuration
```

### Key Architectural Patterns

1. **URL-Based Routing**: Proper Next.js App Router with individual page optimization
2. **Component Modularity**: Shared components with clear separation of concerns  
3. **Data Centralization**: Wedding events, constants, and configuration in dedicated files
4. **Theme System**: Consistent design tokens across all pages
5. **Background Management**: Dynamic backgrounds (wedding-background.png for home, background2.png for others)
6. **Animation System**: Framer Motion for page transitions and interactive elements

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

## Important Development Guidelines

### Wedding Theme System
- **Primary Colors**: #1f576e (deep teal), #2b5a72 (blue-grey)
- **Accent Colors**: #E8B4B8 (soft pink), #C19A6C (warm gold), #A6B0A6 (sage green)
- **Glass Morphism**: `backdrop-filter: blur(10px) saturate(130%)` with transparent backgrounds
- **Typography**: Bernhard Tango (headings), Aparajita (body), Inter (UI elements)

### Component Development Patterns
1. **Navigation**: Use Next.js Link components for all internal routing
2. **Backgrounds**: Use BackgroundWrapper with appropriate `isHomePage` prop
3. **Layout**: Follow `Box position="relative" minH="100vh" display="flex" justifyContent="center"` pattern
4. **Containers**: Use `Container maxW="7xl" py={{ base: "28", md: "40" }} centerContent`
5. **Animations**: Implement Framer Motion with staggered entrance effects

### Page Structure Requirements  
```tsx
// Standard page structure
export default function PageName() {
  return (
    <BackgroundWrapper isHomePage={false}>
      <Navigation />
      <Box position="relative" minH="100vh" display="flex" justifyContent="center">
        <Container maxW="7xl" py={{ base: "28", md: "40" }} px={{ base: "4", md: "6", lg: "8" }} centerContent>
          {/* Page content */}
        </Container>
      </Box>
    </BackgroundWrapper>
  );
}
```

### Data Management
- **Wedding Events**: Import from `@/data/wedding-events.ts`
- **Constants**: Import from `@/constants/wedding.ts`  
- **Types**: Define interfaces in `@/types/` directory
- **Theme Tokens**: Access via Chakra UI theme system

### Performance Optimizations
- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Use Next.js Image component for all images
- **Font Loading**: Custom fonts optimized with Next.js font system
- **Bundle Analysis**: Individual page bundles under 10kB each

## Migration Lessons Learned

### Successful Strategies
1. **Incremental Migration**: Extracted components systematically before page migration
2. **Functionality Testing**: Maintained 100% feature parity throughout process
3. **Data Extraction**: Centralized all wedding data before component migration
4. **Build Validation**: Tested builds at each migration step
5. **Structure Consistency**: Standardized layout patterns across all pages

### Technical Challenges Overcome
1. **Google Maps Integration**: Maintained embedded maps with actual venue coordinates
2. **Interactive Timeline**: Preserved complex modal system with drag gestures
3. **Pinterest Integration**: Updated all mood board links including new Haldi board
4. **Background Images**: Dynamic background system based on page type
5. **Build Errors**: Resolved syntax errors and import issues during migration

### Future Maintenance Guidelines
1. **Add New Pages**: Follow established page structure pattern
2. **Update Content**: Modify centralized data files rather than inline content
3. **Theme Changes**: Update theme system tokens for consistent application
4. **Component Updates**: Maintain shared component interfaces for compatibility
5. **Performance Monitoring**: Monitor bundle sizes when adding new features

## Wedding-Specific Features

### Interactive Timeline (`/wedding-invite`)
- 4-day wedding schedule (January 14-17, 2026)
- 17 total events with detailed descriptions and locations
- Modal system with drag-to-dismiss functionality
- Real-time "current/next event" tracking
- Event icons with custom wedding imagery

### Google Maps Integration (`/logistics`)
- Embedded Google Maps with Oleander Farms coordinates (18.9148367, 73.2966273)
- Direct link to Google Maps for navigation
- Venue address: Karjat Chowk Road, Wavarle Village, Khalapur, Karjat 410201

### Pinterest Mood Boards (`/dress-code`)
- Updated Haldi ceremony board: https://es.pinterest.com/shivaniwedssaurav/haldi/
- Wedding Pheras board: https://pin.it/4x34dvlVF
- Sangeet board: https://pin.it/4Jn7azbCs
- Mehendi & Welcome board: https://pin.it/3fmALZdZj

### Venue Information (`/oleander`)
- Complete activities guide: pool, padel court, fitness center, gaming
- Dining experiences: 6 restaurants and bars with descriptions
- Wellness services: spa, yoga, meditation, workshops
- Unique attractions: nursery, vintage cars, photography spots

### Mumbai Travel Guide (`/travel-tips`)
- Personal restaurant recommendations from Shivani & Saurav
- Hotel suggestions with contact information
- Shopping and landmark guides
- Practical travel and transportation tips

## Research Pattern for Complex Issues

When encountering complex technical problems:

1. **Use Task Tool**: For large migrations or complex component extractions
2. **Systematic Approach**: Break large problems into smaller, manageable tasks  
3. **Build Validation**: Test builds frequently during refactoring
4. **Functionality Preservation**: Always maintain existing features during changes
5. **Documentation**: Update this file when making architectural changes

This refactoring transformed a 6,265-line monolithic application into a maintainable, modular, SEO-optimized wedding website while preserving 100% of the original functionality and enhancing the user experience with proper URL routing.