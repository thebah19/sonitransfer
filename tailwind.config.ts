import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#2D549E',
        forest: '#0f6b49',
        gold: '#E67E33',
        cream: '#fff8ec',
        mint: '#e9f5ef',
        ember: '#d96b22',
        ink: '#10151f',
        sand: '#f5efe5',
        sky: '#dcecff'
      },
      boxShadow: {
        premium: '0 24px 70px rgba(45, 84, 158, 0.16)'
      }
    }
  },
  plugins: []
} satisfies Config;
