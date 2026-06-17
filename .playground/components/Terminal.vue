<script setup lang="ts">
import { useMagicKeys, onKeyStroke } from '@vueuse/core'

const { tab } = useMagicKeys()

interface TerminalEntry {
  command: string
  output: string
  timestamp: string
}

const props = defineProps<{
  info?: Record<string, string>
}>()

const emit = defineEmits<{
  close: () => void
}>()

const commandInput = ref('')

const route = useRoute()
const router = useRouter()

const history = ref<TerminalEntry[]>([
  {
    command: 'whoami',
    output: formatWhoamiOutput({
      name: 'Arash Ari Sheyda',
      platform: props.info?.platform || '',
      architecture: props.info?.architecture || '',
      release: props.info?.release || '',
    }),
    timestamp: new Date().toLocaleTimeString(),
  },
])

const pages = ['blog', 'resume', 'talks', 'contact', 'pi', 'goals', 'activity']

// Define predefined commands and their outputs
const predefinedCommands: Record<string, any> = {
  whoami: () => formatWhoamiOutput({
    name: 'Arash Ari Sheyda',
    platform: props.info?.platform || '',
    architecture: props.info?.architecture || '',
    release: props.info?.release || '',
  }),
  ls: `<pre>${pages.join('.vue ')}</pre>`,
  pwd: `<pre>${route.fullPath === '/' ? '~' : route.fullPath}</pre>`,
  clear: () => {
    history.value = []
    return ''
  },

  // Fun commands
  date: () => new Date().toLocaleString(),
  uname: () => `<pre>${props.info?.platform} ${props.info?.architecture} ${props.info?.release}</pre>`,
  uptime: '<pre>System uptime: 48 hours, 23 minutes</pre>',

  // Easter eggs
  matrix: () => {
    return `<pre style="color:#00ff00;font-size:10px;line-height:1.1">
 ╔══════════════════════════════════════╗
 ║  Wake up, Neo...                    ║
 ║  The Matrix has you...              ║
 ║  Follow the white rabbit.           ║
 ║                                     ║
 ║  🐇                                 ║
 ╚══════════════════════════════════════╝
    </pre>`
  },
  sudo: () => '<pre style="color:#ff6b6b">Nice try. 🔒 Permission denied.</pre>',
  vim: () => '<pre>How do I exit this thing?! Try :q! ... just kidding, we use VS Code here.</pre>',
  emacs: () => '<pre>M-x butterfly 🦋</pre>',
  coffee: () => {
    const coffees = [
      '<pre>☕ Brewing a fresh cup of TypeScript...</pre>',
      '<pre>☕ Here\'s your coffee. Now ship that feature.</pre>',
      '<pre>☕ Coffee loading... ████████████ 100% ✓</pre>',
      '<pre>☕ Error: coffee.exe has stopped working. Try tea?</pre>',
    ]
    return coffees[Math.floor(Math.random() * coffees.length)]
  },
  hi: () => '<pre>👋 Hey there! Type "help" to see what I can do.</pre>',
  hello: () => '<pre>👋 Hello, world! console.log("Nice to meet you")</pre>',
  github: () => '<pre>→ <a href="https://github.com/arashsheyda" target="_blank" style="color:#58a6ff;text-decoration:underline">github.com/arashsheyda</a></pre>',
  twitter: () => '<pre>→ <a href="https://twitter.com/arash_sheyda" target="_blank" style="color:#1DA1F2;text-decoration:underline">@arash_sheyda</a></pre>',
  hire: () => '<pre style="color:#00ff88">📧 Let\'s talk! Reach me at hi@arashsheyda.me\n\nI\'m interested in design systems, open source, and developer tooling.</pre>',
  skills: () => `<pre>
┌──────────────────────────────────────┐
│  Vue/Nuxt    ████████████████░░  90% │
│  TypeScript  ███████████████░░░  85% │
│  React       ██████████░░░░░░░░  55% │
│  CSS/HTML    ████████████████░░  90% │
│  Node.js     ██████████████░░░░  75% │
│  Design Sys  ████████████████░░  90% │
│  Git         ████████████████░░  90% │
│  DevTools    █████████████████░  95% │
└──────────────────────────────────────┘
  </pre>`,
  konami: () => '<pre style="color:#FFD700">🎮 ↑ ↑ ↓ ↓ ← → ← → B A — You found the Konami code! +30 lives</pre>',
  neofetch: () => `<pre style="color:#00DC82">
        ╭─────────────────────╮
   ╱╲   │ <span style="color:#fff">arash@void</span>          │
  ╱  ╲  │──────────────────── │
 ╱    ╲ │ <span style="color:#888">OS:</span> Nuxt 3           │
╱──────╲│ <span style="color:#888">Shell:</span> zsh + ohmyzsh │
╲      ╱│ <span style="color:#888">Editor:</span> VS Code      │
 ╲    ╱ │ <span style="color:#888">Theme:</span> Void          │
  ╲  ╱  │ <span style="color:#888">Lang:</span> TypeScript     │
   ╲╱   │ <span style="color:#888">PKGs:</span> 10+ modules   │
        ╰─────────────────────╯
  </pre>`,

  cd: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const page = commandInput.value.replace('cd ', '')
    if (pages.includes(page)) {
      await router.push(`/${page}`)
      return ''
    }
    else {
      return `cd: no such file or directory: ${page}`
    }
  },
  ping: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('64 bytes from sea15s08-in-x0e.1e100.net (2607:f8b0:400a:804::200e): icmp_seq=1 ttl=60 time=26.6 ms')
      }, 1000)
    })
  },
  help: generateHelpMessage(),
  joke: async () => fetchJoke(),
  fortune: async () => {
    await new Promise(resolve => setTimeout(resolve, 1250))
    return 'Error 404. Fortune not found :D'
  },
}

const isExecuting = ref(false) // Control whether the input is editable
const progress = ref(0) // Progress bar percentage
const loadingText = ref('')
const isComplete = ref(false)

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
let frameIndex = 0

const updateSpinner = () => {
  frameIndex = (frameIndex + 1) % frames.length
  loadingText.value = frames[frameIndex]
}

const getProgressBar = () => {
  const width = 73
  // const filled = Math.floor((progress.value / 100) * width)
  // const empty = width - filled
  // return '█'.repeat(filled) + '▒'.repeat(empty)

  const filledCount = Math.floor((progress.value / 100) * width)
  const emptyCount = width - filledCount

  return {
    filled: '█'.repeat(filledCount),
    empty: '▒'.repeat(emptyCount),
  }
}

async function executeCommand() {
  if (!commandInput.value.trim()) return

  isExecuting.value = true
  progress.value = 0
  const [command, ...args] = commandInput.value.trim().split(/\s+/)

  let output = 'Unknown command.'

  const progressInterval = setInterval(() => {
    progress.value += 10
    updateSpinner()
    if (progress.value >= 100) {
      finishProgress(progressInterval)
    }
  }, 100)

  if (predefinedCommands[command]) {
    try {
      output = typeof predefinedCommands[command] === 'function'
        ? await predefinedCommands[command](args)
        : predefinedCommands[command]
    }
    catch (error) {
      output = `Error executing ${command}: ${error}`
    }
  }

  finishProgress(progressInterval)
  progress.value = 100

  if (command !== 'clear') {
    history.value.push({
      command: commandInput.value,
      output,
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  setTimeout(() => {
    const input = document.getElementById('commandInput')
    input?.focus()
    scrollToBottom()
  }, 0)

  commandInput.value = ''
  isExecuting.value = false
}

function finishProgress(interval: any) {
  clearInterval(interval)
  loadingText.value = '✓'
  isComplete.value = true
}

function scrollToBottom() {
  const terminal = document.querySelector('.terminal-content')
  if (terminal) {
    terminal.scrollTop = terminal.scrollHeight
  }
}

async function fetchJoke() {
  const { joke } = await $fetch<any>('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
  return joke
}

onMounted(() => {
  setTimeout(() => {
    const input = document.getElementById('commandInput')
    input?.focus()
  }, 0)
})

onKeyStroke('Tab', (e) => {
  const input = document.getElementById('commandInput')
  if (tab.value && input === document.activeElement) {
    e.preventDefault()
  }
})
</script>

<template>
  <div class="bg-[#1A1A1A] border border-[#2A2A29] rounded-lg h-72">
    <div class="relative h-8 rounded-t-lg flex items-center bg-neutral-400/5">
      <div class="absolute left-4 flex gap-2">
        <button
          class="w-3 h-3 rounded-full bg-red-500 cursor-pointer border-0 p-0"
          aria-label="Close terminal"
          @click="emit('close')"
        />
        <button
          class="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer border-0 p-0"
          aria-label="Minimize terminal"
          @click="emit('close')"
        />
        <div
          class="w-3 h-3 rounded-full bg-green-500"
          aria-hidden="true"
        />
      </div>
      <div class="flex-1 text-center text-terminal-text text-sm font-medium">
        pi@arash.is
      </div>
      <div class="absolute right-4 flex gap-2">
        <Icon
          name="i-devicon-plain-raspberrypi"
          aria-hidden="true"
        />
        <!-- <Icon name="i-devicon-plain-debian" /> -->
      </div>
    </div>
    <div class="terminal-content h-[calc(100%-2rem)] rounded-b-lg p-4 overflow-y-auto text-sm font-mono">
      <div
        v-for="(entry, index) in history"
        :key="index"
        class="relative mb-4"
      >
        <div class="flex items-center text-green-400">
          <span class="mr-2">➜</span>
          <span class="text-cyan-400">~pi</span>
          <span class="ml-2">{{ entry.command }}</span>
        </div>
        <div class="mt-1">
          <div v-html="entry.output" />
        </div>
        <p class="absolute top-0 right-0 text-xs">
          <span class="text-yellow-500">
            pi@arash.is
          </span>
          {{ entry.timestamp }}
        </p>
      </div>

      <div class="relative flex items-center text-green-400">
        <span class="mr-2">➜</span>
        <span class="text-cyan-400">~pi</span>
        <label
          for="commandInput"
          class="sr-only"
        >Terminal command input</label>
        <input
          id="commandInput"
          v-model="commandInput"
          type="text"
          class="flex-1 ml-2 bg-transparent text-terminal-text font-mono focus:outline-none"
          placeholder="Enter command..."
          :disabled="isExecuting"
          autocomplete="off"
          @keyup.enter="executeCommand"
        >
        <p class="absolute top-0 right-0 text-xs">
          <span class="text-yellow-500">
            pi@arash.is
          </span>
          {{ new Date().toLocaleTimeString() }}
        </p>
      </div>
      <div
        v-if="isExecuting"
        class="mt-2"
      >
        <pre><span :class="isComplete ? 'text-[#00ff00]' : 'text-cyan-400'">[{{ loadingText }}]</span> <span class="text-[#00ff00]">{{ getProgressBar().filled }}</span><span class="text-[#777]">{{ getProgressBar().empty }}</span> <span :class="isComplete ? 'text-[#00ff00]' : 'text-cyan-400'">{{ Math.round(progress) }}%</span></pre>
      </div>
    </div>
  </div>
</template>
