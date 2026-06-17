<script setup lang="ts">
import { NuxtLink } from '#components'

const props = withDefaults(defineProps<{
  title: string
  description: string
  color?: string
  frame?: string
  path?: string
  target?: string
}>(), {
  color: '',
})

const linkTarget = computed(() => props.path ? props.target || (props.path.startsWith('http') ? '_blank' : undefined) : undefined)
</script>

<template>
  <component
    :is="path ? NuxtLink : 'div'"
    :to="path"
    :target="linkTarget"
    :rel="linkTarget === '_blank' ? 'noopener noreferrer' : undefined"
    class="flex flex-col gap-4 justify-between border border-[#2A2A29] p-8 rounded bg-[#1A1A1A] h-96 transition-border duration-300 hover:border-[--void-card-border]"
    :class="{ 'no-underline': path }"
    :style="{
      '--void-card-border': color,
    }"
  >
    <div>
      <!-- TODO: replace this -->
      <slot name="image">
        <iframe
          v-if="frame"
          :src="frame"
          :title="title"
          loading="lazy"
          class="lg:w-[21rem] lg:h-[11.8rem] h-[15rem] w-full rounded-lg pointer-events-none"
        />
      </slot>
    </div>
    <div>
      <slot name="title">
        <h2>
          {{ title }}
        </h2>
      </slot>
      <slot name="description">
        <p>
          {{ description }}
        </p>
      </slot>
    </div>
  </component>
</template>
