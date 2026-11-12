<script setup>
// A page can give its own notice and badges. If it gives none (null), the default ones below are used.
const props = defineProps({
  notice: { type: Object, default: null },
  badges: { type: Array, default: null },
})

// The current year, shown in the copyright line
const currentYear = new Date().getFullYear()

// The default notice on the left side (used by the checkout pages, which are a demo for now)
const defaultNotice = {
  icon: 'info',
  title: 'Demo Checkout',
  text: 'No real payments are processed yet. A secure payment provider will be connected before launch.',
}

// The default badges on the right side. NOTE: these claims come from the design. Make sure they are true before launch.
const defaultBadges = [
  { icon: 'shield_with_heart', label: '14-Day Cohort Guarantee' },
  { icon: 'school', label: 'CEFR-Certified Seminars' },
]

// The notice and badges to show: the ones from the page, or the default ones
const noticeContent = computed(() => props.notice ?? defaultNotice)
const securityBadges = computed(() => props.badges ?? defaultBadges)

// Legal links. These pages do not exist yet, so for now they go to the top of the home page.
const legalLinks = [
  { label: 'Security & Privacy', href: '/#hero' },
  { label: 'Terms of Enrollment', href: '/#hero' },
]
</script>

<template>
  <footer class="mt-10 w-full bg-surface-low">
    <div class="mx-auto max-w-7xl px-4 py-10 lg:px-10">
      <!-- Top row: security message and badges -->
      <div class="flex flex-col items-center justify-between gap-6 pb-6 md:flex-row">
        <div class="flex items-center gap-2">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-deep-teal/15 text-deep-teal">
            <AppIcon :name="noticeContent.icon" class="text-[18px]" />
          </span>
          <div>
            <span class="block text-sm font-semibold text-oxford-blue">{{ noticeContent.title }}</span>
            <span class="text-sm text-slate-body/85">{{ noticeContent.text }}</span>
          </div>
        </div>
        <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-body">
          <li v-for="badge in securityBadges" :key="badge.label" class="flex items-center gap-1">
            <AppIcon :name="badge.icon" class="text-[20px] text-deep-teal" />
            <span class="text-xs font-medium">{{ badge.label }}</span>
          </li>
        </ul>
      </div>

      <!-- Bottom row: copyright and legal links -->
      <div class="flex flex-col items-center justify-between gap-2 pt-6 sm:flex-row">
        <p class="text-center text-sm text-slate-body/85 sm:text-left">
          © {{ currentYear }} FluencyClub Speaking Club. Academic rigor meets conversational fluency. All rights reserved.
        </p>
        <ul class="flex items-center gap-4 text-xs font-medium text-slate-body">
          <li v-for="link in legalLinks" :key="link.label">
            <NuxtLink :to="link.href" class="transition-colors hover:text-oxford-blue">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
