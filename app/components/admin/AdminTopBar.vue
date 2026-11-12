<script setup>
// Tell the layout when the menu button (phones only) is pressed
const emit = defineEmits(['open-menu'])

// The signed-in admin (used in the welcome message and the avatar)
const admin = useAdminProfile()

// Today's date as text, for example "Wednesday, October 24, 2024".
// useState keeps the value made on the server, so the browser shows exactly the same text (no mismatch).
const todayText = useState('admin-today-text', () =>
  new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()),
)

// true when there are unread notifications (shows the red dot). PLACEHOLDER until the backend exists.
const hasUnreadNotifications = true
</script>

<template>
  <!-- Fixed top bar. It starts after the sidebar: 0 on phones, 72px on tablets, 280px on desktop. -->
  <header class="fixed left-0 right-0 top-0 z-30 flex h-20 items-center justify-between gap-4 bg-off-white/80 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:px-6 md:left-[72px] xl:left-[280px] xl:px-8">
    <div class="flex min-w-0 items-center gap-3">
      <!-- Menu button: only on phones, opens the sidebar drawer -->
      <button
        type="button"
        aria-label="Open menu"
        class="rounded-lg p-2 text-slate-body transition-colors hover:bg-surface-low md:hidden"
        @click="emit('open-menu')"
      >
        <AppIcon name="menu" class="text-[24px]" />
      </button>
      <div class="flex min-w-0 flex-col">
        <h1 class="truncate font-sans text-xl font-semibold leading-7 tracking-[-0.015em] text-oxford-blue">Speaking Club Admin</h1>
        <p class="truncate text-[13px] leading-[18px] text-slate-body">Welcome back, {{ admin.firstName }}!</p>
      </div>
    </div>

    <div class="flex shrink-0 items-center gap-3 sm:gap-6">
      <!-- Date -->
      <div class="hidden items-center gap-1 rounded-full bg-surface-low px-4 py-1 text-[13px] text-slate-body lg:flex">
        <AppIcon name="calendar_today" class="text-[18px]" />
        <span>{{ todayText }}</span>
      </div>

      <!-- Notifications -->
      <button
        type="button"
        aria-label="Notifications"
        class="relative rounded-full p-1.5 text-slate-body transition-colors hover:bg-surface-low hover:text-oxford-blue"
      >
        <AppIcon name="notifications" class="text-[22px]" />
        <span v-if="hasUnreadNotifications" class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error"></span>
      </button>

      <!-- Create Session (does nothing yet: the sessions pages are not built). The text hides on very small screens. -->
      <button
        type="button"
        aria-label="Create Session"
        class="flex items-center gap-1 rounded-lg bg-deep-teal px-3 py-2 text-xs font-semibold tracking-[0.03em] text-white transition-colors hover:bg-deep-teal/90 sm:px-4"
      >
        <AppIcon name="add" class="text-[18px]" />
        <span class="hidden sm:inline">Create Session</span>
      </button>

      <!-- Admin avatar -->
      <AdminAvatar :name="admin.fullName" />
    </div>
  </header>
</template>
