<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const config = useVoid()

const route = useRoute()

const { open, toggle } = useVHeader()

const { data: navigation } = await useAsyncData('navigation:header', () => queryCollectionNavigation('content', ['meta']), {
  transform: data => data.filter(item => !item.meta.footer),
})

const typewriter = computed(() => {
  const items = []
  if (config.email) items.push(config.email)
  items.unshift(config.terminal?.searchHint || 'cmd + k')
  return items
})
</script>

<template>
  <header
    class="sticky top-0 z-10 backdrop-blur transition-all duration-300 border-b border-neutral-400/10"
  >
    <nav
      aria-label="Main navigation"
      class="mx-auto flex max-w-7xl items-center justify-between transition-all text-[#818181]"
      :class="y > 3 ? 'p-6 lg:px-8' : 'p-4'"
    >
      <div class="flex lg:flex-1">
        <NuxtLink
          to="/"
          aria-label="Home"
          class="flex items-center gap-1 -m-1.5 p-1.5 no-underline"
        >
          <span class="text-xs text-green-500 mr-2">
            {{ config.terminal?.prompt || '➜' }}
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

      <!-- Mobile Menu Toggle Button -->
      <div class="md:hidden">
        <button
          :aria-expanded="open"
          aria-controls="mobile-menu"
          aria-label="Open menu"
          @click="toggle"
        >
          <Icon
            class="block w-6 h-6"
            aria-hidden="true"
            name="i-ph-list"
          />
        </button>
      </div>

      <div class="hidden md:flex gap-x-8">
        <NuxtLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="text-sm no-underline"
          :class="{ 'text-cyan-500': route.path.includes(item.path) }"
        >
          {{ item.title }}
        </NuxtLink>
        <VSocials v-if="config.socials?.header !== false" />
      </div>
    </nav>
  </header>

  <Transition name="menu-backdrop">
    <div
      v-if="open"
      class="fixed inset-0 z-20 bg-black/50 md:hidden"
      aria-hidden="true"
      @click="toggle"
    />
  </Transition>

  <aside
    id="mobile-menu"
    :aria-hidden="!open"
    role="dialog"
    aria-label="Mobile navigation menu"
    class="fixed top-0 right-0 w-64 h-full bg-[#1f1f1f] border-l border-[#333] z-30 transition-transform duration-300"
    :class="open ? 'translate-x-0' : 'translate-x-64'"
  >
    <div class="flex items-center justify-between p-4 border-b border-[#333]">
      <span class="text-sm text-[#818181]">Menu</span>
      <button
        aria-label="Close menu"
        @click="toggle"
      >
        <Icon
          class="block w-5 h-5"
          aria-hidden="true"
          name="i-ph-x"
        />
      </button>
    </div>
    <nav
      aria-label="Mobile navigation"
      class="flex flex-col p-4"
    >
      <NuxtLink
        v-for="item in navigation"
        :key="item.path"
        :to="item.path"
        class="text-lg py-2"
        @click="toggle"
      >
        {{ item.title }}
      </NuxtLink>
    </nav>
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-[#333]">
      <VSocials />
    </div>
  </aside>
</template>

<style>
.menu-backdrop-enter-active,
.menu-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.menu-backdrop-enter-from,
.menu-backdrop-leave-to {
  opacity: 0;
}
</style>
