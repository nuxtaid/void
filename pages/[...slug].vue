<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())
</script>

<template>
  <div class="container mx-auto max-w-7xl w-full px-4 py-8">
    <template v-if="page">
      <div
        v-if="page.meta.heading !== false"
        class="mb-4"
      >
        <h1 class="flex items-center gap-2 text-4xl font-bold">
          {{ page.title }}
          <icon
            v-if="page.meta.icon"
            class="block"
            :name="page.meta.icon"
          />
        </h1>
      </div>
      <div
        v-if="page.meta.image"
        class="mb-4"
      >
        <img
          :src="page.meta.image"
          class="rounded-lg aspect-video max-w-6xl"
        >
      </div>
      <ContentRenderer
        v-if="page.body.value?.length"
        :value="page"
      />
      <div v-else>
        <p>Page is empty</p>
      </div>
    </template>
    <div
      v-else
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <h1 class="text-4xl font-bold">
        404
      </h1>
      <p>Page not found</p>
    </div>
  </div>
</template>
