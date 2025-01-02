<script setup lang="ts">
import { NuxtLink } from '#components'

const props = withDefaults(defineProps<{
  color?: string
  items: any[]
}>(), {
  color: '#22C55D',
})

const filtered = computed(() => {
  const positions = props.items.reduce((acc, item) => {
    if (item.company) {
      const existingCompany = acc.find((entry: any) => entry.company.text === item.company.text)

      if (existingCompany) {
        existingCompany.positions.push(item)
      }
      else {
        acc.push({ company: item.company, positions: [item] })
      }
    }
    else {
      acc.push({ positions: [item] })
    }
    return acc
  }, [] as { company?: { text: string, path: string }, positions: any[] }[])

  return positions
})
</script>

<template>
  <ol class="p-4">
    <li
      v-for="item, index in filtered"
      :key="index"
      class="timeline-item ov"
      :style="{ '--color-timeline': color }"
    >
      <div
        class="flex flex-col gap-2"
      >
        <h3 v-if="item.company">
          <component
            :is="item.company.path ? NuxtLink : 'span'"
            v-if="item.company"
            :to="item.company.path"
            :target="item.company.path ? '_blank' : undefined"
            class="flex items-center gap-2"
            :class="{ 'hover:underline': item.company.path }"
          >
            <Icon :name="item.company?.icon || 'i-carbon-building'" />
            {{ item.company?.text || item.company }}
          </component>
        </h3>
        <ol :class="{ 'mt-4': item.positions.length > 1 }">
          <li
            v-for="position, idx of item.positions"
            :key="position.id"
            class="timeline-item text-sm flex flex-col gap-2"
            :class="{ 'before:bg-gray-400 ': item.positions.length > 1, 'after:bg-neutral-400/10': idx !== item.positions.length - 1, '!px-2': !item.company }"
          >
            <component
              :is="item.company ? 'p' : 'h3'"
              class="flex items-center gap-2"
            >
              <img
                v-if="position.icon?.startsWith('https')"
                :src="position.icon"
                class="w-5 h-4 rounded-sm"
              >
              <Icon
                v-else
                :name="position.icon || 'i-carbon-portfolio'"
              />
              {{ position.title }}
            </component>
            <p
              v-if="position.date"
              class="flex items-center gap-2"
            >
              <Icon name="i-carbon-calendar" />
              {{ position.date?.start || position.date }}
              {{ position.date?.start ? ` | ${position.date?.end || 'Presenet'}` : '' }}
            </p>
            <p
              v-if="position.location"
              class="flex items-center gap-2"
            >
              <Icon name="i-carbon-location" />
              {{ position.location }}
            </p>
            <p
              v-if="position.description"
              class="timeline-description whitespace-pre-line"
              v-text="position.description"
            />
          </li>
        </ol>
      </div>
    </li>
  </ol>
</template>

<style>
.timeline-item {
  @apply relative w-full px-8 pb-6;
}

.timeline-item::before {
  content: '';
  position: absolute;
  top: 0.7rem;
  left: -0.3125rem;
  height: 0.625rem;
  width: 0.625rem;
  border-radius: 50%;
  z-index: 1;
}

.timeline-item.ov::before {
  background: var(--color-timeline);
  box-shadow: 0 0 0 0.25rem v-bind(color+50);
}

.timeline-item.ov::after {
  @apply bg-neutral-400/10;

}

.timeline-item::after {
  content: '';
  position: absolute;
  top: 0.625rem;
  left: -1px;
  width: 0.0625rem;
  height: calc(100%);
}

.timeline-item:last-child::after {
  height: calc(100% - 1.5rem);
}

.timeline-description::before {
  content: '-';
  margin-right: 0.5rem;
}
</style>
