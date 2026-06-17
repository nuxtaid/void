<script setup lang="ts">
const route = useRoute()
const config = useVoid()
const { data: page } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())

const { title, description } = page.value || {}
const metaHead = page.value?.meta.head?.meta || {}
useSeoMeta({
  title: metaHead.title || title,
  description: metaHead.description || description,
  ogTitle: metaHead.ogTitle || metaHead.title || title,
  ogDescription: metaHead.ogDescription || metaHead.description || description,
  twitterTitle: metaHead.twitterTitle || metaHead.title || title,
  twitterDescription: metaHead.twitterDescription || metaHead.description || description,
})

defineOgImage({
  component: 'OgImageTerminal',
})
</script>

<template>
  <div class="container mx-auto max-w-7xl w-full">
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
            aria-hidden="true"
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
          :alt="page.title || 'Page illustration'"
          class="rounded-lg aspect-video max-w-6xl"
        >
      </div>
      <ContentRenderer
        v-if="page.body.value?.length"
        :value="page"
        class="p-4"
      />
      <div v-else>
        <p>{{ config.emptyPage?.message || 'Page is empty' }}</p>
      </div>
    </template>
    <div
      v-else
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
    >
      <h1 class="text-4xl font-bold">
        {{ config.notFound?.title || '404' }}
      </h1>
      <p>{{ config.notFound?.message || 'Page not found' }}</p>
    </div>
  </div>
</template>
