// Everything the confirmation page needs to TALK TO THE BACKEND and to READ ITS ANSWER.
// The success state is shown ONLY when the backend says the payment succeeded.
// The full agreement between frontend and backend is written in docs/payment-confirmation-api.md.

// The backend address that confirms a payment. Change it here if your backend uses another path.
export const CONFIRMATION_ENDPOINT = '/api/enrollments/confirmation'

// A payment reference may contain letters, digits and the characters _ . : -  (4 to 128 characters)
const REFERENCE_PATTERN = /^[A-Za-z0-9_.:-]{4,128}$/

// Clean the reference that came from the page address. Returns '' when it is missing or looks wrong.
// IMPORTANT: the reference is only a LOOKUP KEY. It is NOT proof of payment.
export function cleanReference(rawValue) {
  // The address can contain the same name twice (an array). Use the first one.
  const value = Array.isArray(rawValue) ? rawValue[0] : rawValue
  // Only text is accepted
  const reference = typeof value === 'string' ? value.trim() : ''
  // Accept it only when it has the expected shape
  return REFERENCE_PATTERN.test(reference) ? reference : ''
}

// Ask the backend about a payment. It returns the answer of the backend (a plain object).
export async function fetchEnrollmentConfirmation(reference) {
  // $fetch is Nuxt's request function. It throws an error when the request fails or the status is not 2xx.
  return await $fetch(CONFIRMATION_ENDPOINT, {
    method: 'GET', // we only read data
    query: { reference }, // sent as ?reference=...
    headers: { Accept: 'application/json' }, // we expect JSON back
    cache: 'no-store', // never reuse an old answer: a payment status can change
    timeout: 15000, // give up after 15 seconds
    retry: 0, // do not retry by ourselves (the student can press "Check again")
  })
}

// Build the receipt details from the backend answer. Every missing value becomes '' (hidden later).
function buildSuccessDetails(response) {
  // The three parts of the answer. If a part is missing we use an empty object.
  const student = response.student ?? {}
  const membership = response.membership ?? {}
  const payment = response.payment ?? {}
  // Return ready-to-show text for each field
  return {
    reference: pickText(response.reference), // transaction reference
    studentName: pickText(student.fullName), // full name
    studentFirstName: pickText(student.firstName), // first name (used only for a friendly greeting)
    phoneNumber: pickText(student.phoneNumber), // registered phone number, with country code
    membershipName: pickText(membership.name), // for example "30 Days Membership"
    durationText: formatDuration(membership.durationDays), // for example "30 days"
    startsAtText: formatDate(membership.startsAt), // membership start date
    expiresAtText: formatDate(membership.expiresAt), // membership end date
    amountText: formatMoney(payment.amount, payment.currency), // for example "$49.00 USD"
    methodText: formatPaymentMethod(payment.method), // for example "Credit / Debit Card"
    paidAtText: formatDateTime(payment.paidAt), // payment date and time
  }
}

// Read the answer of the backend and decide which state the page must show.
// Returns { state, details }. Anything we do not understand becomes the 'error' state, NEVER success.
export function parseConfirmationResponse(response) {
  // The answer must be an object
  if (!response || typeof response !== 'object') return { state: 'error', details: null }
  // The backend tells us the payment status in the "status" field
  switch (response.status) {
    case 'succeeded':
      // The backend verified the payment: show the success page with the real data
      return { state: 'succeeded', details: buildSuccessDetails(response) }
    case 'pending':
      // Not confirmed yet
      return { state: 'pending', details: { reference: pickText(response.reference) } }
    case 'failed':
      // The payment did not go through
      return { state: 'failed', details: { reference: pickText(response.reference) } }
    case 'not_found':
      // The backend has no payment with this reference
      return { state: 'not_found', details: null }
    default:
      // Unknown or missing status: we cannot trust it
      return { state: 'error', details: null }
  }
}

// The receipt rows, in the order they are shown. "style" decides how the value looks.
const RECEIPT_FIELD_DEFINITIONS = [
  { key: 'studentName', label: 'Student Name', style: 'strong' },
  { key: 'phoneNumber', label: 'Registered WhatsApp', style: 'strong' },
  { key: 'membershipName', label: 'Membership', style: 'normal' },
  { key: 'durationText', label: 'Duration', style: 'normal' },
  { key: 'amountText', label: 'Amount Paid', style: 'strong' },
  { key: 'methodText', label: 'Payment Method', style: 'normal' },
  { key: 'reference', label: 'Transaction Reference', style: 'mono' },
  { key: 'paidAtText', label: 'Payment Date & Time', style: 'normal' },
  { key: 'startsAtText', label: 'Membership Starts', style: 'normal' },
  { key: 'expiresAtText', label: 'Membership Expires', style: 'normal' },
]

// Make the list of receipt rows to show. Rows without a value are left out (hidden).
export function buildReceiptFields(details) {
  // No details: no rows
  if (!details) return []
  // Keep only the rows that have a value, and add the value to each row
  return RECEIPT_FIELD_DEFINITIONS.filter((definition) => details[definition.key]).map((definition) => ({
    ...definition,
    value: details[definition.key],
  }))
}
