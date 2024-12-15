import os from 'os'
import fs from 'fs'
import { execSync, spawn } from 'child_process'

const updateInterval = 1000 // Update every 1 second
const activePeers = new Map()

const osInfo = {
  name: os.type(), // e.g., 'Linux', 'Darwin', 'Windows_NT'
  release: os.release(), // OS version
  platform: os.platform(), // e.g., 'linux', 'win32', 'darwin'
  architecture: os.arch(), // e.g., 'x64', 'arm', 'arm64'
  hostname: os.hostname(),
}

let pythonProcess: any = null

export default defineWebSocketHandler({
  open(peer) {
    // Add peer to active peers map
    const interval = setInterval(async () => {
      if (!activePeers.has(peer)) return // Ensure peer is still active
      const stats = await getSystemStats()
      peer.send(JSON.stringify({ status: 'update', stats }))
    }, updateInterval)

    activePeers.set(peer, interval)
    peer.send(
      JSON.stringify({
        status: 'connected',
        message: 'Real-time stats streaming started.',
      }),
    )
  },
  async message(peer, message) {
    const { action, token } = JSON.parse(message.text())

    if (action === 'xmastree') {
      if (!token) {
        peer.send(JSON.stringify({ status: 'xmastree-error', message: 'Error: Missing token.' }))
        return
      }
      const { verified } = await $fetch('/api/auth/totp/verify', {
        method: 'POST',
        body: {
          token,
        },
      })
      if (!verified) {
        peer.send(JSON.stringify({ status: 'xmastree-error', message: 'Error: Invalid token.' }))
        return
      }

      if (!pythonProcess) {
        const rootDirectory = process.cwd()
        console.log(`${rootDirectory}/scripts/rgb.py`)
        pythonProcess = spawn('python', [
          '/home/arash/Developer/projects/void/scripts/rgb.py',
          '--brightness', '1',
        ])
        peer.send(JSON.stringify({ status: 'xmastree-success', message: 'Success: Xmas tree started.' }))
        return
      }
      if (pythonProcess) {
        pythonProcess.kill('SIGINT')
        pythonProcess = null
        peer.send(JSON.stringify({ status: 'xmastree-success', message: 'Success: Xmas tree stopped.' }))
        return
      }
    }

    if (action === 'getStats') {
      try {
        const stats = await getSystemStats()
        peer.send(JSON.stringify({ status: 'success', stats }))
      }
      catch (error) {
        peer.send(JSON.stringify({ status: 'error', message: error.message }))
      }
    }
    else if (action === 'stopUpdates') {
      stopUpdatesForPeer(peer)
      peer.send(
        JSON.stringify({
          status: 'stopped',
          message: 'Real-time stats updates stopped.',
        }),
      )
    }
    else {
      peer.send(
        JSON.stringify({ status: 'error', message: 'Invalid action.' }),
      )
    }
  },
  close(peer) {
    stopUpdatesForPeer(peer)
    if (pythonProcess) {
      pythonProcess.kill('SIGINT')
      pythonProcess = null
    }
    peer.send(
      JSON.stringify({
        status: 'disconnected',
        message: 'WebSocket connection closed.',
      }),
    )
  },
})

function stopUpdatesForPeer(peer) {
  if (activePeers.has(peer)) {
    clearInterval(activePeers.get(peer))
    activePeers.delete(peer)
  }
}

// Helper function to get system stats
async function getSystemStats() {
  const temperature = getTemperature()
  const uptime = getUptime()
  const ramUsage = getRamUsage()
  const cpuUsage = await getCpuUsage()
  const diskUsage = getDiskUsage()

  return {
    temperature,
    uptime,
    ramUsage,
    cpuUsage,
    diskUsage,
    osInfo,
  }
}

function getTemperature() {
  try {
    const temp = fs.readFileSync(
      '/sys/class/thermal/thermal_zone0/temp',
      'utf8',
    )
    return `${(parseInt(temp, 10) / 1000).toFixed(2)} °C`
  }
  catch (err) {
    return 'Temperature sensor not available'
  }
}

function getUptime() {
  const uptimeSeconds = os.uptime()
  const hours = Math.floor(uptimeSeconds / 3600)
  const minutes = Math.floor((uptimeSeconds % 3600) / 60)
  const seconds = Math.floor(uptimeSeconds % 60)
  return `${hours}h ${minutes}m ${seconds}s`
}

function getRamUsage() {
  const totalMem = os.totalmem()
  const freeMem = os.freemem()
  const usedMem = totalMem - freeMem
  const usedPercentage = ((usedMem / totalMem) * 100).toFixed(2)
  return `${(usedMem / 1024 / 1024).toFixed(2)} MB / ${(
    totalMem
    / 1024
    / 1024
  ).toFixed(2)} MB (${usedPercentage}%)`
}

async function getCpuUsage() {
  return new Promise((resolve) => {
    const startUsage = os.cpus()
    setTimeout(() => {
      const endUsage = os.cpus()
      let totalStart = 0
      let totalEnd = 0
      let idleStart = 0
      let idleEnd = 0

      // Calculate total and idle time for each CPU core
      startUsage.forEach((cpu, i) => {
        const end = endUsage[i]
        totalStart += Object.values(cpu.times).reduce((acc, t) => acc + t, 0)
        totalEnd += Object.values(end.times).reduce((acc, t) => acc + t, 0)
        idleStart += cpu.times.idle
        idleEnd += end.times.idle
      })

      // Calculate CPU usage percentage
      const idle = idleEnd - idleStart
      const total = totalEnd - totalStart
      const cpuUsagePercentage = ((1 - idle / total) * 100).toFixed(2)

      // Get CPU total time and used time
      const totalCpuTime = (total / 1000).toFixed(2) // Convert to seconds
      const usedCpuTime = ((total - idle) / 1000).toFixed(2) // Convert to seconds

      resolve(`${usedCpuTime} / ${totalCpuTime} (${cpuUsagePercentage}%)`)
    }, 1000)
  })
}

function getDiskUsage() {
  try {
    const diskUsage = execSync('df -h /').toString()
    const lines = diskUsage.trim().split('\n')
    const [_, size, used, avail, percent] = lines[1].split(/\s+/)
    return `${used} / ${size} (${percent})`
  }
  catch (err) {
    return 'Disk usage information not available'
  }
}
