<script setup>
// One summary card. "stat" is an object like the ones in app/utils/adminSampleData.js:
// { label, value, valueClass, icon, iconClasses, footer: { type: 'trend' | 'progress' | 'action', ... } }
const props = defineProps({
  stat: { type: Object, required: true },
})

// Keep the progress bar between 0 and 100 percent, even if the data is wrong
const progressPercent = computed(() => {
  // Read the number from the footer (0 if there is none)
  const percent = Number(props.stat.footer?.percent ?? 0)
  // Limit it to the 0-100 range
  return Math.min(100, Math.max(0, percent))
})
</script>

<template>
  <article class="flex flex-col justify-between rounded-xl border border-border-subtle bg-white p-6 shadow-admin transition-shadow hover:shadow-admin-hover">
    <!-- Top: label, big number and icon -->
    <div class="flex items-start justify-between gap-3">
      <div>
        <h3 class="text-xs font-semibold uppercase leading-4 tracking-wider text-slate-body">{{ stat.label }}</h3>
        <p class="mt-1 font-sans text-[28px] font-bold leading-[34px] tracking-[-0.02em]" :class="stat.valueClass">{{ stat.value }}</p>
      </div>
      <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" :class="stat.iconClasses">
        <AppIcon :name="stat.icon" class="text-[24px]" />
      </span>
    </div>

    <!-- Bottom row. Which one is shown depends on footer.type -->
    <div class="mt-4 border-t border-border-subtle pt-2">
      <!-- A green change badge and a short caption -->
      <div v-if="stat.footer.type === 'trend'" class="flex items-center justify-between gap-2">
        <span class="inline-flex shrink-0 items-center gap-1 rounded-full bg-deep-teal/10 px-2 py-0.5 text-[11px] font-bold leading-[14px] tracking-[0.04em] text-deep-teal">
          <AppIcon name="trending_up" class="text-[14px]" /> {{ stat.footer.trend }}
        </span>
        <span class="truncate text-[13px] text-slate-body/80">{{ stat.footer.caption }}</span>
      </div>

      <!-- A label, a rate and a progress bar -->
      <div v-else-if="stat.footer.type === 'progress'" class="space-y-1.5">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[13px] text-slate-body/80">{{ stat.footer.label }}</span>
          <span class="text-[11px] font-semibold tracking-[0.04em] text-deep-teal">{{ stat.footer.rateText }}</span>
        </div>
        <div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-mid">
          <div class="h-full rounded-full bg-deep-teal" :style="{ width: `${progressPercent}%` }"></div>
        </div>
      </div>

      <!-- An amber badge and a small action button (the button does nothing until the feature exists) -->
      <div v-else-if="stat.footer.type === 'action'" class="flex items-center justify-between gap-2">
        <span class="inline-flex items-center rounded-full bg-soft-amber/20 px-2 py-0.5 text-[11px] font-bold leading-[14px] tracking-[0.04em] text-amber-ink">
          {{ stat.footer.chip }}
        </span>
        <button type="button" class="text-[11px] font-bold tracking-[0.04em] text-deep-teal hover:underline">
          {{ stat.footer.actionLabel }} →
        </button>
      </div>
    </div>
  </article>
</template>
