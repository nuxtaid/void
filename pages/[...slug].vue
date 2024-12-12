<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())
</script>

<template>
  <div class="container mx-auto max-w-7xl w-full px-4 py-8">
    <template v-if="page">
      <ContentRenderer
        v-if="page.body.value?.length"
        :value="page"
      />
      <div v-else>
        <!-- no content, the page's empty -->
         <h1 class="text-4xl font-bold">{{ page.title }}</h1>
         <p>Page is empty</p>
      </div>
    </template>
    <div v-else class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 class="text-4xl font-bold">404</h1>
      <p>Page not found</p>
    </div>
  </div>
</template>
