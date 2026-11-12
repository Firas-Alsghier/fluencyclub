<script setup>
// A small colored label for a status (for example "Completed")
defineProps({
  // The color tone: 'success' (teal), 'warning' (amber), 'danger' (red) or 'neutral' (grey-blue)
  tone: { type: String, default: 'neutral' },
})

// Tailwind classes for each tone (colors from DESIGN.md)
const toneClasses = {
  success: 'bg-deep-teal/10 text-deep-teal',
  warning: 'bg-soft-amber/15 text-amber-ink',
  danger: 'bg-error-soft text-on-error-soft',
  neutral: 'bg-surface-mid text-slate-body',
}
</script>

<template>
  <!-- The text of the badge comes from the parent (slot). A tone that does not exist falls back to neutral. -->
  <span
    class="inline-flex items-center whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.04em]"
    :class="toneClasses[tone] ?? toneClasses.neutral"
  >
    <slot />
  </span>
</template>
