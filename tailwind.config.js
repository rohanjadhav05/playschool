/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD600',
          dark: '#F5C200',
          light: '#FFF3B0',
        },
        secondary: {
          DEFAULT: '#2196F3',
          dark: '#1565C0',
          light: '#BBDEFB',
        },
        accent: {
          DEFAULT: '#4CAF50',
          dark: '#2E7D32',
          light: '#C8E6C9',
        },
        cta: {
          DEFAULT: '#FF6B35',
          dark: '#E55A25',
        },
        bg: '#FFFDF5',
        surface: '#FFFFFF',
        textPrimary: '#1A1A1A',
        textSecondary: '#555555',
        textMuted: '#888888',
        border: '#E8E8E8',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.14)',
        cta: '0 4px 14px rgba(255,107,53,0.35)',
      },
    },
  },
  plugins: [],
}
