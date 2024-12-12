export default defineNuxtConfig({

  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
  ],

  devtools: {
    enabled: true,
  },

  colorMode: {
    hid: 'color-mode-script',
    globalName: '__COLOR_MODE__',
    storageKey: 'color-mode',
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },
})
