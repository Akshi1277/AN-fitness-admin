/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
          border: '#e5e7eb', // Tailwind gray-200
          input: '#e5e7eb',
          ring: '#6366f1', // Tailwind indigo-500
          background: '#ffffff',
          foreground: '#111827', // Tailwind gray-900
          primary: {
            DEFAULT: '#6366f1',
            foreground: '#ffffff',
          },
          secondary: {
            DEFAULT: '#f3f4f6', // Tailwind gray-100
            foreground: '#6366f1',
          },
          destructive: {
            DEFAULT: '#ef4444', // Tailwind red-500
            foreground: '#ffffff',
          },
          muted: {
            DEFAULT: '#f3f4f6',
            foreground: '#6b7280', // Tailwind gray-500
          },
          accent: {
            DEFAULT: '#f3f4f6',
            foreground: '#6366f1',
          },
          popover: {
            DEFAULT: '#ffffff',
            foreground: '#111827',
          },
          card: {
            DEFAULT: '#ffffff',
            foreground: '#111827',
          },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
