<script setup>
// The receipt rows. Each row is { key, label, value, style }. Rows without a value are never sent here.
defineProps({
  fields: { type: Array, required: true },
})

// Tailwind classes for the value of a row, by style
const valueClasses = {
  strong: 'text-lg font-semibold text-oxford-blue break-words',
  normal: 'text-base font-medium text-oxford-blue',
  mono: 'font-mono text-sm text-slate-body break-all',
}

// Open the browser print window. The page hides everything except this receipt when printing.
function printReceipt() {
  window.print()
}
</script>

<template>
  <div class="rounded-xl bg-surface-low p-4 text-left shadow-xs sm:p-6 print:rounded-none print:border print:border-slate-300 print:bg-white print:shadow-none">
    <!-- Only visible on paper: the name of the club -->
    <p class="mb-3 hidden border-b border-slate-300 pb-3 text-xl font-bold text-oxford-blue print:block">
      FluencyClub Speaking Club
    </p>

    <!-- Title -->
    <div class="mb-4 flex items-center justify-between gap-2 border-b border-surface-high pb-3">
      <div class="flex items-center gap-2">
        <AppIcon name="receipt_long" class="text-[20px] text-oxford-blue" />
        <h3 class="text-xl font-semibold text-oxford-blue">Enrollment Receipt</h3>
      </div>
      <span class="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-deep-teal shadow-xs print:shadow-none">
        <AppIcon name="verified" class="text-[14px]" /> Payment Confirmed
      </span>
    </div>

    <!-- The rows. Rows without data are not here at all. -->
    <dl v-if="fields.length" class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
      <div v-for="field in fields" :key="field.key">
        <dt class="text-xs font-medium uppercase tracking-wider text-slate-body">{{ field.label }}</dt>
        <dd class="mt-0.5" :class="valueClasses[field.style]">{{ field.value }}</dd>
      </div>
    </dl>
    <p v-else class="text-sm text-slate-body">Receipt details are not available right now.</p>

    <!-- Print button (not printed) -->
    <div class="mt-4 flex justify-end border-t border-surface-high pt-3 print:hidden">
      <button
        type="button"
        class="flex items-center gap-1 text-sm font-semibold text-deep-teal hover:underline"
        @click="printReceipt"
      >
        <AppIcon name="print" class="text-[16px]" /> Print Receipt
      </button>
    </div>
  </div>
</template>
