import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#3B82F6',
        },
        secondary: {
          DEFAULT: '#64748B',
          dark: '#475569',
          light: '#94A3B8',
        },
        accent: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          light: '#FB923C',
        },
        success: '#22C55E',
        warning: '#EAB308',
        danger: '#EF4444',
        surface: {
          light: '#F8FAFC',
          dark: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
