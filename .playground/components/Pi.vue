<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useWebSocket } from '@vueuse/core'

const stats = ref<any>(null)

// const { meta, shift, period } = useMagicKeys()

// watchEffect(() => {
//   if (meta.value && shift.value && period.value) {
//     // login
//   }
// })

const { status, data: wsData } = useWebSocket(`ws://192.168.1.120/api/ws/temperature`, {
  autoReconnect: true,
  // autoReconnect: {
  //   retries: 3,
  //   delay: 1000,
  //   onFailed() {
  //     status.value = 'disconnected'
  //     console.log('WebSocket connection failed')
  //   },
  // },
})

watch(wsData, (message) => {
  if (!message) return
  const parsedMessage = JSON.parse(message)
  if (parsedMessage.status === 'update') {
    stats.value = parsedMessage.stats
  }
  else {
    console.error('Unknown message type:', parsedMessage)
  }
})

const temperature = computed(() => {
  if (!stats.value) return 0
  return stats.value.temperature.replace('°C', '')
})
const uptime = computed(() => stats.value?.uptime || 'Loading...')
const ramUsage = computed(() => stats.value?.ramUsage || 'Loading...')
const cpuUsage = computed(() => stats.value?.cpuUsage || 'Loading...')
const diskUsage = computed(() => stats.value?.diskUsage || 'Loading...')

const parts = 14
const activePartitions = computed(() => {
  const match = diskUsage.value.match(/^([\d.]+)([A-Za-z]+) \/ ([\d.]+)([A-Za-z]+) \(([\d]+)%\)$/)
  if (match) {
    // const used = parseFloat(match[1])
    // const total = parseFloat(match[3])
    const percentageUsed = parseInt(match[5])

    // Calculate the number of active partitions based on percentage used
    return Math.round((percentageUsed / 100) * parts)
  }
  return 0 // Default to 0 if the string is not in the expected format
})

const activeRamPartitions = computed(() => {
  const match = ramUsage.value.match(/^([\d.]+) (MB|GB) \/ ([\d.]+) (MB|GB) \(([\d.]+)%\)$/)
  if (match) {
    // const used = parseFloat(match[1])
    // const total = parseFloat(match[3])
    const percentageUsed = parseFloat(match[5])

    // Adjust the number of active partitions based on 10 partitions
    return Math.round((percentageUsed / 100) * parts)
  }
  return 0 // Default to 0 if the string is not in the expected format
})

const activeCpuPartitions = computed(() => {
  const match = cpuUsage.value.match(/^CPU Usage: ([\d.]+)%$/)
  if (match) {
    const percentageUsed = parseFloat(match[1])

    // Adjust the number of active partitions based on 10 partitions
    return Math.round((percentageUsed / 100) * parts)
  }
  return 0 // Default to 0 if the string is not in the expected format
})
</script>

<template>
  <div v-if="status !== 'OPEN'">
    <div class="group absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <div class="flex flex-col gap-2 items-center justify-center bg-[#1A1A1A] pb-4 pt-[18px] px-4 rounded-lg border border-[#2A2A29] hover:border-neutral-400/40 transition-border duration-300 text-neutral-400 group-hover:border-[#C5184F] w-28">
        <Icon
          class="block w-10 h-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
          name="i-devicon-plain-raspberrypi"
        />
        <Icon
          class="absolute top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-11 h-11"
          name="i-devicon-raspberrypi"
        />
        <p class="group-hover:text-yellow-500 select-none transition-color duration-300 max-w-24">
          PI is <br>
          <span class="lowercase">
            {{ status === 'OPEN' ? 'loading': status }}
          </span>
        </p>
      </div>
    </div>
    <ClientOnly>
      <VCircuit
        class="absolute inset-0"
        style="z-index: -1;"
      />
    </ClientOnly>
  </div>
  <main
    v-else
    class="grid grid-cols-12 gap-4 py-10 mx-auto max-w-7xl"
  >
    <div class="bg-[#1A1A1A] col-span-9 rounded-lg border border-[#2A2A29] hover:border-neutral-400/40 transition-border duration-300 p-8">
      <h1 class="text-2xl font-bold">
        System Stats
      </h1>

      <div class="flex gap-10 mt-8">
        <div class="flex flex-col">
          <p class="text-neutral-400">
            CPU Usage
          </p>
          <p>{{ cpuUsage }}</p>
          <div class="flex gap-2 mt-4">
            <div
              v-for="i of parts"
              :key="i"
              class="disk-partition"
              :class="i <= activeCpuPartitions ? 'active' : 'bg-cyan-900'"
            >
              <div
                v-if="i <= activeCpuPartitions"
                class="absolute disk-partition blur-sm active"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-neutral-400">
            Disk Usage
          </p>
          <p>{{ diskUsage }}</p>
          <div class="flex gap-2 mt-4">
            <div
              v-for="i of parts"
              :key="i"
              class="disk-partition"
              :class="i <= activePartitions ? 'active' : 'bg-cyan-900'"
            >
              <!-- :class="i === 1 ? 'active' : 'bg-cyan-900'" -->
              <div
                v-if="i <= activePartitions"
                class="absolute disk-partition blur-sm active"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <p class="text-neutral-400">
            Ram Usage
          </p>
          <p>{{ ramUsage }}</p>
          <div class="flex gap-2 mt-4">
            <div
              v-for="i of parts"
              :key="i"
              class="disk-partition"
              :class="i <= activeRamPartitions ? 'active' : 'bg-cyan-900'"
            >
              <!-- :class="i === 1 ? 'active' : 'bg-cyan-900'" -->
              <div
                v-if="i <= activeRamPartitions"
                class="absolute disk-partition blur-sm active"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative col-span-3 overflow-hidden bg-[#1A1A1A] py-10 rounded-lg border border-[#2A2A29] hover:border-neutral-400/40 transition-border duration-300">
      <div class="absolute z-10 top-0 bottom-0 w-28 left-0 bg-gradient-to-r from-[#1A1A1A] to-transparent" />
      <div class="absolute z-10 top-0 bottom-0 w-28 right-0  bg-gradient-to-l from-[#1A1A1A] to-transparent" />
      <div
        class="grid grid-cols-100 gap-[14px] items-baseline relative pt-20 transition-transform duration-300"
        :style="{
          transform: 'translateX(-' + (temperature * 10) + 'px)',
        }"
      >
        <div
          v-for="i of 100"
          :key="i"
          class="relative"
          :class="temperature === i ? 'rounded-sm bg-white' : 'bg-gray-100'"
          :style="{
            height: (i % 5 === 0 ? 35 : 20) + 'px',
            width: temperature === i ? '3px' : '1px',
          }"
        >
          <span
            :style="{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '10px',
              marginBottom: '20px',
            }"
          >
            <span
              v-if="i % 5 === 0"
              class="whitespace-nowrap text-lg font-thin"
            >
              {{ i }}° C
            </span>
          </span>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center gap-2 mt-10">
        <div
          class="h-2 w-full rounded damasanj"
          :style="{
            backgroundPosition: (temperature * 2) + '% 50%',
          }"
        />
        <div>
          {{ temperature }}° C
        </div>
      </div>
    </div>

    <div class="relative col-span-3  overflow-hidden bg-[#1A1A1A] p-8 rounded-lg border border-[#2A2A29] hover:border-neutral-400/40 transition-border duration-300">
      <h1 class="text-2xl font-bold mb-8 flex items-center gap-2">
        <span>Uptime</span>
        <span class="flex items-center text-green-500">
          <Icon
            class="block"
            name="i-uil-check-circle"
          />
          100%
        </span>
      </h1>
      <ClientOnly>
        <Graph />
      </ClientOnly>
      <p class="text-center">
        {{ uptime }}
      </p>
    </div>
    <div class="relative col-span-2 overflow-hidden bg-[#1A1A1A] p-4 rounded-lg border border-[#2A2A29] hover:border-neutral-400/40 transition-border duration-300">
      <h1 class="text-2xl mb-4 text-center">
        Health
      </h1>
      <div class="relative">
        <div class="flex flex-col-reverse items-center gap-2">
          <div
            v-for="i of 15"
            :key="i"
            class="disk-partition-vertical"
            :class="i <= 2 ? 'bg-red-500' : i <= 7 ? 'bg-orange-500' : i <= 13 ? 'bg-green-500' : 'bg-green-800'"
          >
            <div
              v-if="i <= 15"
              class="absolute disk-partition-vertical blur-sm"
              :class="i <= 2 ? 'bg-red-500' : i <= 7 ? 'bg-orange-500' : i <= 13 ? 'bg-green-500' : ''"
            />
          </div>
        </div>
        <div class="absolute right-0 top-2 flex flex-col items-center">
          <div class="flex">
            <span class="text-4xl">
              95
            </span>
            <span>
              %
            </span>
          </div>
          <span class="text-xl font-thin">
            Great
          </span>
        </div>
        <p class="absolute left-8 -bottom-1">
          0%
        </p>
        <p class="absolute left-4 -top-1">
          100%
        </p>
      </div>
    </div>
    <Terminal
      :info="stats.osInfo"
      class="col-span-7"
    />
  </main>
</template>

<style>
.grid-cols-100 {
  grid-template-columns: repeat(100, 1fr);
}

.aaa {
  @apply flex justify-evenly;
}

.disk-partition {
  @apply h-10 w-1.5 rounded-sm;
}

.disk-partition-vertical {
  @apply w-10 h-1.5 rounded-sm;
}

.active {
  @apply bg-gradient-to-t from-cyan-500 via-cyan-500 to-cyan-100;
}

.damasanj {
  @apply  bg-gradient-to-r from-cyan-500 via-green-500 to-red-600;
  background-size: 200% 100%;
  /* background-position: 0% 50%; */
}
</style>
