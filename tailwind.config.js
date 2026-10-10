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
        sbs: {
          dark: '#000033',       // Deep Space Blue
          light: '#FFFFFF',      // Blanco Puro
          ice: '#e1f0fa',        // Ice Blue Tint
          royal: '#0131a0',      // SBS Royal Blue
          teal: '#04c4b3',       // Turquesa Tech
          amber: '#ffb601',      // Naranja/Amarillo Y2K Recompensa
          muted: '#8e9aaf'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(4, 196, 179, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(255, 182, 1, 0.4)',
        'glow-royal': '0 0 25px -5px rgba(1, 49, 160, 0.4)',
      }
    },
  },
  plugins: [],
}
