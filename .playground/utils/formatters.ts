interface WhoAmI {
  name: string
  platform: string
  architecture: string
  release: string
}

export function formatWhoamiOutput({ name, architecture, platform, release }: WhoAmI) {
  return `<pre>{
  "name": ${name},
  "platform": "${platform}",
  "architecture": "${architecture}",
  "release": "${release}",
}</pre>`
}

export function generateHelpMessage() {
  return `<pre>Available commands:
whoami - Display user info
ls - List directory contents
pwd - Print working directory
date - Display current date and time
uname - System information
uptime - System uptime
cd - Change directory
clear - Clear terminal screen
help - Show this help message
joke - Display a random joke
fortune - Display a random fortune
</pre>`
}
