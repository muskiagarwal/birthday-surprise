/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F8C8DC',
        hotpink: '#FF6FA5',
        cream: '#FFF7F2',
        softred: '#E14B6A',
      },
      fontFamily: {
        // Loaded from Google Fonts in index.html
        script: ['"Caveat"', 'cursive'],
        hand: ['"Gloria Hallelujah"', 'cursive'],
        body: ['"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(225, 75, 106, 0.35)',
        pill: '0 6px 16px -4px rgba(255, 111, 165, 0.6)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
          '50%': { transform: 'scale(0.92) translateY(-1px)', opacity: '0.85' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        flicker: 'flicker 0.5s ease-in-out infinite',
        floaty: 'floaty 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
