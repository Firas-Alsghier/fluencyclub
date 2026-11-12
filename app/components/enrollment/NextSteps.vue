<script setup>
// The three cards (editable in app/utils/successPageContent.js)
const nextSteps = NEXT_STEPS
</script>

<template>
  <!-- WHAT'S NEXT: the three things that happen after a confirmed payment -->
  <section aria-labelledby="next-steps-heading">
    <div class="mx-auto mb-4 max-w-xl text-center">
      <span class="text-xs font-bold uppercase tracking-widest text-deep-teal">Onboarding Process</span>
      <h2 id="next-steps-heading" class="mt-1 text-2xl font-semibold text-oxford-blue">What's Next?</h2>
      <p class="text-base text-slate-body/85">Here is how your live speaking club journey begins:</p>
    </div>

    <!-- An ordered list, because the steps happen in order -->
    <ol class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <li
        v-for="step in nextSteps"
        :key="step.number"
        class="flex flex-col justify-between rounded-xl border border-border-subtle bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
      >
        <div>
          <div class="mb-4 flex items-center justify-between gap-2">
            <span class="flex h-12 w-12 items-center justify-center rounded-xl" :class="step.iconClasses">
              <AppIcon :name="step.icon" class="text-[26px]" />
            </span>
            <span class="rounded bg-surface-high px-2 py-1 text-xs font-semibold text-oxford-blue">{{ step.chip }}</span>
          </div>
          <span class="text-xs font-bold uppercase tracking-wider text-deep-teal">Step {{ step.number }}</span>
          <h3 class="mt-1 text-lg font-semibold text-oxford-blue">{{ step.title }}</h3>
          <p class="mt-1 text-sm text-slate-body/85">{{ step.description }}</p>
        </div>
        <p class="mt-4 flex items-center gap-2 pt-2 text-[13px] text-slate-body">
          <AppIcon :name="step.noteIcon" class="text-[18px] text-deep-teal" />
          <span>{{ step.note }}</span>
        </p>
      </li>
    </ol>
  </section>
</template>
