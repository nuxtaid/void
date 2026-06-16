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

  <span style="color:#00DC82">Navigation</span>
  ls          List pages
  cd [page]   Navigate to a page
  pwd         Print current path

  <span style="color:#58a6ff">Info</span>
  whoami      Display user info
  neofetch    System info (cool version)
  skills      Show skill bars
  date        Current date and time
  uname       System information
  uptime      System uptime

  <span style="color:#F59E0C">Social</span>
  github      Open GitHub profile
  twitter     Open Twitter profile
  hire        Get in touch

  <span style="color:#EC4899">Fun</span>
  joke        Random dad joke
  fortune     Random fortune
  coffee      Brew a coffee
  matrix      Follow the white rabbit
  konami      ↑ ↑ ↓ ↓ ← → ← → B A
  vim         Try to exit vim
  sudo        Gain root access

  <span style="color:#888">Utility</span>
  clear       Clear terminal
  help        Show this message
</pre>`
}
