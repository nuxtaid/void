<script setup lang="ts">
const props = defineProps<{
  fetch: string
}>()

const { data, error } = await useAsyncData(`navigation:${props.fetch}`, () => {
  return queryCollectionNavigation(props.fetch as any, ['meta'])
})
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <ul
    v-else-if="data?.length"
    class="flex flex-col gap-4 mt-8"
  >
    <li
      v-for="item of data[0].children"
      :key="item.path"
      class="flex gap-4"
    >
      <p class="min-w-20">
        {{ item.meta.date }}
      </p>
      <NuxtLink
        :to="item.path"
        class="no-underline hover:underline"
      >
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
