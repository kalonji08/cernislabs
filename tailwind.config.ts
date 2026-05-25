import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-inter)',          'system-ui', 'sans-serif'],
        heading: ['var(--font-jakarta)',         'system-ui', 'sans-serif'],
        mono:    ['var(--font-dm-mono)',         'monospace'],
      },
      colors: {
        /* ── CernisLabs brand palette ── */
        brand: {
          DEFAULT:   '#191C1F', // accent / text-primary
          secondary: '#505A63', // links / secondary text
          muted:     '#8D969E', // primary / muted labels
          light:     '#F4F4F4', // light surface
          border:    '#E8EAEC', // subtle borders
        },
      },
      borderRadius: { '2xl': '20px' },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
