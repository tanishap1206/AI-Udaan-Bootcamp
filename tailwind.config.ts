import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(15, 23, 42, 0.45)',
          lighter: 'rgba(30, 41, 59, 0.58)',
          medium: 'rgba(15, 23, 42, 0.6)',
        },
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        accent: {
          purple: '#c084fc',
          pink: '#f472b6',
          violet: '#8b5cf6',
          cyan: '#22d3ee',
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        'glass-sm': '0 8px 30px rgba(2, 6, 23, 0.35)',
        'glass-md': '0 12px 40px rgba(2, 6, 23, 0.42)',
        'glass-lg': '0 18px 60px rgba(2, 6, 23, 0.5)',
        glow: '0 0 26px rgba(34, 211, 238, 0.45)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.45)',
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(10, 200, 230, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(10, 200, 230, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
export default config