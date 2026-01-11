/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xs': '390px',
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '798px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1040px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        '3xl':'1800px'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),

  ],
};
