<script setup>
// The store keeps the student's data and the chosen payment method
const enrollmentStore = useEnrollmentStore()

// The student's details from Step 1 (null if they are missing, which should not happen)
const student = computed(() => enrollmentStore.studentData)

// Card form values and helpers. They stay in this component only and are NEVER put in the store.
const { cardForm, cardErrors, cardBrand, isCardFormValid, handleCardFieldInput, handleCardFieldBlur } = useCardForm()

// The demo checkout: a loading flag, an error message, and the function that starts it
const { isProcessing, checkoutError, submitCheckout } = useCheckout()

// true when the student ticked the Terms checkbox (always starts unticked)
const hasAcceptedTerms = ref(false)

// The full info of the chosen method (title, demo description, ...)
const selectedMethod = computed(() => findPaymentMethod(enrollmentStore.paymentMethod))

// true when the card method is chosen (then the card form is shown and must be valid)
const isCardMethod = computed(() => enrollmentStore.paymentMethod === 'card')

// A list of things the student still has to do before paying
const requirementsLeft = computed(() => {
  // Start with an empty list
  const requirements = []
  // The card details must be valid when paying by card
  if (isCardMethod.value && !isCardFormValid.value) requirements.push('complete the card details')
  // The terms must be accepted
  if (!hasAcceptedTerms.value) requirements.push('accept the Terms of Enrollment')
  // Give the list back
  return requirements
})

// The payment button is enabled only when nothing is left to do and no checkout is running
const canSubmit = computed(() => requirementsLeft.value.length === 0 && !isProcessing.value)

// A short sentence that tells the student why the button is disabled
const helperMessage = computed(() =>
  requirementsLeft.value.length ? `To continue, please ${requirementsLeft.value.join(' and ')}.` : '',
)

// The text on the payment button, for example "Complete Payment ($49.00)"
const payButtonLabel = `Complete Payment (${formatPrice(MEMBERSHIP.totalDue)})`

// Called when the form is submitted (button click or Enter key)
function handleSubmit() {
  // Safety check: do nothing if something is still missing
  if (!canSubmit.value) return
  // Start the demo checkout
  submitCheckout()
}

// Called when the student clicks "Edit Details" or "Back": open Step 1 (their details stay saved)
function goBackToPersonalDetails() {
  enrollmentStore.goToStep(1)
}
</script>

<template>
  <section v-if="student" aria-labelledby="payment-heading">
    <!-- Step header -->
    <div class="mb-6 flex flex-col justify-between gap-2 border-b border-surface-mid pb-4 sm:flex-row sm:items-center">
      <div>
        <p class="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-deep-teal">
          <AppIcon name="lock" class="text-[16px]" />
          <span>Step 2 of 2 • Demo Checkout</span>
        </p>
        <h2 id="payment-heading" data-step-heading tabindex="-1" class="text-[28px] font-bold leading-9 tracking-tight text-oxford-blue focus:outline-none sm:text-4xl sm:leading-[44px]">
          Complete Your Enrollment
        </h2>
        <p class="mt-1 text-base text-slate-body/85">
          You're almost there! Review your membership details and complete your payment.
        </p>
      </div>
      <span class="flex items-center gap-1 self-start rounded-full bg-deep-teal/15 px-3 py-1 text-xs font-semibold text-deep-teal sm:self-auto">
        <AppIcon name="verified" class="text-[14px]" /> Guaranteed Seat Placement
      </span>
    </div>

    <!-- Demo notice (always visible in this step) -->
    <div class="mb-6 flex items-start gap-3 rounded-lg border border-soft-amber bg-soft-amber/15 p-3 text-[#7C4B00]" role="note">
      <AppIcon name="info" class="mt-0.5 shrink-0 text-[20px]" />
      <p class="text-sm">
        <strong class="font-semibold">This is a demonstration.</strong>
        No real payment is processed and nothing is saved to a server.
      </p>
    </div>

    <!-- Membership summary and student summary, side by side on big screens -->
    <div class="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <EnrollmentPaymentMembershipSummary />
      <EnrollmentPaymentStudentSummary :student="student" @edit="goBackToPersonalDetails" />
    </div>

    <!-- Payment method choice. The choice is kept in the store, so it is remembered when the student goes back. -->
    <EnrollmentPaymentMethodSelector
      :model-value="enrollmentStore.paymentMethod"
      @update:model-value="enrollmentStore.setPaymentMethod"
    />

    <!-- novalidate = we show our own messages. @submit.prevent = the page does not reload. -->
    <form novalidate @submit.prevent="handleSubmit">
      <!-- Card method: the card form -->
      <EnrollmentPaymentCardForm
        v-if="isCardMethod"
        v-model="cardForm"
        :errors="cardErrors"
        :brand="cardBrand"
        class="mb-6"
        @field-input="handleCardFieldInput"
        @field-blur="handleCardFieldBlur"
      />

      <!-- Bank or wallet method: no form, only an explanation of the demo -->
      <div v-else class="mb-6 rounded-xl border border-surface-mid bg-surface-low p-6 text-center">
        <span class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-surface-mid text-oxford-blue">
          <AppIcon :name="selectedMethod.icon" class="text-[32px]" />
        </span>
        <h4 class="text-lg font-bold text-oxford-blue">{{ selectedMethod.title }}</h4>
        <p class="mx-auto mt-1 max-w-md text-sm text-slate-body/85">{{ selectedMethod.demoDescription }}</p>
      </div>

      <EnrollmentPaymentOrderBreakdown v-model="hasAcceptedTerms" class="mb-6" />

      <!-- Error message (only if the checkout fails) -->
      <p v-if="checkoutError" role="alert" class="mb-4 flex items-center gap-1 text-sm font-medium text-error">
        <AppIcon name="error" filled class="text-[16px]" /> {{ checkoutError }}
      </p>

      <!-- Action buttons -->
      <div class="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <button
          type="button"
          :disabled="isProcessing"
          class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-surface-low px-5 text-sm font-semibold text-oxford-blue transition-colors hover:bg-surface-mid disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          @click="goBackToPersonalDetails"
        >
          <AppIcon name="arrow_back" class="text-[18px]" />
          <span>Back to Personal Information</span>
        </button>

        <button
          type="submit"
          :disabled="!canSubmit"
          aria-describedby="checkout-helper"
          class="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-oxford-blue px-8 text-sm font-semibold text-white shadow-md transition-colors hover:bg-oxford-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <span>{{ isProcessing ? 'Running demo checkout…' : payButtonLabel }}</span>
          <!-- Spinner while running, arrow otherwise -->
          <AppIcon v-if="isProcessing" name="progress_activity" class="animate-spin text-[18px] motion-reduce:animate-none" />
          <AppIcon v-else name="arrow_forward" class="text-[18px] transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <!-- Tells the student why the payment button is disabled -->
      <p id="checkout-helper" class="mt-3 text-center text-xs text-slate-body sm:text-right" aria-live="polite">
        {{ helperMessage }}
      </p>
    </form>

    <!-- Small facts under the buttons -->
    <p class="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-body">
      <span class="flex items-center gap-1"><AppIcon name="info" class="text-[16px] text-deep-teal" /> Demo checkout</span>
      <span class="hidden sm:inline" aria-hidden="true">•</span>
      <span class="flex items-center gap-1"><AppIcon name="lock_clock" class="text-[16px] text-deep-teal" /> One-time fee, no recurring billing</span>
    </p>
  </section>
</template>
