/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0ede8',
        lily: '#f7f4ef',
        cream: '#ede8df',
        champagne: '#c9a96e',
        gold: '#a07840',
        milkbrown: '#7d5a3c',
        darkbrown: '#4a2c0a',
        sage: '#8a9e7a',
        warmgray: '#ddd9d2',
      },
      fontFamily: {
        greatvibes: ['Great Vibes', 'cursive'],
        cormorant: ['Cormorant Garamond', 'serif'],
        allura: ['Allura', 'cursive'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        phone: '0 30px 80px rgba(0,0,0,0.25), 0 10px 30px rgba(0,0,0,0.15)',
        card: '0 4px 30px rgba(160, 120, 64, 0.12)',
        soft: '0 2px 15px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        arch: '100px 100px 40px 40px',
        oval: '120px',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-medium': 'spin 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'marquee-circle': 'spin 12s linear infinite',
        'pulse-soft': 'pulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
