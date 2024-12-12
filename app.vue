<template>
  <Body class="dark:text-white dotted">
    <main>
      <VHeader />
      <NuxtPage />
      <VFooter />
    </main>
  </Body>
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
</style>
