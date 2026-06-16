<script setup lang="ts">
const config = useVoid()
const copyright = computed(() => config.copyright || {})
</script>

<template>
  {{ copyright.text || 'void by' }}
  <NuxtLink
    :to="copyright.url || 'https://github.com/nuxtaid'"
    target="_blank"
  >
    {{ copyright.author || 'NuxtAid' }}
  </NuxtLink>
</template>
