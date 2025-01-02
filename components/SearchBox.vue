<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const route = useRoute()

const searchBox = ref(false)

const isMetaPressed = ref(false)

useEventListener(window, 'keydown', (event) => {
  if (event.key === 'Meta') {
    isMetaPressed.value = true
  }

  if (isMetaPressed.value && event.key === 'k') {
    searchBox.value = !searchBox.value
  }

  if (event.key === 'Escape') {
    searchBox.value = false
  }
})

useEventListener(window, 'keyup', (event) => {
  if (event.key === 'Meta') {
    isMetaPressed.value = false
  }
})

watch(() => route.fullPath, () => {
  searchBox.value = false
})
</script>

<template>
  <Transition name="fade">
    <div
      v-show="searchBox"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur"
    >
      <div class="flex justify-center items-center h-full">
        <Terminal
          class="max-w-2xl w-full"
          @close="searchBox = false"
        />
      </div>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
