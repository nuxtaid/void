<script lang="ts" setup>
const config = useVoid()
</script>

<template>
  <div class="flex items-center gap-4">
    <NuxtLink
      v-for="item in config.socials"
      :key="item.url"
      class="social-item"
      :to="item.url"
      :rel="item?.target === '_blank' ? 'noopener noreferrer' : ''"
      :target="item.target"
      :title="item.title"
    >
      <Icon
        :name="item.icon"
        :class="item.title"
        transition-all
        :style="{ '--void-social-hover': item.color }"
      />
    </NuxtLink>
  </div>
</template>

<style>
.social-item:hover svg {
  color: var(--void-social-hover);
  filter: drop-shadow(0 0 0.75rem var(--void-social-hover));
}
</style>
