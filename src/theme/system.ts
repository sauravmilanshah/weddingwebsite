import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Wedding color palette - elegant and romantic
        wedding: {
          primary: { value: "#E8B4B8" }, // Soft pink
          secondary: { value: "#C19A6C" }, // Warm gold
          accent: { value: "#A6B0A6" }, // Sage green
          neutral: { value: "#F5F5F0" }, // Cream white
          dark: { value: "#2D2D2D" }, // Charcoal
          glass: { value: "rgba(255, 255, 255, 0.9)" },
          glassHover: { value: "rgba(255, 255, 255, 0.95)" },
        },
        // Gradient tokens for beautiful backgrounds
        gradient: {
          primary: { value: "linear-gradient(135deg, #E8B4B8 0%, #C19A6C 100%)" },
          secondary: { value: "linear-gradient(135deg, #A6B0A6 0%, #F5F5F0 100%)" },
          glass: { value: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)" },
        }
      },
      fonts: {
        heading: { value: "var(--font-inter), system-ui, sans-serif" },
        body: { value: "var(--font-inter), system-ui, sans-serif" },
      },
      shadows: {
        glass: { value: "0 8px 32px rgba(0, 0, 0, 0.1)" },
        glassHover: { value: "0 20px 40px -5px rgba(0, 0, 0, 0.15)" },
        elegant: { value: "0 4px 20px rgba(0, 0, 0, 0.08)" },
      }
    },
    semanticTokens: {
      colors: {
        // Semantic color assignments
        bg: {
          DEFAULT: { value: "{colors.wedding.neutral}" },
          glass: { value: "{colors.wedding.glass}" },
          glassHover: { value: "{colors.wedding.glassHover}" },
        },
        text: {
          primary: { value: "{colors.wedding.dark}" },
          secondary: { value: "{colors.gray.600}" },
          muted: { value: "{colors.gray.500}" },
        },
        border: {
          glass: { value: "rgba(255, 255, 255, 0.2)" },
          elegant: { value: "rgba(0, 0, 0, 0.1)" },
        }
      }
    }
  },
  globalCss: {
    "html": {
      scrollBehavior: "smooth",
    },
    "body": {
      bg: "bg",
      color: "text.primary",
      fontFamily: "body",
      lineHeight: "1.6",
      letterSpacing: "-0.011em",
    },
    // Glass morphism utility classes
    ".glass-card": {
      background: "bg.glass",
      backdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid {colors.border.glass}",
      borderRadius: "xl",
      boxShadow: "glass",
      transition: "all 0.3s ease",
      _hover: {
        background: "bg.glassHover",
        boxShadow: "glassHover",
        transform: "translateY(-2px)",
      }
    }
  }
})

export const system = createSystem(defaultConfig, customConfig)