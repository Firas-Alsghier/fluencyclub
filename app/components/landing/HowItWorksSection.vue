<script setup>
// The three steps.
// number = big number, badge = small label, badgeClasses = label colors, title and description = card text
const steps = [
  {
    number: '01',
    badge: 'Stage 1',
    badgeClasses: 'bg-oxford-blue text-white',
    title: 'Quick Student Enrollment',
    description: 'Complete your student profile with your name, phone number, country, and age. No passwords to remember or cumbersome email verification required.',
  },
  {
    number: '02',
    badge: 'Stage 2',
    badgeClasses: 'bg-deep-teal text-white',
    title: 'Secure One-Time Payment',
    description: 'Simple and protected checkout for your 30-Day membership pass with instant confirmation. Zero recurring subscriptions, hidden fees, or auto-renewals.',
  },
  {
    number: '03',
    badge: 'Personal Contact',
    badgeClasses: 'bg-soft-amber text-oxford-blue',
    title: 'Teacher Personal Contact',
    description: 'Your dedicated mentor personally contacts you via your phone number with upcoming session schedules, level placement, and direct speaking room links.',
  },
]
</script>

<template>
  <!-- HOW IT WORKS: the three steps from sign-up to the first session -->
  <LandingSectionContainer id="how-it-works" aria-labelledby="how-heading">
    <LandingSectionHeader
      heading-id="how-heading"
      eyebrow="Seamless Workflow"
      title="How It Works: Simple & Personal"
      description="No mandatory accounts, cumbersome passwords, or generic automated robot links. A personalized experience from sign-up to your first live conversation."
    />

    <!-- An ordered list, because the steps happen in order -->
    <ol class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <li
        v-for="step in steps"
        :key="step.number"
        class="flex flex-col items-start gap-4 rounded-2xl border border-border-subtle bg-off-white p-8"
      >
        <div class="flex w-full items-center justify-between">
          <span class="text-4xl font-extrabold leading-none text-oxford-blue/30">{{ step.number }}</span>
          <span class="rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider" :class="step.badgeClasses">
            {{ step.badge }}
          </span>
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="text-xl font-bold text-oxford-blue">{{ step.title }}</h3>
          <p class="text-sm leading-relaxed text-slate-body/85">{{ step.description }}</p>
        </div>
      </li>
    </ol>
  </LandingSectionContainer>
</template>
