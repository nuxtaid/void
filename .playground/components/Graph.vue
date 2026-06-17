<script setup lang="ts">
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title)

const chartCanvas = ref(null)
const chartInstance = ref<any>(null)

onMounted(() => {
  if (chartCanvas.value) {
    const c = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: Array.from({ length: 100 }, () => ''),
        datasets: [
          {
            data: [0, 0, ...Array.from({ length: 98 }, () => 100)],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Real-Time Uptime Chart',
          },
        },
        scales: {
          x: {
            title: {
              display: false,
              text: 'Time (seconds)',
            },
          },
          y: {
            title: {
              display: false,
              text: 'Uptime',
            },
          },
        },
      },
    })

    chartInstance.value = c
  }
})

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})
</script>

<template>
  <canvas ref="chartCanvas" />
</template>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>
