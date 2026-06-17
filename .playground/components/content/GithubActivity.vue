<script setup lang="ts">
const username = 'arashsheyda'
const { data: events, status } = await useFetch<any[]>(`https://api.github.com/users/${username}/events/public`, {
  params: { per_page: 30 },
  transform: (data: any[]) => {
    return data
      .filter((e: any) => ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'WatchEvent', 'ForkEvent'].includes(e.type))
      .slice(0, 20)
      .map((e: any) => ({
        type: e.type,
        repo: e.repo.name,
        repoUrl: `https://github.com/${e.repo.name}`,
        createdAt: e.created_at,
        action: getAction(e),
        detail: getDetail(e),
      }))
  },
})

function getAction(event: any): string {
  switch (event.type) {
    case 'PushEvent':
      return `pushed ${event.payload.commits?.length || 0} commit${event.payload.commits?.length === 1 ? '' : 's'}`
    case 'PullRequestEvent':
      return `${event.payload.action} PR #${event.payload.pull_request?.number}`
    case 'IssuesEvent':
      return `${event.payload.action} issue #${event.payload.issue?.number}`
    case 'CreateEvent':
      return `created ${event.payload.ref_type}${event.payload.ref ? ` ${event.payload.ref}` : ''}`
    case 'WatchEvent':
      return 'starred'
    case 'ForkEvent':
      return 'forked'
    default:
      return event.type.replace('Event', '').toLowerCase()
  }
}

function getDetail(event: any): string {
  switch (event.type) {
    case 'PushEvent':
      return event.payload.commits?.[0]?.message?.split('\n')[0] || ''
    case 'PullRequestEvent':
      return event.payload.pull_request?.title || ''
    case 'IssuesEvent':
      return event.payload.issue?.title || ''
    default:
      return ''
  }
}

function getIcon(type: string): string {
  switch (type) {
    case 'PushEvent': return 'i-tabler-git-commit'
    case 'PullRequestEvent': return 'i-tabler-git-pull-request'
    case 'IssuesEvent': return 'i-tabler-circle-dot'
    case 'CreateEvent': return 'i-tabler-plus'
    case 'WatchEvent': return 'i-tabler-star'
    case 'ForkEvent': return 'i-tabler-git-fork'
    default: return 'i-tabler-activity'
  }
}

function getColor(type: string): string {
  switch (type) {
    case 'PushEvent': return 'text-green-400'
    case 'PullRequestEvent': return 'text-purple-400'
    case 'IssuesEvent': return 'text-yellow-400'
    case 'CreateEvent': return 'text-blue-400'
    case 'WatchEvent': return 'text-amber-400'
    case 'ForkEvent': return 'text-cyan-400'
    default: return 'text-gray-400'
  }
}

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
</script>

<template>
  <div class="space-y-2">
    <div
      v-if="status === 'pending'"
      class="text-gray-500 animate-pulse"
    >
      Loading activity...
    </div>
    <div
      v-else-if="events?.length"
      class="space-y-1"
    >
      <div
        v-for="(event, i) in events"
        :key="i"
        class="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-[#1A1A1A] transition-colors group"
      >
        <div class="mt-1 flex-shrink-0">
          <div :class="[getIcon(event.type), getColor(event.type), 'text-lg']" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline gap-2 flex-wrap">
            <span
              class="text-sm"
              :class="getColor(event.type)"
            >{{ event.action }}</span>
            <span class="text-xs text-gray-600">to</span>
            <NuxtLink
              :href="event.repoUrl"
              target="_blank"
              external
              class="text-sm text-gray-300 hover:text-white font-mono truncate"
            >
              {{ event.repo }}
            </NuxtLink>
          </div>
          <p
            v-if="event.detail"
            class="text-xs text-gray-500 mt-0.5 truncate"
          >
            {{ event.detail }}
          </p>
        </div>
        <span class="text-xs text-gray-600 flex-shrink-0 mt-1">
          {{ timeAgo(event.createdAt) }}
        </span>
      </div>
    </div>
    <div
      v-else
      class="text-gray-500"
    >
      No recent activity.
    </div>
  </div>
</template>
