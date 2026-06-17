<script setup lang="ts">
const { open } = useVHeader()

const config = useVoid()

useHead({
  title: config.title.replace(/<\/?[^>]+(>|$)/g, ''),
  titleTemplate: `%s - ${config.name}`,
  bodyAttrs: {
    class: 'dark:text-white dotted',
  },
})
</script>

<template>
  <div>
    <NuxtLink
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-cyan-600 focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none"
    >
      Skip to main content
    </NuxtLink>
    <VHeader />
    <VSearchBox />
    <div id="portal" />
    <div
      id="main-content"
      role="main"
      class="mb-8 px-4 py-8"
    >
      <slot />
    </div>
    <VFooter />
  </div>
</template>

<style>
body {
  font-family: 'Outfit';
}

h1 {
  @apply text-4xl font-light;
}

h2 {
  @apply text-2xl font-light;
}

h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {
  @apply no-underline;
}

h3 {
  @apply text-xl font-light;
}

p {
  @apply font-thin text-[#999];
}

a {
  @apply underline hover:decoration-cyan-500 hover:text-cyan-500;
}

.dotted {
  --dot-size: 1.3px;

  background: linear-gradient(90deg, #00c7c7 1px, transparent 0) center,
    linear-gradient(#00c7c7 1px, transparent 0) center, var(--dot-bg);
  background-image: radial-gradient(var(--dot-color) var(--dot-size), transparent 0);
  background-size: 40px 40px;
}

:root {
  --dot-bg: #F0EFEE;
  --dot-color: #3C3C3C30;
}
.dark .dotted {
  --dot-color: #262626a0;
  --dot-bg: #161616;
}

hr {
  @apply my-4 border-t border-neutral-400/40;
}

*:focus-visible {
  outline: 2px solid #00c7c7;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
