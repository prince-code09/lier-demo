/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // LIER Warm Editorial Luxury Color Palette
        ivory: '#F5F0E9',       // Primary Background 1: Warm Ivory
        cream: '#FAF7F2',       // Primary Background 2: Soft Cream
        porcelain: '#FFFFFF',   // Primary Background 3: Porcelain White
        sand: {
          light: '#F5EFE8',
          DEFAULT: '#EAE1D8',   // Secondary Background 1: Pale Beige
          warm: '#DED0C5',      // Secondary Background 2: Warm Sand
          dark: '#C8B8AB',
        },
        beige: '#EAE1D8',
        espresso: {
          DEFAULT: '#211A1B',   // Primary Text: Deep Espresso
          deep: '#211A1B',
          rich: '#302526',      // Primary Text 2: Rich Charcoal
          muted: '#524345',
        },
        charcoal: {
          DEFAULT: '#302526',   // Rich Charcoal
          muted: '#6C5D5E',     // Muted body text with strong WCAG AA contrast (>4.8:1)
          light: '#8C7D7E',
        },
        burgundy: {
          DEFAULT: '#572634',   // Accent 1: Deep Burgundy
          deep: '#572634',
          wine: '#713B4A',      // Accent 2: Muted Wine
          rose: '#B88B91',      // Accent 3: Dusty Rose
          hover: '#441C28',
          subtle: '#F7EDEE',
        },
        champagne: {
          DEFAULT: '#B89550',   // Accent 4: Champagne Gold
          light: '#D4AF37',
          warm: '#C59E27',
          muted: '#A4823F',
          soft: '#F5EFE3',
        },
        taupe: {
          DEFAULT: '#D9CEC5',   // Border 1: Soft Taupe
          soft: '#D9CEC5',
          blush: '#E7D8D5',     // Border 2: Muted Blush
          subtle: '#EFE7E0',
          dark: '#BDB0A5',
        },
        blush: '#E7D8D5',

        // Graceful mappings for legacy color classes to warm editorial tones
        obsidian: {
          950: '#F5F0E9', // Warm Ivory (replaces dark page canvas)
          900: '#FAF7F2', // Soft Cream (replaces dark card surface)
          850: '#FFFFFF', // Porcelain White (elevated cards/drawers)
          800: '#EAE1D8', // Pale Beige
          700: '#DED0C5', // Warm Sand
          600: '#D9CEC5', // Soft Taupe
        },
        gold: {
          50: '#FAF7F2',
          100: '#F5F0E9',
          200: '#EAE1D8',
          300: '#CBB27E',
          400: '#B89550', // Champagne Gold
          500: '#A4823F',
          600: '#713B4A', // Muted Wine
          700: '#572634', // Deep Burgundy
        },
        alabaster: '#211A1B', // Primary Text now maps to Deep Espresso

        // Fragrance specific accents
        alpine: {
          light: '#E6F4FA',
          DEFAULT: '#2B6E8A',
          dark: '#1C4A5E',
          deep: '#0F2C38',
        },
        musk: {
          light: '#F8EFE4',
          DEFAULT: '#A66B38',
          dark: '#7D4E24',
          deep: '#543214',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em',
      },
      boxShadow: {
        'luxury': '0 12px 32px -10px rgba(33, 26, 27, 0.08), 0 0 1px 1px rgba(217, 206, 197, 0.5)',
        'luxury-hover': '0 20px 40px -12px rgba(87, 38, 52, 0.14), 0 0 25px -4px rgba(184, 149, 80, 0.18)',
        'gold-glow': '0 0 20px rgba(184, 149, 80, 0.3)',
        'burgundy-glow': '0 0 20px rgba(87, 38, 52, 0.25)',
        'champagne-glow': '0 0 20px rgba(184, 149, 80, 0.3)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B89550 0%, #D4AF37 50%, #8A6A2C 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #572634 0%, #713B4A 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #FAF7F2 0%, #B89550 50%, #8A6A2C 100%)',
        'warm-gradient': 'linear-gradient(180deg, #FAF7F2 0%, #F5F0E9 100%)',
        'obsidian-gradient': 'linear-gradient(180deg, #FAF7F2 0%, #F5F0E9 100%)',
      }
    },
  },
  plugins: [],
}
