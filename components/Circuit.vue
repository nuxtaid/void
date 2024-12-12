<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const particles: Particle[] = []
let animationFrame: number

interface Speed {
  x: number
  y: number
}

class Particle {
  x: number
  y: number
  speed: Speed
  color: string

  constructor(x: number, y: number, speed: Speed, color: string) {
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

const clear = () => {
  if (!ctx || !canvasRef.value) return
  ctx.fillStyle = 'rgba(0,0,0,0.07)'
  // ctx.fillStyle = 'rgba(22, 22, 22, 0.1)'
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}

const createPulse = () => {
  if (!canvasRef.value || !ctx) return

  const speed = 7
  const hue = Math.random() * (210 - 150)
  // const hue = Math.random() * 360

  for (let i = 0; i < 56; i++) {
    particles.push(
      new Particle(
        canvasRef.value.width / 2,
        canvasRef.value.height / 2,
        {
          x: Math.cos((i / 8) * 2 * Math.PI) * speed,
          y: Math.sin((i / 8) * 2 * Math.PI) * speed,
        },
        `hsl(${hue},100%,50%)`,
      ),
    )
  }
}

const animate = () => {
  if (!canvasRef.value || !ctx) return

  clear()

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(ctx)
    if (
      particles[i].x < 0
      || particles[i].x > canvasRef.value.width
      || particles[i].y < 0
      || particles[i].y > canvasRef.value.height
    ) {
      particles.splice(i, 1)
    }
  }

  animationFrame = requestAnimationFrame(animate)
}

let pulseInterval: NodeJS.Timeout

onMounted(() => {
  if (!canvasRef.value) return

  ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  const resizeCanvas = () => {
    if (!canvasRef.value) return
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  pulseInterval = setInterval(createPulse, 1000)
  animate()
})

onBeforeUnmount(() => {
  clearInterval(pulseInterval)
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', () => {})
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="w-full h-full pointer-events-none"
  />
</template>
