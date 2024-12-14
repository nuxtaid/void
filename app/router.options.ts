import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  async routes(_routes) {
    const { data: contentPages } = await useAsyncData('content:pages', () => queryCollection('content').all())

    // Filter out routes that are already in the content because we want to be able to override them from content
    const filtered = _routes.filter((route) => {
      return !contentPages.value?.some((mdPage) => {
        return route.path === mdPage.path
      })
    })
    return filtered
  },
}
