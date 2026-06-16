# Void

A terminal-inspired, fully customizable portfolio theme built as a [Nuxt Layer](https://nuxt.com/docs/getting-started/layers). Use it as a starting point for your personal site — everything from identity to UI theme is configurable through `app.config.ts`.

## Quick Start

### 1. Create your project

```bash
npx nuxi@latest init my-site
cd my-site
```

### 2. Install the layer

```bash
# Add the layer as a dependency
pnpm add @nuxtaid/void
```

Or extend directly from GitHub in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['github:nuxtaid/void'],
})
```

### 3. Configure your site

Create or edit `app.config.ts` in your project root:

```ts
export default defineAppConfig({
  void: {
    name: 'Jane Doe',
    avatar: '/avatar.jpg',
    title: 'a creative <br/> Full-Stack Developer',
    description: 'Building delightful web experiences.',
    greeting: 'Hey, I\'m Jane 👋',
    email: 'jane@example.com',
  },
})
```

### 4. Run

```bash
pnpm dev
```

---

## Configuration Reference

All configuration lives under the `void` key in `app.config.ts`. Every property has sensible defaults — only override what you need.

### Identity

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `name` | `string` | `'Arash Sheyda'` | Your full name (used in page titles, meta) |
| `avatar` | `string` | `'/assets/01.jpg'` | Path to your avatar image |
| `title` | `string` | `'a passionate...'` | Headline on the intro section (supports HTML) |
| `description` | `string` | `'with a love...'` | Bio text below the title (supports HTML) |
| `greeting` | `string` | `'Hi, I\'m Arash 👋'` | Short greeting shown above the title |
| `email` | `string` | `'hi@arashsheyda.me'` | Email shown in the terminal typewriter |

### Location

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `location.city` | `string` | `'Edmonton, AB'` | City shown on hover over the avatar badge |
| `location.flag` | `string` | `'🇨🇦'` | Flag emoji shown on the avatar badge |

Set `location` to `undefined` to hide the location badge entirely.

### Terminal

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `terminal.prompt` | `string` | `'➜'` | Prompt character in the header navigation |
| `terminal.handle` | `string` | `'pi@arashsheyda.me'` | Handle shown in OG image terminal |

### Socials

```ts
void: {
  socials: {
    header: true, // show social icons in the header nav
    items: [
      {
        title: 'GitHub',
        icon: 'uil:github',        // any Iconify icon
        url: 'https://github.com/you',
        color: '#333',              // hover color (optional)
        target: '_blank',           // link target (optional)
      },
    ],
  },
}
```

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `socials.header` | `boolean` | `true` | Show social icons in the desktop header |
| `socials.items` | `array` | `[...]` | Array of social link objects |

Each social item:

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `title` | `string` | yes | Tooltip / accessible label |
| `icon` | `string` | yes | [Iconify](https://icon-sets.iconify.design/) icon name |
| `url` | `string` | yes | Link URL |
| `color` | `string` | no | Hover color |
| `target` | `string` | no | Link target (`_blank`, `_self`, etc.) |

### UI Theme

#### Font

The default font is `Outfit`. Override it in your own CSS:

```css
body {
  font-family: 'JetBrains Mono', monospace;
}
```

#### Dotted Background

The dotted background uses CSS custom properties. Override them in your own CSS:

```css
:root {
  --dot-size: 1.3px;
  --dot-bg: #F0EFEE;
  --dot-color: #3C3C3C30;
}
.dark .dotted {
  --dot-color: #262626a0;
  --dot-bg: #161616;
}
```

#### Circuit Animation

The animated circuit background that pulses from the center of the page.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `ui.circuit.enabled` | `boolean` | `true` | Show the circuit canvas animation |
| `ui.circuit.speed` | `number` | `7` | Particle movement speed |
| `ui.circuit.particleCount` | `number` | `56` | Particles spawned per pulse |
| `ui.circuit.hueRange` | `[number, number]` | `[150, 210]` | HSL hue range (cyan–blue by default) |
| `ui.circuit.pulseInterval` | `number` | `1000` | Milliseconds between pulses |
| `ui.circuit.fadeOpacity` | `number` | `0.07` | Trail fade opacity (0–1) |

### Copyright

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `copyright.text` | `string` | `'void (WIP) by'` | Copyright prefix text |
| `copyright.author` | `string` | `'NuxtAid'` | Author name |
| `copyright.url` | `string` | `'https://github.com/nuxtaid'` | Author link |

---

## Full Example

```ts
// app.config.ts
export default defineAppConfig({
  void: {
    name: 'Jane Doe',
    avatar: '/jane.jpg',
    title: 'a creative <br/> Full-Stack Developer',
    description: 'I build things for the web and love every minute of it.',
    greeting: 'Hey there! 👋',
    email: 'jane@example.com',

    location: {
      city: 'San Francisco, CA',
      flag: '🇺🇸',
    },

    terminal: {
      prompt: '❯',
      handle: 'jane@dev',
    },

    socials: {
      header: true,
      items: [
        { title: 'GitHub', icon: 'uil:github', url: 'https://github.com/janedoe' },
        { title: 'Twitter', icon: 'uil:twitter', url: 'https://twitter.com/janedoe', color: '#1da1f2' },
      ],
    },

    ui: {
      circuit: {
        speed: 5,
        hueRange: [280, 320],    // purple tones
        particleCount: 40,
        pulseInterval: 1500,
      },
    },

    copyright: {
      text: 'made with ♥ by',
      author: 'Jane Doe',
      url: 'https://janedoe.dev',
    },
  },
})
```

---

## Content

This layer uses [`@nuxt/content`](https://content.nuxt.com/) v3. Add Markdown files under `content/` to create pages automatically.

```
content/
  blog/
    hello-world.md
    my-second-post.md
  projects.md
  about.md
```

### Front matter

```yaml
---
title: Hello World
description: My first blog post
meta:
  heading: true          # show the page heading (default: true)
  icon: uil:rocket       # optional icon next to heading
  image: /blog/cover.jpg # optional hero image
  footer: true           # show this page in the footer nav
  date: 2024-01-15       # date shown in list views
  tags:                  # technology icons shown in list views
    - logos:vue
    - logos:nuxt-icon
  head:
    meta:
      ogTitle: Custom OG Title
      ogDescription: Custom OG description
---
```

## Components

All components are auto-imported with a `V` prefix when using this layer:

| Component | Description |
|-----------|-------------|
| `<VIntro>` | Hero section with avatar, greeting, title, and description |
| `<VHeader>` | Terminal-style navigation header |
| `<VFooter>` | Fixed bottom footer with copyright and nav links |
| `<VLayout>` | Main layout wrapper (header + footer + dotted bg) |
| `<VCard>` | Content card with optional iframe preview |
| `<VGrid>` | Responsive grid of `<VCard>` items |
| `<VList>` | Chronological list view for blog/content |
| `<VProjectList>` | Categorized project listing |
| `<VSection>` | Section wrapper with optional title and icon |
| `<VSocials>` | Social icon links |
| `<VSearchBox>` | `Cmd+K` search overlay |
| `<VTypewriter>` | Typewriter text animation |
| `<VCircuit>` | Animated circuit canvas background |
| `<VCopyright>` | Copyright notice |

## License

MIT
