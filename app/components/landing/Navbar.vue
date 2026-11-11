<script setup>
// The links shown in the menu (they live in app/utils/siteConfig.js)
const navLinks = NAV_LINKS

// Is the mobile menu open? true = open, false = closed
const isMenuOpen = ref(false)

// Open the mobile menu if it is closed, close it if it is open
function toggleMenu() {
  // Flip the value: true becomes false and false becomes true
  isMenuOpen.value = !isMenuOpen.value
}

// Always close the mobile menu
function closeMenu() {
  // Set the menu to closed
  isMenuOpen.value = false
}
</script>

<template>
  <!-- Fixed top bar. Pressing the Escape key closes the mobile menu. -->
  <header
    class="fixed inset-x-0 top-0 z-40 border-b border-border-subtle bg-white/90 backdrop-blur-md"
    @keydown.esc="closeMenu"
  >
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
      <!-- Logo: goes back to the top of the page -->
      <NuxtLink to="/#hero" class="flex items-center gap-3" @click="closeMenu">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-oxford-blue text-white shadow-xs">
          <AppIcon name="forum" class="text-[24px]" />
        </span>
        <span class="flex flex-col">
          <span class="text-xl font-extrabold leading-none tracking-tight text-oxford-blue">FluencyClub</span>
          <span class="text-[11px] font-semibold uppercase tracking-wider text-deep-teal">Speaking Club</span>
        </span>
      </NuxtLink>

      <!-- Menu for big screens (hidden on phones and tablets) -->
      <nav class="hidden items-center gap-8 text-[15px] font-medium text-slate-body lg:flex" aria-label="Main">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="transition-colors hover:text-oxford-blue"
          :class="{ 'font-bold text-oxford-blue': link.isCurrent }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <!-- Join button (goes to /join) -->
        <BaseButton>Join Now</BaseButton>

        <!-- Menu button: only visible on phones and tablets -->
        <button
          type="button"
          class="p-2 text-slate-body hover:text-oxford-blue lg:hidden"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          @click="toggleMenu"
        >
          <AppIcon :name="isMenuOpen ? 'close' : 'menu'" class="text-2xl" />
        </button>
      </div>
    </div>

    <!-- Mobile menu: shown only when isMenuOpen is true -->
    <nav
      v-show="isMenuOpen"
      id="mobile-menu"
      class="border-t border-border-subtle bg-white lg:hidden"
      aria-label="Mobile"
    >
      <div class="flex flex-col gap-3 px-6 py-4 text-sm font-medium">
        <!-- Close the menu after a link is clicked -->
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="py-1 hover:text-oxford-blue"
          :class="link.isCurrent ? 'font-bold text-oxford-blue' : 'text-slate-body'"
          @click="closeMenu"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
