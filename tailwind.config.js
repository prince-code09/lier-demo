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
        obsidian: {
          950: '#060608',
          900: '#0A0A0C',
          850: '#0F0F14',
          800: '#14141B',
          700: '#1C1C26',
          600: '#262633',
        },
        gold: {
          50: '#FCF9F2',
          100: '#F6EEDC',
          200: '#EBD8B3',
          300: '#DEC28A',
          400: '#D4AF37',
          500: '#C59E27',
          600: '#A37E19',
          700: '#7E5F11',
        },
        alpine: {
          light: '#E0F2FE',
          DEFAULT: '#0284C7',
          dark: '#0369A1',
          deep: '#0C4A6E',
        },
        musk: {
          light: '#FEF3C7',
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          deep: '#78350F',
        },
        alabaster: '#F9F8F6',
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
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(212, 175, 55, 0.1)',
        'luxury-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 35px 0px rgba(212, 175, 55, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F6EEDC 0%, #D4AF37 50%, #A37E19 100%)',
        'obsidian-gradient': 'linear-gradient(180deg, #14141B 0%, #0A0A0C 100%)',
      }
    },
  },
  plugins: [],
}
