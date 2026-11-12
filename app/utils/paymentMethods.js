// The three payment methods shown in Step 2.
// Each method has: id, title, description (shown on the card), icon, and demoDescription (shown for the demo panel).

// The method that is selected when the student arrives at Step 2
export const DEFAULT_PAYMENT_METHOD_ID = 'card'

// The price text with cents, used inside the descriptions below
const priceText = formatPrice(MEMBERSHIP.totalDue)

// The list of methods (the order here is the order on the page)
export const PAYMENT_METHODS = [
  {
    id: 'card',
    title: 'Credit / Debit Card',
    description: 'Instant confirmation with Visa, Mastercard, American Express',
    icon: 'credit_card',
  },
  {
    id: 'bank',
    title: 'Instant Bank Transfer / SEPA',
    description: 'Direct transfer from your European or global bank',
    icon: 'account_balance',
    // Shown instead of a form, because this method has no card fields
    demoDescription: `In the live version you would be sent to your bank to approve the one-time ${priceText} payment. In this demo, nothing is sent anywhere.`,
  },
  {
    id: 'wallet',
    title: 'Digital Wallet',
    description: 'Fast 1-tap checkout via authorized digital wallet',
    icon: 'contactless',
    demoDescription: `In the live version you would approve the one-time ${priceText} payment in your digital wallet. In this demo, nothing is sent anywhere.`,
  },
]

// Find a method by its id (returns undefined if the id is not in the list)
export function findPaymentMethod(methodId) {
  // Look through the list for a matching id
  return PAYMENT_METHODS.find((method) => method.id === methodId)
}
