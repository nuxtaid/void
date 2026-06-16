<script setup lang="ts">
defineProps<{
  title?: string
  icon?: string
  padding?: string
}>()
</script>

<template>
  <div
    :class="{ 'md:p-4': padding !== 'false' }"
  >
    <h2
      v-if="title"
      class="flex items-center gap-2 text-2xl mb-4"
    >
      <Icon
        v-if="icon"
        :name="icon"
        aria-hidden="true"
      />
      {{ title }}
    </h2>
    <slot />
  </div>
</template>
