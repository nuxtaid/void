import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  safelist: [
    {
      pattern: /^grid-cols-[0-9]+$/,
      variants: ['lg'],
    },
  ],
}
