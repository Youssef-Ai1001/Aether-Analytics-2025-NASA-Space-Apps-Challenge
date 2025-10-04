export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        background: {
          dark: "#0B1D2A",
          darker: "#071520", 
          light: "#112A3E"
        },
        neon: {
          cyan: "#00E6FF",
          green: "#14FF9E"
        },
        alert: {
          yellow: "#FFC300",
          orange: "#FF5733",
          red: "#C70039"
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0BEC5"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00E6FF, 0 0 20px rgba(0, 230, 255, 0.3)',
        'neon-green': '0 0 5px #14FF9E, 0 0 20px rgba(20, 255, 158, 0.3)',
        'neon-glow': '0 0 10px rgba(0, 230, 255, 0.5), 0 0 30px rgba(0, 230, 255, 0.3)'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 230, 255, 0.5), 0 0 20px rgba(0, 230, 255, 0.3)' },
          '50%': { boxShadow: '0 0 8px rgba(0, 230, 255, 0.8), 0 0 30px rgba(0, 230, 255, 0.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(circle at center, #112A3E 0%, #0B1D2A 50%, #071520 100%)',
        'neon-gradient': 'linear-gradient(90deg, #00E6FF 0%, #14FF9E 100%)',
      }
    },
  },
  plugins: [],
}