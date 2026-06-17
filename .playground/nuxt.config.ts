import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: ['..'],
  modules: ['@nuxt/eslint'],

  site: {
    name: 'Arash Sheyda',
  },

  runtimeConfig: {
    totp: {
      secret: process.env.TOTP_SECRET,
      qr: process.env.TOTP_QR,
    },
    public: {
      // you can remove environment variables, they'll be set automatically
      siteUrl: 'https://arashsheyda.me/',
      siteName: 'Arash Sheyda',
    },
  },

  compatibilityDate: '2024-12-11',

  nitro: {
    experimental: {
      websocket: true,
    },
  },

  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url)),
      stylistic: true,
    },
  },
})
