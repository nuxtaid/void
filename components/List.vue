<script setup lang="ts">
const props = defineProps<{
  fetch: string
  reverse?: boolean
}>()

const { data, error } = await useAsyncData(`navigation:${props.fetch}`, () => {
  return queryCollectionNavigation(props.fetch as any, ['meta'])
}, {
  transform: (data) => {
    if (props.reverse) {
      data[0].children.reverse()
    }
    return data
  },
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
      class="group flex gap-4 items-center text-start"
    >
      <p class="w-24 flex-shrink-0 text-left">
        {{ item.meta.date }}
      </p>
      <NuxtLink
        :to="item.path"
        class="no-underline hover:underline flex-grow line-clamp-1"
      >
        {{ item.title }}
      </NuxtLink>
      <div class="text-right flex gap-4">
        <div
          v-for="tag of item.meta.tags"
          :key="tag"
          class="grayscale group-hover:grayscale-0 hover:scale-125 transition-transform duration-300"
        >
          <Icon
            class="block w-5"
            :name="tag"
          />
        </div>
      </div>
    </li>
  </ul>
</template>
