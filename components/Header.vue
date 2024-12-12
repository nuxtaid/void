<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation:header', () => queryCollectionNavigation('content', ['meta']), {
  transform: (data) => data.filter((item) => !item.meta.footer),
})

const typewriter = [
  'cmd + k',
  'hi@arash.is',
]
</script>

<template>
  <header
    class="sticky top-0 z-10 backdrop-blur transition-all duration-300 border-b border-neutral-400/10"
    :class="[
    ]"
  >
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between transition-all text-[#818181]"
      :class="y > 3 ? 'p-6 lg:px-8' : 'p-4'"
    >
      <div class="flex lg:flex-1">
        <NuxtLink
          to="/"
          class="flex items-center gap-1 -m-1.5 p-1.5"
        >
          <span class="text-xs text-green-500 mr-2">
            ➜
          </span>
          <span class="text-[#00c7c7] mr-1">
            ~ {{ route.path !== '/' ? `${route.path.replace('/', '')}` : '' }}
          </span>
          <VTypewriter
            v-show="route.path === '/'"
            :texts="typewriter"
          />
        </NuxtLink>
      </div>
      <div class="flex gap-x-12">
        <NuxtLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="text-sm font-semibold leading-6"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
