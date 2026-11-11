<script setup>
// The four small trust cards. Each has: icon (icon name), title and text.
// NOTE: these claims come from the design. Make sure they are true before launch.
const trustBadges = [
  { icon: 'lock_clock', title: '30 Days Full Access', text: 'No recurring auto-charges' },
  { icon: 'groups_2', title: 'Max 6 Students', text: 'Guaranteed speaking time' },
  { icon: 'sentiment_very_satisfied', title: 'Cohort Guarantee', text: '14 days refund policy' },
  { icon: 'school', title: 'Certified Mentors', text: 'Native CELTA/Delta hosts' },
]
</script>

<template>
  <!-- 2 cards per row on phones, 4 on bigger screens -->
  <ul class="mt-6 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
    <li
      v-for="badge in trustBadges"
      :key="badge.title"
      class="flex flex-col items-center rounded-lg border border-border-subtle bg-white p-3 shadow-card"
    >
      <AppIcon :name="badge.icon" class="mb-1 text-[24px] text-deep-teal" />
      <span class="text-sm font-semibold text-oxford-blue">{{ badge.title }}</span>
      <span class="text-xs text-slate-body/80">{{ badge.text }}</span>
    </li>
  </ul>
</template>
