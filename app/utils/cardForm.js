// Helpers and rules for the DEMO card form.
// IMPORTANT: this is a demonstration only. Card details are never stored, sent, or processed.

// The card fields, in page order
export const CARD_FIELDS = ['holder', 'number', 'expiry', 'cvv']

// The brand labels shown above the card number box
export const CARD_BRANDS = [
  { id: 'visa', label: 'VISA' },
  { id: 'mastercard', label: 'MC' },
  { id: 'amex', label: 'AMEX' },
]

// Keep only the digits and cut the text to a maximum length
export function keepDigits(text, maxLength) {
  // Remove every non-digit, then keep only the first "maxLength" characters
  return String(text ?? '').replace(/\D/g, '').slice(0, maxLength)
}

// Guess the card brand from the first digits ('visa', 'mastercard', 'amex', or 'unknown')
export function detectCardBrand(cardNumber) {
  // Only the digits matter
  const digits = keepDigits(cardNumber, 19)
  // Visa numbers start with 4
  if (/^4/.test(digits)) return 'visa'
  // Mastercard starts with 51-55 or 2221-2720
  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/.test(digits)) return 'mastercard'
  // American Express starts with 34 or 37
  if (/^3[47]/.test(digits)) return 'amex'
  // Anything else
  return 'unknown'
}

// Add spaces to a card number while the student types: "4242424242424242" becomes "4242 4242 4242 4242"
export function formatCardNumber(cardNumber) {
  // American Express uses groups of 4-6-5 and 15 digits. Other cards use groups of 4 and up to 19 digits.
  const isAmex = detectCardBrand(cardNumber) === 'amex'
  // Keep only the digits that are allowed
  const digits = keepDigits(cardNumber, isAmex ? 15 : 19)
  // The size of each group of digits
  const groupSizes = isAmex ? [4, 6, 5] : [4, 4, 4, 4, 4]
  // Here we collect the groups
  const groups = []
  // Where the next group starts
  let start = 0
  // Cut the digits into groups
  for (const size of groupSizes) {
    // Stop when there are no digits left
    if (start >= digits.length) break
    // Add the next group
    groups.push(digits.slice(start, start + size))
    // Move the start forward
    start += size
  }
  // Join the groups with spaces
  return groups.join(' ')
}

// Format the expiry date while typing: "0828" becomes "08/28"
export function formatExpiry(text) {
  // Keep up to 4 digits (MMYY)
  const digits = keepDigits(text, 4)
  // Up to 2 digits: no slash yet
  if (digits.length <= 2) return digits
  // More than 2 digits: put a slash after the month
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

// Luhn check: a quick math test that catches most typing mistakes in card numbers
export function passesLuhnCheck(digits) {
  // The running total
  let sum = 0
  // Every second digit (from the right) is doubled
  let shouldDouble = false
  // Go through the digits from right to left
  for (let index = digits.length - 1; index >= 0; index--) {
    // The current digit as a number
    let digit = Number(digits[index])
    // Double it when needed
    if (shouldDouble) {
      digit *= 2
      // A two-digit result counts as the sum of its digits (same as subtracting 9)
      if (digit > 9) digit -= 9
    }
    // Add it to the total
    sum += digit
    // Switch for the next digit
    shouldDouble = !shouldDouble
  }
  // A valid number gives a total that ends in 0
  return sum % 10 === 0
}

// One rule per card field. Each returns an error message, or '' when the value is fine.
export const cardRules = {
  // Cardholder name rule
  holder: (form) => {
    // The name without spaces at the ends
    const name = String(form.holder ?? '').trim()
    // Empty name
    if (!name) return 'Enter the name shown on the card.'
    // Too long to be a real name
    if (name.length > 50) return 'The name must be 50 characters or fewer.'
    // No problem found
    return ''
  },

  // Card number rule
  number: (form) => {
    // Only the digits of the number
    const digits = keepDigits(form.number, 19)
    // Empty number
    if (!digits) return 'Enter your card number.'
    // American Express has exactly 15 digits. Other cards have 13 to 19.
    const isLengthValid = detectCardBrand(digits) === 'amex' ? digits.length === 15 : digits.length >= 13 && digits.length <= 19
    // Wrong length
    if (!isLengthValid) return 'This card number is too short or too long.'
    // The math check failed: probably a typing mistake
    if (!passesLuhnCheck(digits)) return 'This card number does not look right. Please check it.'
    // No problem found
    return ''
  },

  // Expiry date rule
  expiry: (form) => {
    // Only the digits (MMYY)
    const digits = keepDigits(form.expiry, 4)
    // Empty date
    if (!digits) return 'Enter the expiry date.'
    // Not complete yet
    if (digits.length < 4) return 'Use the format MM/YY.'
    // The month and the full year as numbers
    const month = Number(digits.slice(0, 2))
    const year = 2000 + Number(digits.slice(2))
    // The month must be 1 to 12
    if (month < 1 || month > 12) return 'Enter a month between 01 and 12.'
    // Today's date
    const today = new Date()
    // A card is expired when its month is before the current month
    const isExpired = year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1)
    // Expired card
    if (isExpired) return 'This card has expired.'
    // No problem found
    return ''
  },

  // Security code rule
  cvv: (form) => {
    // Only the digits of the code
    const digits = keepDigits(form.cvv, 4)
    // American Express codes have 4 digits, other cards have 3
    const neededLength = detectCardBrand(form.number) === 'amex' ? 4 : 3
    // Empty code
    if (!digits) return 'Enter the security code.'
    // Wrong length
    if (digits.length !== neededLength) return `Enter the ${neededLength}-digit security code.`
    // No problem found
    return ''
  },
}
