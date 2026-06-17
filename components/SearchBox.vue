<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const route = useRoute()

const searchBox = ref(false)
const previousFocus = ref<HTMLElement | null>(null)

const isMetaPressed = ref(false)

useEventListener(window, 'keydown', (event) => {
  if (event.key === 'Meta') {
    isMetaPressed.value = true
  }

  if (isMetaPressed.value && event.key === 'k') {
    if (!searchBox.value) {
      previousFocus.value = document.activeElement as HTMLElement
    }
    searchBox.value = !searchBox.value
  }

  if (event.key === 'Escape') {
    closeSearchBox()
  }
})

useEventListener(window, 'keyup', (event) => {
  if (event.key === 'Meta') {
    isMetaPressed.value = false
  }
})

watch(() => route.fullPath, () => {
  closeSearchBox()
})

watch(searchBox, (val) => {
  if (val) {
    nextTick(() => {
      const input = document.getElementById('commandInput')
      input?.focus()
    })
  }
})

function closeSearchBox() {
  searchBox.value = false
  nextTick(() => {
    previousFocus.value?.focus()
  })
}
</script>

<template>
  <Transition name="fade">
    <div
      v-show="searchBox"
      role="dialog"
      aria-modal="true"
      aria-label="Search terminal"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur"
      @click.self="closeSearchBox"
    >
      <div class="flex justify-center items-center h-full">
        <Terminal
          class="max-w-2xl w-full"
          @close="closeSearchBox"
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
