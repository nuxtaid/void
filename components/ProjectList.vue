<script setup lang="ts">
interface Project {
  name: string
  description?: string
  url?: string
  icon?: string
}

interface Category {
  title: string
  projects: Project[]
}

defineProps<{
  categories: Category[]
}>()
</script>

<template>
  <div class="flex flex-col gap-12 mt-8">
    <section
      v-for="category in categories"
      :key="category.title"
    >
      <h2 class="text-lg opacity-50 mb-4">
        {{ category.title }}
      </h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
        <NuxtLink
          v-for="project in category.projects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-start gap-2 py-2 no-underline opacity-80 hover:opacity-100 transition-opacity"
        >
          <Icon
            v-if="project.icon"
            :name="project.icon"
            aria-hidden="true"
            class="mt-1 w-5 h-5 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
          />
          <div class="min-w-0">
            <div class="font-medium truncate group-hover:text-cyan-400 transition-colors">
              {{ project.name }}
            </div>
            <div
              v-if="project.description"
              class="text-sm opacity-50 line-clamp-1"
            >
              {{ project.description }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
