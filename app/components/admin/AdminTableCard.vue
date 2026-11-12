<script setup>
// The white card that wraps a table: a header (title, optional badge, "View All" link) and a scrollable body
defineProps({
  // Card title, for example "Recent Registrations"
  title: { type: String, required: true },
  // Small text under the title (optional)
  subtitle: { type: String, default: '' },
  // Small colored badge next to the title (optional), for example "3 New Today"
  badge: { type: String, default: '' },
  // Where the "View All" link goes
  viewAllTo: { type: String, required: true },
})

// A unique id, so the section can point to its own title (helps screen readers)
const headingId = useId()
</script>

<template>
  <section :aria-labelledby="headingId" class="overflow-hidden rounded-xl border border-border-subtle bg-white shadow-admin">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border-subtle p-6">
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h2 :id="headingId" class="font-sans text-base font-semibold leading-6 tracking-[-0.01em] text-oxford-blue">{{ title }}</h2>
          <span v-if="badge" class="rounded-full bg-deep-teal/10 px-2.5 py-0.5 text-[11px] font-bold leading-[14px] tracking-[0.04em] text-deep-teal">
            {{ badge }}
          </span>
        </div>
        <p v-if="subtitle" class="text-[13px] leading-[18px] text-slate-body/80">{{ subtitle }}</p>
      </div>
      <NuxtLink :to="viewAllTo" class="flex items-center gap-0.5 text-xs font-bold tracking-[0.03em] text-deep-teal transition-colors hover:text-deep-teal/80">
        <span>View All</span>
        <AppIcon name="arrow_forward" class="text-[16px]" />
      </NuxtLink>
    </div>

    <!-- On small screens the table scrolls sideways inside the card instead of being squeezed -->
    <div class="overflow-x-auto">
      <slot />
    </div>
  </section>
</template>
