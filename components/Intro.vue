<script setup lang="ts">
const props = defineProps<{
  avatar?: string
  title?: string
  description?: string
  greeting?: string
}>()

const config = useVoid()

const filteredTitle = computed(() => props.title || config.title)
const filteredAvatar = computed(() => props.avatar || config.avatar)
const filteredDescription = computed(() => props.description || config.description)
const filteredGreeting = computed(() => props.greeting || config.greeting)
</script>

<template>
  <!-- TODO: will finish up later -->
  <section class="flex flex-col justify-center text-center items-center gap-2 lg:mt-40 mt-20 max-w-3xl mx-auto">
    <div class="group relative">
      <img
        class="rounded-full w-40 h-40 object-cover border-2 border-[#1A1A1A]"
        :src="filteredAvatar"
      >
      <div
        v-if="config.location"
        class="flex gap-1 items-center absolute bottom-1 left-28 bg-[#1A1A1A] px-2 text-sm py-1 rounded-full border border-neutral-400/10"
      >
        <span class="mt-[2px]">{{ config.location.flag }}</span>
        <span class="group-hover:block whitespace-nowrap hidden">
          {{ config.location.city }}
        </span>
      </div>
    </div>
    <span v-if="filteredGreeting" class="text-[#999]">
      {{ filteredGreeting }}
    </span>
    <h1
      class="text-4xl text-[#999] title-mask mt-4"
      v-html="filteredTitle"
    />
    <p
      class="text-lg mt-4 px-8"
      v-html="filteredDescription"
    />
  </section>
</template>

<style>
.title-mask {
  background: linear-gradient(90deg, #fff, #747474);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
