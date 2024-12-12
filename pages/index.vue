<template>
  <!-- TODO: make this configurable through app.config -->
  <section class="flex flex-col justify-center text-center items-center gap-2 mt-40">
    <div class="group relative">
      <img
        class="rounded-full w-40 h-40 border-2 border-[#1A1A1A]"
        src="https://avatars.githubusercontent.com/u/38922203?v=4"
      >
      <div class="flex gap-1 items-center absolute bottom-2 left-28 bg-[#1A1A1A] px-2 text-sm py-1 rounded-full border border-neutral-400/10">
        <span class="mt-[2px]">🇨🇦</span>
        <span class="group-hover:block whitespace-nowrap hidden">
          Edmonton, AB
        </span>
      </div>
    </div>
    <span class="text-[#999]">
      Hi, I'm Arash 👋
    </span>
    <h1 class="text-4xl text-[#999] title-mask mt-4">
      a passionate <br> Software Engineer
    </h1>
    <p class="text-lg max-w-3xl text-[#999] font-light mt-4">
      who loves learning and crafting code to build cool things. 💻 When I'm not diving deep into the world of software development, I'm probably exploring the great outdoors 🌳
    </p>
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
