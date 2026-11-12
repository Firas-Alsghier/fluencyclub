// Helpers that turn raw values from the backend into text for people to read.
// If a value is missing or invalid, they return '' so the page can HIDE that field (we never invent data).

// Return clean text, or '' if the value is not a non-empty text
export function pickText(value) {
  // Only real text counts. Numbers, objects, null and undefined become ''.
  return typeof value === 'string' ? value.trim() : ''
}

// Turn an amount and a currency code into text, for example (49, 'usd') becomes "$49.00 USD"
export function formatMoney(amount, currency) {
  // The amount must be a real number that is not negative
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 0) return ''
  // The currency code, in capital letters
  const currencyCode = pickText(currency).toUpperCase()
  // A currency code has exactly 3 letters. Without it we do not show an amount at all.
  if (!/^[A-Z]{3}$/.test(currencyCode)) return ''
  try {
    // Let the browser add the right symbol and decimals
    const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount)
    // Also show the code, so there is no doubt about the currency
    return `${money} ${currencyCode}`
  } catch (error) {
    // The browser does not know this currency code: show a plain version
    return `${amount.toFixed(2)} ${currencyCode}`
  }
}

// Turn a date text from the backend into a Date object (or null when it is not a valid date)
function parseDate(dateText) {
  // Only text can be a date
  const text = pickText(dateText)
  // Empty text is not a date
  if (!text) return null
  // Try to read the date
  const date = new Date(text)
  // An invalid date has a "not a number" time
  return Number.isNaN(date.getTime()) ? null : date
}

// Format a date only, for example "24 October 2025"
export function formatDate(dateText) {
  // Read the date
  const date = parseDate(dateText)
  // Invalid date: hide the field
  if (!date) return ''
  // A text like "2025-10-24" has no time. Show it in UTC so the day does not move in other time zones.
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(pickText(dateText))
  // Build the text
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(isDateOnly ? { timeZone: 'UTC' } : {}),
  }).format(date)
}

// Format a date and time, for example "24 October 2025, 14:32 GMT"
export function formatDateTime(dateText) {
  // Read the date
  const date = parseDate(dateText)
  // Invalid date: hide the field
  if (!date) return ''
  // Build the text (shown in the student's own time zone, and the zone name is included)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

// Turn a number of days into text, for example 30 becomes "30 days"
export function formatDuration(days) {
  // The number must be a whole number above zero
  if (!Number.isInteger(days) || days <= 0) return ''
  // Singular or plural
  return days === 1 ? '1 day' : `${days} days`
}

// Turn a payment method id ('card', 'bank', 'wallet') into its title. Unknown values are shown as they are.
export function formatPaymentMethod(method) {
  // Look for a method we know (from app/utils/paymentMethods.js)
  const knownMethod = findPaymentMethod(pickText(method))
  // Use its title, or the text from the backend
  return knownMethod ? knownMethod.title : pickText(method)
}
