import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        accent: '#4F46E5',
        muted: '#6B7280'
      }
    }
  },
  plugins: []
};

export default config;
