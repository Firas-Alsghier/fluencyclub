// Checks with the BACKEND whether a payment really succeeded, and keeps the result for the confirmation page.
// The page shows success ONLY when the state is 'succeeded'. That state can come ONLY from the backend answer.
// We never use the page address, the Pinia store, or local storage as proof of payment.

// The function other files call
export function useEnrollmentConfirmation() {
  // The current page address (we read the payment reference from it)
  const route = useRoute()

  // The enrollment store (we clear the unfinished enrollment after a verified payment)
  const enrollmentStore = useEnrollmentStore()

  // The reference from the address, cleaned. It is '' when missing or wrong. It is only a lookup key.
  const reference = computed(() => cleanReference(route.query.reference))

  // What the page should show now: 'loading', 'succeeded', 'pending', 'failed', 'not_found', 'invalid_reference' or 'error'
  const confirmationState = ref('loading')

  // The details from the backend (receipt data). It stays null until a payment is confirmed or known.
  const confirmationDetails = ref(null)

  // true while a check is running (stops two checks from running at the same time)
  const isVerifying = ref(false)

  // The receipt rows to show. They exist ONLY after a verified payment. Rows without a value are left out.
  const receiptFields = computed(() =>
    confirmationState.value === 'succeeded' ? buildReceiptFields(confirmationDetails.value) : [],
  )

  // The reference to show in messages. Only when it looks valid (so the page never repeats strange text).
  const displayReference = computed(() => confirmationDetails.value?.reference || reference.value)

  // Ask the backend about the payment and update the state
  async function verifyPayment() {
    // Ignore the call if a check is already running
    if (isVerifying.value) return
    // Start: show the loading state and forget old details
    isVerifying.value = true
    confirmationState.value = 'loading'
    confirmationDetails.value = null
    // Without a valid reference there is nothing to verify, so nothing can be confirmed
    if (!reference.value) {
      confirmationState.value = 'invalid_reference'
      isVerifying.value = false
      return
    }
    try {
      // Ask the backend (see app/utils/enrollmentApi.js)
      const response = await fetchEnrollmentConfirmation(reference.value)
      // Read the answer and decide the state
      const result = parseConfirmationResponse(response)
      // Remember the state and the details
      confirmationState.value = result.state
      confirmationDetails.value = result.details
      // After a VERIFIED payment the unfinished enrollment is not needed any more, so clear it
      if (result.state === 'succeeded') enrollmentStore.resetEnrollment()
    } catch (error) {
      // The request failed (network problem, server error, timeout...). We cannot confirm anything.
      confirmationState.value = 'error'
    } finally {
      // The check is over, whatever the result
      isVerifying.value = false
    }
  }

  // Start the check as soon as the page is shown in the browser (not on the server)
  onMounted(verifyPayment)

  // Share these with the page
  return { confirmationState, confirmationDetails, receiptFields, displayReference, verifyPayment }
}
