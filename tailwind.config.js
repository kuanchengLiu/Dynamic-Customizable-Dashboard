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
        cyber: {
          black: '#0a0a0f',
          dark: '#12121a',
          purple: '#9d4edd',
          pink: '#ff006e',
          cyan: '#00f5ff',
          blue: '#3b82f6',
          green: '#00ff9f',
          yellow: '#ffd60a',
          orange: '#ff6b35',
          red: '#ff0055',
        }
      },
      boxShadow: {
        'cyber-sm': '0 0 10px rgba(0, 245, 255, 0.3)',
        'cyber': '0 0 20px rgba(0, 245, 255, 0.4)',
        'cyber-lg': '0 0 40px rgba(0, 245, 255, 0.5)',
        'cyber-pink': '0 0 20px rgba(255, 0, 110, 0.5)',
        'cyber-purple': '0 0 20px rgba(157, 78, 221, 0.5)',
        'cyber-green': '0 0 20px rgba(0, 255, 159, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.5', filter: 'brightness(1)' },
          '100%': { opacity: '1', filter: 'brightness(1.2)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
