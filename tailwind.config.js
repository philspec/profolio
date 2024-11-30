/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': {
            filter: 'brightness(100%)',
          },
          '50%': {
            filter: 'brightness(120%)',
          },
        },
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
