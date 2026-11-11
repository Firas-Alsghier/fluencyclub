<script setup>
// The step the student is on now: 1, 2 or 3
const props = defineProps({
  currentStep: { type: Number, default: 1 },
})

// The three steps of the enrollment
const steps = [
  { number: 1, label: 'Personal Details' },
  { number: 2, label: 'Payment & Review' },
  { number: 3, label: 'Confirmation' },
]

// How full the progress bar is, from 0 to 100 percent
const progressPercent = computed(() => (props.currentStep / steps.length) * 100)

// Is a step finished ('done'), the current one ('current'), or still ahead ('upcoming')?
function getStepState(stepNumber) {
  // Steps before the current step are done
  if (stepNumber < props.currentStep) return 'done'
  // The step we are on now
  if (stepNumber === props.currentStep) return 'current'
  // Steps after the current step
  return 'upcoming'
}

// Tailwind classes for the small number circle, by state
const circleClasses = {
  done: 'bg-oxford-blue text-white',
  current: 'bg-oxford-blue text-white',
  upcoming: 'bg-surface-mid text-oxford-blue',
}

// Tailwind classes for the step name, by state
const labelClasses = {
  done: 'font-semibold text-oxford-blue',
  current: 'font-semibold text-oxford-blue',
  upcoming: 'font-medium text-slate-body',
}
</script>

<template>
  <nav aria-label="Enrollment progress" class="mt-6 w-full max-w-md">
    <!-- Step names. aria-current tells screen readers which step is the current one. -->
    <ol class="mb-1 flex items-center justify-between text-xs">
      <li
        v-for="step in steps"
        :key="step.number"
        class="flex items-center gap-1"
        :class="labelClasses[getStepState(step.number)]"
        :aria-current="getStepState(step.number) === 'current' ? 'step' : undefined"
      >
        <!-- Number circle (a check mark when the step is done) -->
        <span class="flex h-5 w-5 items-center justify-center rounded-full text-[10px]" :class="circleClasses[getStepState(step.number)]">
          <AppIcon v-if="getStepState(step.number) === 'done'" name="check" class="text-[14px]" />
          <template v-else>{{ step.number }}</template>
        </span>
        {{ step.label }}
      </li>
    </ol>

    <!-- Progress bar (decoration, the list above already tells the step) -->
    <div class="h-1.5 w-full overflow-hidden rounded-full bg-surface-mid" aria-hidden="true">
      <div
        class="h-full rounded-full bg-oxford-blue transition-all duration-500 ease-out"
        :style="{ width: `${progressPercent}%` }"
      ></div>
    </div>
  </nav>
</template>
