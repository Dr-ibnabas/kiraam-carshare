/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6AB2E7',
          50: '#EBF5FC',
          100: '#D7EAF9',
          200: '#AFD6F3',
          300: '#87C1ED',
          400: '#6AB2E7',
          500: '#3F98DE',
          600: '#2278BD',
          700: '#1A5C90',
          800: '#124163',
          900: '#0A2536',
        },
        secondary: {
          DEFAULT: '#12AD2B',
          50: '#E7FAEB',
          100: '#C5F2CD',
          200: '#8EE59E',
          300: '#56D86F',
          400: '#1FC940',
          500: '#12AD2B',
          600: '#0E8A22',
          700: '#0A671A',
          800: '#074511',
          900: '#032208',
        },
        accent: {
          DEFAULT: '#D7141A',
          50: '#FBE7E8',
          100: '#F7CFD1',
          200: '#EF9FA3',
          300: '#E76F75',
          400: '#DF3F47',
          500: '#D7141A',
          600: '#AB1015',
          700: '#810C10',
          800: '#56080B',
          900: '#2B0405',
        },
        gold: {
          DEFAULT: '#F5A623',
          light: '#FFD080',
          dark: '#C47F00',
        },
        background: {
          light: '#FFFFFF',
          lightAlt: '#F8FAFC',
          dark: '#0A0E1A',
          darkAlt: '#141B2D',
        },
        textPrimary: {
          light: '#0F172A',
          dark: '#F1F5F9',
        },
        textSecondary: {
          light: '#64748B',
          dark: '#94A3B8',
        },
        border: {
          light: '#E2E8F0',
          dark: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
      },
    },
  },
  plugins: [],
};
