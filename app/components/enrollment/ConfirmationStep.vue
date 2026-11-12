<script setup>
// The store keeps the student's data and the demo result
const enrollmentStore = useEnrollmentStore()

// The student's details from Step 1
const student = computed(() => enrollmentStore.studentData)

// The result of the demo checkout (it says clearly that it is a demo)
const demoResult = computed(() => enrollmentStore.demoCheckoutResult)

// The title of the payment method the student chose (for example "Credit / Debit Card")
const paymentMethodTitle = computed(() => findPaymentMethod(demoResult.value?.paymentMethodId)?.title ?? '')

// The amount that WOULD be charged, as text (nothing is charged in the demo)
const amountText = formatPrice(MEMBERSHIP.totalDue)

// The WhatsApp link (a placeholder from app/utils/siteConfig.js)
const teacherContactLink = CONTACT_LINKS.whatsapp

// What would happen after a REAL enrollment. This is the plan, not something that already happened.
const nextSteps = [
  {
    number: 1,
    title: 'Coach notification',
    text: 'In the live version, your details will be shared with the seminar director after payment.',
  },
  {
    number: 2,
    title: 'Direct WhatsApp contact',
    text: 'Your coach would message you to say hello and confirm your preferred daily session time.',
  },
  {
    number: 3,
    title: 'First speaking session',
    text: 'You would join a small group (maximum 6 students) for guided conversation practice.',
  },
]

// Open the browser print window (the print layout hides everything except this card)
function printSummary() {
  window.print()
}
</script>

<template>
  <section v-if="student && demoResult" aria-labelledby="confirmation-heading" class="mx-auto flex max-w-xl flex-col items-center py-2 text-center">
    <!-- Success-style icon -->
    <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-deep-teal/15 text-deep-teal shadow-lg">
      <AppIcon name="check_circle" class="text-[44px]" />
    </div>

    <!-- Clear demo label -->
    <p class="mb-2 inline-flex items-center gap-1 rounded-full border border-soft-amber bg-soft-amber/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#7C4B00]">
      <AppIcon name="info" class="text-[14px]" /> Demo only
    </p>
    <h2 id="confirmation-heading" data-step-heading tabindex="-1" class="text-[28px] font-bold leading-9 tracking-tight text-oxford-blue focus:outline-none sm:text-4xl sm:leading-[44px]">
      Demo Checkout Complete
    </h2>
    <p class="mt-1 text-base text-slate-body/85">
      This was a demonstration. No payment was processed, nothing was saved to a server, and no enrollment was created.
    </p>

    <!-- Summary card -->
    <div class="my-6 w-full rounded-xl border border-surface-mid bg-surface-low p-4 text-left shadow-xs sm:p-6">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span class="block text-xs font-medium uppercase tracking-wider text-slate-body">Order Reference</span>
          <span class="font-mono text-lg font-bold text-oxford-blue">{{ demoResult.orderReference }}</span>
          <span class="block text-xs text-slate-body">Placeholder only. No real order exists.</span>
        </div>
        <span class="flex items-center gap-1 rounded-full border border-soft-amber bg-soft-amber/15 px-3 py-1 text-xs font-semibold text-[#7C4B00]">
          <AppIcon name="info" class="text-[16px]" />
          <span>Demo • Not charged</span>
        </span>
      </div>

      <dl class="grid grid-cols-1 gap-3 border-t border-surface-mid pt-3 text-sm sm:grid-cols-2">
        <div>
          <dt class="text-slate-body">Student:</dt>
          <dd class="font-semibold text-oxford-blue">{{ student.fullName }}</dd>
        </div>
        <div>
          <dt class="text-slate-body">WhatsApp Contact:</dt>
          <dd class="font-semibold text-oxford-blue">{{ student.displayPhoneNumber }}</dd>
        </div>
        <div>
          <dt class="text-slate-body">Membership Plan:</dt>
          <dd class="font-semibold text-oxford-blue">30 Days Live Speaking Pass</dd>
        </div>
        <div>
          <dt class="text-slate-body">Payment Method (demo):</dt>
          <dd class="font-semibold text-oxford-blue">{{ paymentMethodTitle }}</dd>
        </div>
        <div>
          <dt class="text-slate-body">Amount (not charged):</dt>
          <dd class="font-semibold text-oxford-blue">{{ amountText }}</dd>
        </div>
        <div>
          <dt class="text-slate-body">Placement Cohort:</dt>
          <dd class="font-semibold text-deep-teal">To be confirmed by your teacher</dd>
        </div>
      </dl>

      <!-- What happens next (the plan for a real enrollment) -->
      <div class="mt-4 border-t border-surface-mid pt-4">
        <p class="text-sm font-semibold text-oxford-blue">What Happens Next</p>
        <p class="mb-3 text-xs text-slate-body">This is the planned process. None of it is active in this demo.</p>
        <ol class="space-y-3">
          <li v-for="step in nextSteps" :key="step.number" class="flex items-start gap-3">
            <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-oxford-blue text-xs font-semibold text-white">
              {{ step.number }}
            </span>
            <div>
              <span class="block text-sm font-semibold text-oxford-blue">{{ step.title }}</span>
              <span class="text-sm text-slate-body/85">{{ step.text }}</span>
            </div>
          </li>
        </ol>
      </div>
    </div>

    <!-- Buttons (hidden when printing) -->
    <div class="flex w-full flex-col items-center gap-4 sm:flex-row print:hidden">
      <NuxtLink
        to="/"
        class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-surface-mid text-sm font-semibold text-oxford-blue transition-colors hover:bg-surface-high sm:flex-1"
      >
        <AppIcon name="home" class="text-[18px]" />
        <span>Return to Homepage</span>
      </NuxtLink>
      <a
        :href="teacherContactLink"
        target="_blank"
        rel="noopener noreferrer"
        class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-deep-teal text-sm font-semibold text-white shadow-md transition-colors hover:bg-deep-teal/90 sm:flex-1"
      >
        <AppIcon name="chat" class="text-[18px]" />
        <span>Contact Teacher</span>
      </a>
    </div>

    <button
      type="button"
      class="mt-4 flex items-center gap-1 text-xs font-medium text-slate-body transition-colors hover:text-oxford-blue print:hidden"
      @click="printSummary"
    >
      <AppIcon name="print" class="text-[16px]" />
      <span>Print Demo Summary</span>
    </button>
  </section>
</template>
