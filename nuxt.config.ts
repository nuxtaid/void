import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({

  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
  ],

  components: {
    dirs: [
      {
        prefix: 'V',
        path: resolve('./components'),
      },
    ],
  },

  devtools: {
    enabled: false,
  },

  colorMode: {
    hid: 'color-mode-script',
    globalName: '__COLOR_MODE__',
    storageKey: 'color-mode',
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },

  tailwindcss: {
    viewer: false,
  },
})
