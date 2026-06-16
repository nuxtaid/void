<script setup lang="ts">
const props = withDefaults(defineProps<{
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
}>(), {
  typingSpeed: 100,
  deletingSpeed: 30,
  delayBetweenTexts: 1500,
})

const currentText = ref('')
const currentIndex = ref(0)
const isDeleting = ref(false)

const typeText = async () => {
  const fullText = props.texts[currentIndex.value]

  if (isDeleting.value) {
    currentText.value = fullText.substring(0, currentText.value.length - 1)

    if (currentText.value === '') {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
      await new Promise(resolve => setTimeout(resolve, props.delayBetweenTexts))
    }

    setTimeout(typeText, props.deletingSpeed)
  }
  else {
    currentText.value = fullText.substring(0, currentText.value.length + 1)

    if (currentText.value === fullText) {
      isDeleting.value = true
      await new Promise(resolve => setTimeout(resolve, props.delayBetweenTexts))
    }

    setTimeout(typeText, props.typingSpeed)
  }
}

onMounted(() => {
  if (props.texts.length > 0) {
    typeText()
  }
})
</script>

<template>
  <div
    class="typewriter"
    aria-live="polite"
    role="status"
  >
    <span class="typing-text">{{ currentText }}</span>
    <span
      class="animate-blink"
      aria-hidden="true"
    >|</span>
  </div>
</template>

<style scoped>
.typewriter {
  font-family: monospace;
}
</style>
