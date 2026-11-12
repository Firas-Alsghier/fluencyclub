// The checkout action of Step 2.
// Right now it runs the DEMO payment. To use real payments later, change simulateDemoPayment
// (see app/utils/demoPayment.js). This file can stay almost the same.

// The function other files call
export function useCheckout() {
  // The store that keeps the student's choices
  const enrollmentStore = useEnrollmentStore()

  // true while the checkout is running (used for the loading button)
  const isProcessing = ref(false)

  // A message to show if something goes wrong (empty when all is fine)
  const checkoutError = ref('')

  // Start the checkout
  async function submitCheckout() {
    // Ignore extra clicks while a checkout is already running
    if (isProcessing.value) return
    // Show the loading state and clear the old error
    isProcessing.value = true
    checkoutError.value = ''
    try {
      // Run the demo payment. We pass only the chosen method, never any card details.
      const result = await simulateDemoPayment(enrollmentStore.paymentMethod)
      // A DEMO result stays inside this page: save it and open the demo confirmation step
      if (result.isDemo) enrollmentStore.completeDemoCheckout(result)
      // A REAL payment result (it will have a reference) opens the confirmation page.
      // That page asks the backend to verify the payment, so we only pass the reference, never "success".
      else await navigateTo({ path: SUCCESS_PAGE_PATH, query: { reference: result.reference } })
    } catch (error) {
      // Show a friendly message (a real payment could fail here)
      checkoutError.value = 'Something went wrong. Please try again.'
    } finally {
      // Whatever happened, the loading state is over
      isProcessing.value = false
    }
  }

  // Share these with the component
  return { isProcessing, checkoutError, submitCheckout }
}
