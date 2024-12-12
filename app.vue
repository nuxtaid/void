<template>
  <Body class="dark:bg-[#161616] dark:text-white">
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
</style>
