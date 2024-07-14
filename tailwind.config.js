module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          light: '#6366F1',
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
        },
        secondary: {
          light: '#10B981',
          DEFAULT: '#059669',
          dark: '#047857',
        },
        background: {
          light: '#F3F4F6',
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB',
        },
        text: {
          light: '#4B5563',
          DEFAULT: '#374151',
          dark: '#1F2937',
        },
        accent: {
          light: '#F59E0B',
          DEFAULT: '#D97706',
          dark: '#B45309',
        },
      },
    },
  },
  plugins: [],
}
