<script setup>
// The font for admin text (body and tables). The headings and numbers use Plus Jakarta Sans, which is already loaded.
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
  ],
})

// Is the sidebar drawer open? (only used on phones)
const isDrawerOpen = ref(false)

// Open the drawer
function openDrawer() {
  isDrawerOpen.value = true
}

// Close the drawer
function closeDrawer() {
  isDrawerOpen.value = false
}

// Close the drawer when the student goes to another page (this watcher reacts to the page address)
const route = useRoute()
watch(() => route.fullPath, closeDrawer)
</script>

<template>
  <!-- Escape closes the drawer. font-body = Inter. -->
  <div class="min-h-screen bg-off-white font-body text-slate-body antialiased" @keydown.esc="closeDrawer">
    <AdminSidebar :is-drawer-open="isDrawerOpen" @close="closeDrawer" />

    <!-- Dark layer behind the open drawer (phones only). A click on it closes the drawer. -->
    <div v-if="isDrawerOpen" class="fixed inset-0 z-40 bg-oxford-blue/40 md:hidden" aria-hidden="true" @click="closeDrawer"></div>

    <!-- The page area leaves room for the sidebar: 0 on phones, 72px on tablets, 280px on desktop -->
    <div class="md:pl-[72px] xl:pl-[280px]">
      <AdminTopBar @open-menu="openDrawer" />
      <main class="px-4 pb-8 pt-24 sm:px-6 xl:px-8">
        <slot />
      </main>
    </div>
  </div>
</template>
