<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())
</script>

<template>
  <div class="container mx-auto mt-20">
    <ContentRenderer v-if="page?.body.value?.length" :value="page" />
  </div>
</template>
