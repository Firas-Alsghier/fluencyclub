<script setup>
// The step the student is on (1, 2 or 3). It is passed on to the progress bar.
defineProps({
  currentStep: { type: Number, default: 1 },
})

// Membership details (price text lives in app/utils/siteConfig.js, so it is easy to change)
const membership = MEMBERSHIP
</script>

<template>
  <!-- The top part shared by all enrollment pages: badge, title, short text and progress bar -->
  <div class="relative mb-6">
    <!-- Soft glow behind the heading (decoration only) -->
    <div
      class="pointer-events-none absolute -top-32 left-1/2 h-[360px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-linear-to-b from-surface-high/60 via-surface-mid/30 to-transparent blur-3xl"
      aria-hidden="true"
    ></div>

    <!-- "relative" keeps the text above the glow -->
    <div class="relative flex flex-col items-center text-center">
      <p class="mb-2 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 rounded-2xl bg-surface-high px-4 py-1 shadow-xs sm:rounded-full">
        <span class="h-2 w-2 animate-pulse rounded-full bg-deep-teal motion-reduce:animate-none"></span>
        <span class="text-xs font-medium uppercase tracking-wider text-deep-teal">FluencyClub Cohort Enrollment</span>
        <span class="hidden text-xs text-slate-400 sm:inline">•</span>
        <span class="text-xs font-semibold text-oxford-blue">30 Days Membership • {{ membership.priceLabel }} One-Time Access</span>
      </p>
      <h1 class="max-w-2xl text-[28px] font-bold leading-9 tracking-tight text-oxford-blue sm:text-4xl sm:leading-[44px]">
        Reserve Your Seat in the Live Speaking Club
      </h1>
      <p class="mt-1 max-w-xl text-base text-slate-body/85">
        High-intensity oral proficiency seminars. No apps, no passwords—just live, coached small-group conversation.
      </p>
      <EnrollmentProgress :current-step="currentStep" />
    </div>
  </div>
</template>
