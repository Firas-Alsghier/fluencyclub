<script setup>
// On phones the sidebar is a drawer. The layout tells us when it is open.
defineProps({
  isDrawerOpen: { type: Boolean, default: false },
})

// Tell the layout when the drawer should close (for example after a link is clicked)
const emit = defineEmits(['close'])

// The sidebar links (from app/utils/adminNavigation.js) and the signed-in admin
const navItems = ADMIN_NAV_ITEMS
const admin = useAdminProfile()

// The current page address, to know which link is active
const route = useRoute()

// Is this link the page we are on? Overview must match exactly, the others also match their sub-pages.
function isActive(item) {
  // Remove a trailing slash, so "/admin/" and "/admin" are the same
  const currentPath = route.path.replace(/\/$/, '') || '/'
  // The Overview link is active only on its own page
  if (item.to === '/admin') return currentPath === '/admin'
  // Other links are active on their page and on pages below it
  return currentPath.startsWith(item.to)
}
</script>

<template>
  <!--
    Three sizes (DESIGN.md):
    - phones: a drawer that slides in (hidden when closed)
    - tablets: a narrow bar with only icons (72px)
    - desktop: the full sidebar (280px)
  -->
  <aside
    aria-label="Admin sidebar"
    class="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col justify-between bg-oxford-blue text-white transition-[transform,visibility] duration-200 md:w-[72px] md:translate-x-0 md:visible xl:w-[280px]"
    :class="isDrawerOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'"
  >
    <div class="flex min-h-0 flex-col">
      <!-- Brand -->
      <div class="flex h-20 shrink-0 items-center gap-3 px-6 md:justify-center md:px-0 xl:justify-start xl:px-6">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
          <AppIcon name="record_voice_over" class="text-[20px]" />
        </span>
        <span class="flex flex-col md:hidden xl:flex">
          <span class="font-sans text-base font-bold leading-tight tracking-tight">Speaking Club</span>
          <span class="text-[11px] font-semibold uppercase tracking-wider text-deep-teal-light">Admin Portal</span>
        </span>
      </div>

      <!-- Links. The title attribute shows the name when only icons are visible. -->
      <nav aria-label="Admin" class="space-y-1 overflow-y-auto px-4 py-2 md:px-3 xl:px-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :title="item.label"
          :aria-current="isActive(item) ? 'page' : undefined"
          class="relative flex items-center gap-3 rounded-lg px-4 py-2 transition-colors md:justify-center md:px-0 xl:justify-start xl:px-4"
          :class="isActive(item) ? 'bg-surface-low font-semibold text-oxford-blue' : 'text-surface-high hover:bg-[#2e476f] hover:text-white'"
          @click="emit('close')"
        >
          <AppIcon :name="item.icon" class="text-[20px]" />
          <span class="text-sm md:hidden xl:inline">{{ item.label }}</span>
          <!-- Small number badge (for example unread notifications). On tablets it sits on the corner of the icon. -->
          <span
            v-if="item.badgeCount"
            class="ml-auto rounded-full bg-soft-amber px-1.5 py-0.5 text-[11px] font-bold leading-[14px] text-[#291800] md:absolute md:right-1 md:top-0.5 md:ml-0 md:px-1 xl:static xl:ml-auto xl:px-1.5"
          >
            {{ item.badgeCount }}
          </span>
        </NuxtLink>
      </nav>
    </div>

    <!-- Admin profile -->
    <div class="m-4 flex items-center justify-between gap-2 rounded-xl bg-white/10 p-4 md:m-2 md:justify-center md:p-2 xl:m-4 xl:justify-between xl:p-4">
      <div class="flex min-w-0 items-center gap-2">
        <AdminAvatar :name="admin.fullName" size-classes="h-8 w-8 text-[11px]" />
        <div class="flex min-w-0 flex-col md:hidden xl:flex">
          <span class="truncate font-sans text-[13px] font-semibold leading-tight">{{ admin.fullName }}</span>
          <span class="truncate text-[11px] font-semibold text-deep-teal-light">{{ admin.role }}</span>
        </div>
      </div>
      <!-- Log out button (does nothing yet: there is no login system) -->
      <button
        type="button"
        aria-label="Log out"
        class="rounded p-1 text-surface-high transition-colors hover:bg-error-soft hover:text-on-error-soft md:hidden xl:block"
      >
        <AppIcon name="logout" class="text-[20px]" />
      </button>
    </div>
  </aside>
</template>
