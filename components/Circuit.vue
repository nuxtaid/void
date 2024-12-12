<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEventListener, useDebounceFn, useRafFn } from '@vueuse/core'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const particles: Particle[] = []
const particlePool: Particle[] = []

interface Speed {
  x: number
  y: number
}

class Particle {
  x: number
  y: number
  speed: Speed
  color: string

  constructor(x = 0, y = 0, speed: Speed = { x: 0, y: 0 }, color = '') {
    this.x = x
    this.y = y
    this.speed = speed
    this.color = color
  }

  init(x: number, y: number, speed: Speed, color: string) {
    this.x = x
    this.y = y
    this.speed = speed
    this.color = color
  }

  update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.color
    ctx.lineWidth = 1
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    this.x += this.speed.x
    this.y += this.speed.y
    ctx.lineTo(this.x, this.y)
    ctx.stroke()

    const angle = Math.atan2(this.speed.y, this.speed.x)
    const magnitude = Math.sqrt(this.speed.x ** 2 + this.speed.y ** 2)
    const options = [angle + Math.PI / 4, angle - Math.PI / 4]

    if (Math.random() < 0.05) {
      const choice = Math.floor(Math.random() * options.length)
      this.speed.x = Math.cos(options[choice]) * magnitude
      this.speed.y = Math.sin(options[choice]) * magnitude
    }
  }
}

const getParticle = () => particlePool.pop() || new Particle()

const recycleParticle = (particle: Particle) => particlePool.push(particle)

const clear = () => {
  if (!ctx || !canvasRef.value) return
  ctx.fillStyle = 'rgba(0,0,0,0.07)'
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}

const createPulse = () => {
  if (!canvasRef.value || !ctx) return

  const speed = 7
  const hue = Math.random() * (210 - 150)

  for (let i = 0; i < 56; i++) {
    const particle = getParticle()
    particle.init(
      canvasRef.value.width / 2,
      canvasRef.value.height / 2,
      {
        x: Math.cos((i / 8) * 2 * Math.PI) * speed,
        y: Math.sin((i / 8) * 2 * Math.PI) * speed,
      },
      `hsl(${hue},100%,50%)`,
    )
    particles.push(particle)
  }
}

const animate = () => {
  if (!ctx || !canvasRef.value) return

  clear()

  particles.forEach((particle, index) => {
    particle.update(ctx!)
    if (
      particle.x < 0
      || particle.x > canvasRef.value!.width
      || particle.y < 0
      || particle.y > canvasRef.value!.height
    ) {
      recycleParticle(particles.splice(index, 1)[0])
    }
  })
}

// debounced resize function using VueUse
const resizeCanvas = useDebounceFn(() => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }
}, 100)

onMounted(() => {
  if (!canvasRef.value) return

  ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  // set initial canvas size
  resizeCanvas()

  // listen to window resize events
  useEventListener(window, 'resize', resizeCanvas)

  // create pulse periodically
  const pulseInterval = setInterval(createPulse, 1000)

  // animation frame loop
  const { pause } = useRafFn(animate, { immediate: true })

  onBeforeUnmount(() => {
    clearInterval(pulseInterval)
    pause()
  })
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="w-full h-full pointer-events-none"
  />
</template>
