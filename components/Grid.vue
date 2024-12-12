<script setup lang="ts">
const props = defineProps<{
  items: any[]
  reverse?: boolean
}>()

const filtered = computed(() => props.reverse ? props.items.slice().reverse() : props.items)
</script>

<template>
  <section class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
    <VCard
      v-for="item in filtered"
      :key="item.id"
      v-bind="item"
    />
    <slot />
  </section>
</template>
