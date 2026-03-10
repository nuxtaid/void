<script lang="ts" setup>
const { socials } = useVoid()
</script>

<template>
  <div class="flex items-center gap-6">
    <NuxtLink
      v-for="item in Array.isArray(socials) ? socials : socials.items"
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
        :style="{ '--void-social-hover': item.color }"
      />
    </NuxtLink>
  </div>
</template>

<style>
.social-item:hover span {
  /* color: var(--void-social-hover); */
  color: var(--void-social-hover);
  /* filter: drop-shadow(0 0 0.75rem var(--void-social-hover)); */
}
</style>
