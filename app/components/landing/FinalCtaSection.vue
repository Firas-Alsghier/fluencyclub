<script setup>
// Three small trust notes under the button. iconClasses = color of the icon.
const trustNotes = [
  { icon: 'verified', text: '3-day satisfaction guarantee', iconClasses: 'text-deep-teal-light' },
  { icon: 'lock_open', text: 'No password required', iconClasses: 'text-deep-teal-light' },
  { icon: 'bolt', text: 'Personal teacher onboarding', iconClasses: 'text-soft-amber' },
]
</script>

<template>
  <!-- FINAL CALL TO ACTION: last chance to click Join Now -->
  <LandingSectionContainer id="cta" aria-labelledby="cta-heading" background="offWhite" :bordered="false">
    <div class="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-oxford-light bg-oxford-blue p-10 text-center text-white shadow-2xl sm:p-16">
      <!-- Soft colored glows in the corners (decoration only) -->
      <div class="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-deep-teal/20 blur-2xl" aria-hidden="true"></div>
      <div class="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-soft-amber/15 blur-2xl" aria-hidden="true"></div>

      <span class="relative rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-soft-amber">
        Start Your Speaking Habit Today
      </span>
      <h2 id="cta-heading" class="relative max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Ready to Finally Speak English Without Hesitation?
      </h2>
      <p class="relative max-w-xl text-base text-slate-200 sm:text-lg">
        Join hundreds of learners speaking English with ease every single day. Complete your student enrollment in 60 seconds and start practicing.
      </p>

      <div class="relative pt-2">
        <BaseButton variant="light" size="lg">Join Now</BaseButton>
      </div>

      <ul class="relative flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-slate-300">
        <li v-for="note in trustNotes" :key="note.text" class="flex items-center gap-1.5">
          <AppIcon :name="note.icon" class="text-[18px]" :class="note.iconClasses" />
          {{ note.text }}
        </li>
      </ul>
    </div>
  </LandingSectionContainer>
</template>
