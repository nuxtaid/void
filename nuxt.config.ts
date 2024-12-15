import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({

  modules: [
    '@nuxt/icon',
    '@nuxtjs/seo',
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

  experimental: {
    componentIslands: true,
  },

  // @nuxtjs/seo modules
  linkChecker: {
    enabled: false,
  },
  ogImage: {
    enabled: true,
    strictNuxtContentPaths: true,
    fonts: [
      // monospace
      'Space+Mono:400',
    ],
  },
  robots: {
    enabled: false,
  },
  schemaOrg: {
    enabled: true,
  },
  seo: {
    enabled: true,
  },
  sitemap: {
    enabled: false,
  },

  tailwindcss: {
    viewer: false,
  },
})
