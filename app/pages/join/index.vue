<script setup>
// onBeforeRouteLeave runs when the student leaves this page
import { onBeforeRouteLeave } from 'vue-router'

// Page title and description for the browser tab and search engines
useSeoMeta({
  title: 'Join the Speaking Club – FluencyClub',
  description: 'Reserve your seat in the FluencyClub live speaking club. 30 days of live, coached small-group conversation.',
})

// The enrollment store knows which step the student is on (1, 2 or 3)
const enrollmentStore = useEnrollmentStore()

// A link to the white card that holds the current step
const stepCardRef = ref(null)

// When the step changes, show the new step from its top and move the keyboard focus to its heading.
// (This is a watcher because it must react to a change made anywhere in the app.)
watch(
  () => enrollmentStore.currentStep,
  async () => {
    // Wait until the new step is drawn on the page
    await nextTick()
    // Scroll so the top of the card is visible (the id on the card keeps a gap under the fixed header)
    stepCardRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Move focus to the heading of the new step (helps keyboard and screen reader users)
    document.querySelector('[data-step-heading]')?.focus({ preventScroll: true })
  },
)

// After the demo confirmation, forget everything when the student leaves the page,
// so the next visit starts again at Step 1 with an empty form
onBeforeRouteLeave(() => {
  // Only reset when the student reached the confirmation step
  if (enrollmentStore.currentStep === 3) enrollmentStore.resetEnrollment()
})
</script>

<template>
  <div class="min-h-screen bg-off-white">
    <!-- print:hidden = these parts are not printed (so "Print" shows only the summary card) -->
    <EnrollmentHeader class="print:hidden" />

    <!-- pt-20 leaves room for the fixed header -->
    <main class="pt-20">
      <div class="relative overflow-hidden pb-6">
        <div class="relative mx-auto max-w-5xl px-4 pt-4 sm:px-6 lg:px-10">
          <!-- Glow, badge, title, short text and progress (shared with the confirmation page) -->
          <EnrollmentIntro :current-step="enrollmentStore.currentStep" class="print:hidden" />

          <EnrollmentWalkthroughVideo class="print:hidden" />

          <!-- Card that holds the current step. Only one step is shown at a time. -->
          <div
            id="enrollment-step-card"
            ref="stepCardRef"
            class="rounded-2xl border border-border-subtle bg-white p-4 shadow-card sm:p-10 print:border-0 print:p-0 print:shadow-none"
          >
            <EnrollmentPersonalDetailsForm v-if="enrollmentStore.currentStep === 1" />
            <EnrollmentPaymentStep v-else-if="enrollmentStore.currentStep === 2" />
            <EnrollmentConfirmationStep v-else />
          </div>

          <EnrollmentTrustBadges class="print:hidden" />
        </div>
      </div>
    </main>

    <EnrollmentFooter class="print:hidden" />
  </div>
</template>
