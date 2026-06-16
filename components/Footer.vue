<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation:footer', () => {
  return queryCollectionNavigation('content', ['meta'])
  // TODO: do something like this instead
  // .where('meta.footer', '=', true)
}, {
  transform: data => data.filter(item => item.meta.footer),
})
</script>

<template>
  <div class="fixed bottom-0 right-0 left-0 backdrop-blur border-t border-neutral-400/10">
    <footer class="mx-auto flex max-w-7xl w-full items-center justify-between transition-all text-[#818181] p-4">
      <div>
        <VCopyright />
      </div>
      <nav
        aria-label="Footer navigation"
        class="flex gap-8"
      >
        <NuxtLink
          v-for="item, index of navigation"
          :key="index"
          :to="item.path"
          class="no-underline"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>
    </footer>
  </div>
</template>
