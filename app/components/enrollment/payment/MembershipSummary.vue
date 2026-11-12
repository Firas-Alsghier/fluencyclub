<script setup>
// Price texts (from app/utils/siteConfig.js, so they are easy to change)
const tuitionFeeText = formatPrice(MEMBERSHIP.priceAmount)

// The rows of the summary. Each row has a label and a value.
const summaryRows = [
  { label: 'Membership', value: '30 Days Full Access', isHighlighted: false },
  { label: 'Duration & Cohort', value: '30 Days • Daily Flexible Seminars', isHighlighted: false },
  { label: 'Access Guarantee', value: 'Zero Passwords • WhatsApp Live Sync', isHighlighted: true },
]
</script>

<template>
  <!-- Left card: what the student is buying -->
  <div class="flex flex-col justify-between rounded-xl border border-surface-mid bg-surface-low p-4 shadow-xs sm:p-6">
    <div class="mb-2 flex items-start justify-between gap-2">
      <div>
        <p class="text-xs font-bold uppercase tracking-wider text-deep-teal">Course Selection</p>
        <h3 class="mt-0.5 text-lg font-bold text-oxford-blue">English Speaking Club</h3>
      </div>
      <!-- Accent badge from DESIGN.md -->
      <span class="flex shrink-0 items-center gap-1 rounded-full border border-soft-amber bg-soft-amber/15 px-2.5 py-1 text-xs font-semibold text-[#7C4B00]">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-soft-amber motion-reduce:animate-none"></span>
        Awaiting Payment
      </span>
    </div>

    <dl class="space-y-2 border-y border-surface-mid py-3 text-sm">
      <div v-for="row in summaryRows" :key="row.label" class="flex items-center justify-between gap-3">
        <dt class="text-slate-body">{{ row.label }}</dt>
        <dd class="text-right font-medium" :class="row.isHighlighted ? 'text-deep-teal' : 'text-oxford-blue'">{{ row.value }}</dd>
      </div>
    </dl>

    <div class="flex items-baseline justify-between pt-3">
      <span class="text-sm font-semibold text-slate-body">Tuition Fee</span>
      <div class="text-right">
        <span class="text-2xl font-bold text-oxford-blue">{{ tuitionFeeText }}</span>
        <span class="block text-xs font-medium text-deep-teal">One-Time • No Recurring Auto-Billing</span>
      </div>
    </div>
  </div>
</template>
