// Validation rules for the Personal Details form.
// Every rule gets the form values and returns an error message, or '' when the value is fine.

// The two gender choices shown in the dropdown
export const GENDER_OPTIONS = ['Female', 'Male']

// Longest name allowed
const MAX_NAME_LENGTH = 50

// A simple email shape check: something@something.something (no spaces)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Shared check for first name and last name (so we do not repeat the same code)
function checkName(value, fieldLabel) {
  // Remove spaces from both ends so "   " counts as empty
  const name = String(value ?? '').trim()
  // Empty name: ask the student to type it
  if (!name) return `Enter your ${fieldLabel}.`
  // Very long name: probably a mistake
  if (name.length > MAX_NAME_LENGTH) return `Your ${fieldLabel} must be ${MAX_NAME_LENGTH} characters or fewer.`
  // No problem found
  return ''
}

// One rule per field. The ORDER here is the same as the order on the page.
export const personalDetailsRules = {
  // First name rule
  firstName: (form) => checkName(form.firstName, 'first name'),

  // Last name rule
  lastName: (form) => checkName(form.lastName, 'last name'),

  // Country code (dialing code) rule
  dialCountry: (form) => (findCountryByCode(form.dialCountry) ? '' : 'Choose your country code.'),

  // Phone number rule
  phoneNumber: (form) => {
    // The text the student typed, without spaces at the ends
    const phoneText = String(form.phoneNumber ?? '').trim()
    // Empty phone number
    if (!phoneText) return 'Enter your phone number.'
    // The student typed the country code here, but it has its own box
    if (phoneText.startsWith('+') || phoneText.startsWith('00')) {
      return 'Do not type the country code here. Choose it from the list on the left.'
    }
    // Letters or strange symbols are not allowed
    if (!PHONE_ALLOWED_CHARACTERS.test(phoneText)) return 'Use numbers only. Spaces and dashes are fine.'
    // Count the digits (a leading 0 is not counted)
    const digitCount = cleanPhoneDigits(phoneText).length
    // Too short or too long to be a real number
    if (digitCount < MIN_PHONE_DIGITS || digitCount > MAX_PHONE_DIGITS) {
      return `Enter a valid phone number (${MIN_PHONE_DIGITS} to ${MAX_PHONE_DIGITS} digits).`
    }
    // No problem found
    return ''
  },

  // Age rule
  age: (form) => {
    // The age as text, without spaces
    const ageText = String(form.age ?? '').trim()
    // Empty age
    if (!ageText) return 'Enter your age.'
    // Turn the text into a number
    const age = Number(ageText)
    // Decimals like 20.5 are not allowed
    if (!Number.isInteger(age)) return 'Enter your age as a whole number.'
    // Younger than the minimum age
    if (age < MIN_STUDENT_AGE) return `You must be at least ${MIN_STUDENT_AGE} years old to join.`
    // Older than the maximum (probably a typing mistake)
    if (age > MAX_STUDENT_AGE) return `Enter a valid age (${MIN_STUDENT_AGE} to ${MAX_STUDENT_AGE}).`
    // No problem found
    return ''
  },

  // Gender rule: must be one of the listed options
  gender: (form) => (GENDER_OPTIONS.includes(form.gender) ? '' : 'Select your gender.'),

  // Country of residence rule: must be a country from our list
  country: (form) => (findCountryByCode(form.country) ? '' : 'Select your country of residence.'),

  // Email rule: optional, but if the student typed something it must look like an email
  email: (form) => {
    // The email without spaces at the ends
    const email = String(form.email ?? '').trim()
    // Empty is fine because the email is optional
    if (!email) return ''
    // Check the shape of the email
    return EMAIL_PATTERN.test(email) ? '' : 'Enter a valid email address, like name@example.com.'
  },
}

// The list of field names, in page order (used to loop over all fields)
export const PERSONAL_DETAILS_FIELDS = Object.keys(personalDetailsRules)
