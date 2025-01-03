<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  description: string
  bg?: string
  icon?: string
  glow?: boolean
}>(), {
  bg: 'linear-gradient(to bottom left, #1A1A1A, #131313)',
  glow: true,
})

function textGlow(color: string) {
  return props.glow && `text-shadow: 0 0 10px ${color};`
}
</script>

<template>
  <div
    class="h-full text-white"
    :style="{ backgroundImage: bg }"
  >
    <div class="relative h-10 flex justify-center items-center bg-neutral-800">
      <div class="absolute left-4 top-3.5 flex flex-row gap-2">
        <div class="w-3 h-3 rounded-full bg-red-500" />
        <div class="w-3 h-3 rounded-full bg-yellow-500" />
        <div class="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div
        class="sm font-medium"
        :style="textGlow('#fff')"
      >
        pi@arashsheyda.me
      </div>
      <div class="absolute right-4 top-2 flex flex-row gap-2">
        <!-- icon ? -->
      </div>
    </div>
    <div class="p-4 flex flex-row text-2xl">
      <!-- for some reason right arrow is not showing so we have to add some dark magic -->
      <span
        class="mr-2 text-green-500"
        style="transform: rotate(-90deg);"
        :style="textGlow('#22c55d')"
      >
        ↓
      </span>
      <span
        class="text-cyan-400 mx-2"
        :style="textGlow('#00c7c7')"
      >
        ~
      </span>
      <p class="absolute top-0 right-4 text-sm">
        <span
          class="text-yellow-500 mr-4"
          :style="textGlow('#EBB305')"
        >
          pi@arashsheyda.me
        </span>
        <span
          class="text-green-500"
          :style="textGlow('#22c55d')"
        >
          {{ new Date().toLocaleTimeString() }}
        </span>
      </p>
    </div>
    <div class="px-20  flex flex-col items-center text-center justify-items-center">
      <h1
        class="text-6xl text-green-500"
        :style="textGlow('#22c55d')"
      >
        “{{ title }}”
      </h1>
      <div
        class="text-2xl"
        :style="textGlow('#fff')"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
