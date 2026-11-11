// Small helpers for phone numbers.

// Characters a student may type in the phone box: digits, spaces, dashes, dots and brackets
export const PHONE_ALLOWED_CHARACTERS = /^[\d\s\-().]+$/

// Shortest allowed phone number (digits only, without the country code)
export const MIN_PHONE_DIGITS = 6

// Longest allowed phone number (digits only, without the country code)
export const MAX_PHONE_DIGITS = 14

// Keep only the digits and remove zeros at the start (like the 0 in 07911 123456)
export function cleanPhoneDigits(phoneText) {
  // Make sure we work with text, remove every non-digit, then remove zeros at the start
  return String(phoneText ?? '').replace(/\D/g, '').replace(/^0+/, '')
}

// Join the dialing code and the phone digits into one number, for example "+447911123456"
export function buildFullPhoneNumber(dialCode, phoneText) {
  // Put "+" first, then the dialing code, then the cleaned digits
  return `+${dialCode}${cleanPhoneDigits(phoneText)}`
}
