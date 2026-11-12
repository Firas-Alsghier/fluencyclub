<script setup>
// Search engines must not index a payment confirmation page
useSeoMeta({
  title: 'Payment Confirmation – FluencyClub',
  robots: 'noindex, nofollow',
})

// The state and data come from the BACKEND check (see app/composables/useEnrollmentConfirmation.js)
const { confirmationState, confirmationDetails, receiptFields, displayReference, verifyPayment } = useEnrollmentConfirmation()

// true only when the backend confirmed the payment
const isPaymentConfirmed = computed(() => confirmationState.value === 'succeeded')

// The progress bar shows step 3 only after a confirmed payment. Before that, the student is still on step 2.
const progressStep = computed(() => (isPaymentConfirmed.value ? 3 : 2))

// The first name from the backend (empty if the backend did not send it)
const studentFirstName = computed(() => confirmationDetails.value?.studentFirstName ?? '')

// Texts for the trust cards and the footer (editable in app/utils/successPageContent.js)
const trustItems = SUCCESS_TRUST_ITEMS
const footerContent = SUCCESS_FOOTER

// When the state changes (for example from loading to confirmed), move the keyboard focus to the new heading
watch(confirmationState, async () => {
  // Wait until the new content is drawn
  await nextTick()
  // Focus the heading of the new content (helps keyboard and screen reader users)
  document.querySelector('[data-step-heading]')?.focus({ preventScroll: true })
})
</script>

<template>
  <div class="min-h-screen bg-off-white print:bg-white">
    <!-- print:hidden = these parts are not printed, so "Print Receipt" prints only the receipt -->
    <EnrollmentHeader class="print:hidden" />

    <!-- pt-20 leaves room for the fixed header -->
    <main class="pt-20">
      <div class="relative overflow-hidden pb-6 print:overflow-visible">
        <div class="relative mx-auto max-w-5xl px-4 pt-4 sm:px-6 lg:px-10 print:p-0">
          <EnrollmentIntro :current-step="progressStep" class="print:hidden" />

          <div class="mx-auto max-w-3xl space-y-8 print:max-w-none print:space-y-0">
            <!-- ONLY after the backend confirmed the payment -->
            <template v-if="isPaymentConfirmed">
              <EnrollmentSuccessCard :first-name="studentFirstName">
                <EnrollmentReceipt :fields="receiptFields" />
              </EnrollmentSuccessCard>
              <EnrollmentNextSteps class="print:hidden" />
              <EnrollmentTeacherWelcome :first-name="studentFirstName" class="print:hidden" />
              <EnrollmentSupportSection class="print:hidden" />

              <div class="text-center print:hidden">
                <NuxtLink
                  to="/"
                  class="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-oxford-blue px-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-oxford-light"
                >
                  <AppIcon name="home" class="text-[18px]" /> Back to Homepage
                </NuxtLink>
              </div>
            </template>

            <!-- In every other case: loading, pending, failed, not found, missing reference, or could not verify -->
            <EnrollmentConfirmationStatus
              v-else
              :state="confirmationState"
              :reference="displayReference"
              class="print:hidden"
              @retry="verifyPayment"
            />
          </div>

          <EnrollmentTrustBadges :items="trustItems" class="print:hidden" />
        </div>
      </div>
    </main>

    <EnrollmentFooter :notice="footerContent.notice" :badges="footerContent.badges" class="print:hidden" />
  </div>
</template>
