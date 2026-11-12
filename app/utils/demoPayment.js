// THE DEMO PAYMENT (frontend only).
// This is the ONLY place that pretends to pay. No money moves, nothing is sent, nothing is saved.
//
// TO ADD REAL PAYMENTS LATER: replace the inside of simulateDemoPayment with a call to your server
// (for example $fetch('/api/payments', ...)). Keep the same inputs and the same kind of result,
// and the rest of the checkout (button, loading state, navigation) will keep working.

// How long the fake "processing" takes, in milliseconds
const DEMO_DELAY_MS = 1200

// A clearly fake order reference. It is NOT a real order number.
export const DEMO_ORDER_REFERENCE = 'DEMO-PLACEHOLDER'

// Pretend to process a payment. "paymentMethodId" is only the chosen method ('card', 'bank' or 'wallet').
// Card details are NEVER passed here.
export async function simulateDemoPayment(paymentMethodId) {
  // Wait a little, so the loading state can be seen (like a real payment would take time)
  await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY_MS))
  // Return a result that says clearly it is a demo
  return {
    isDemo: true, // always true for this fake payment
    orderReference: DEMO_ORDER_REFERENCE, // placeholder text, not a real order
    paymentMethodId, // which method the student picked
    amount: MEMBERSHIP.totalDue, // the amount that WOULD be charged (nothing is charged)
  }
}
