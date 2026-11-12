// The enrollment store keeps the student's information while they move between enrollment steps.
// It lives only in the browser memory: nothing is sent to a server or saved to a database.
// IMPORTANT: card details are NEVER kept here. Only the chosen payment METHOD is stored.

// Make a new object where every Personal Details value is empty
function createEmptyPersonalDetails() {
  // Return the starting values of the form
  return {
    firstName: '', // first name text
    lastName: '', // last name text
    dialCountry: '', // two-letter code of the country whose dialing code was chosen
    phoneNumber: '', // phone number without the country code
    age: '', // age typed by the student
    gender: '', // 'Female' or 'Male'
    country: '', // two-letter code of the country of residence
    email: '', // optional email
  }
}

// Create the store. The name 'enrollment' must be unique among all stores.
export const useEnrollmentStore = defineStore('enrollment', () => {
  // The current step: 1 = Personal Details, 2 = Payment & Review, 3 = Confirmation
  const currentStep = ref(1)

  // The values of the Personal Details form (used to fill the form again when the student comes back)
  const personalDetails = ref(createEmptyPersonalDetails())

  // true after the student passed validation and the details were stored
  const isPersonalDetailsSaved = ref(false)

  // The payment method the student chose in Step 2 ('card', 'bank' or 'wallet')
  const paymentMethod = ref(DEFAULT_PAYMENT_METHOD_ID)

  // The result of the DEMO checkout (null until the demo checkout is finished)
  const demoCheckoutResult = ref(null)

  // true after the demo checkout finished
  const isDemoCheckoutComplete = computed(() => demoCheckoutResult.value !== null)

  // The clean, ready-to-use student data for the next steps (null until the details are saved)
  const studentData = computed(() => {
    // Nothing is ready yet
    if (!isPersonalDetailsSaved.value) return null
    // A short name for the stored values
    const details = personalDetails.value
    // Find the full country objects from their codes
    const dialCountry = findCountryByCode(details.dialCountry)
    const residenceCountry = findCountryByCode(details.country)
    // The phone digits without the leading zero
    const phoneDigits = cleanPhoneDigits(details.phoneNumber)
    // Build the clean data object
    return {
      firstName: details.firstName, // first name
      lastName: details.lastName, // last name
      fullName: `${details.firstName} ${details.lastName}`, // first and last name together
      dialCode: `+${dialCountry.dialCode}`, // for example '+44'
      phoneNumber: phoneDigits, // digits only, no leading zero
      fullPhoneNumber: buildFullPhoneNumber(dialCountry.dialCode, details.phoneNumber), // for example '+447911123456'
      displayPhoneNumber: `+${dialCountry.dialCode} ${phoneDigits}`, // easy to read, for example '+44 7911123456'
      age: Number(details.age), // age as a real number
      gender: details.gender, // 'Female' or 'Male'
      country: residenceCountry.name, // country name, for example 'United Kingdom'
      countryCode: details.country, // country code, for example 'GB'
      email: details.email, // email (can be an empty text)
    }
  })

  // Store the checked Personal Details. "details" is the object with the form values.
  function savePersonalDetails(details) {
    // Keep a copy of the values (so later form edits do not change the stored data by accident)
    personalDetails.value = { ...details }
    // Remember that the details passed validation
    isPersonalDetailsSaved.value = true
  }

  // Remember the chosen payment method. Ignore ids that are not in our list.
  function setPaymentMethod(methodId) {
    // Only accept a known method
    if (findPaymentMethod(methodId)) paymentMethod.value = methodId
  }

  // Move to another step. Each step has a rule, so the student cannot skip ahead.
  function goToStep(stepNumber) {
    // Step 1 can always be opened (the form is filled again from the stored details)
    if (stepNumber === 1) currentStep.value = 1
    // Step 2 needs valid Personal Details
    else if (stepNumber === 2 && isPersonalDetailsSaved.value) currentStep.value = 2
    // Step 3 needs the demo checkout to be finished
    else if (stepNumber === 3 && isDemoCheckoutComplete.value) currentStep.value = 3
  }

  // Called when the demo checkout finishes. "result" comes from simulateDemoPayment().
  function completeDemoCheckout(result) {
    // Keep the demo result (the confirmation screen shows it)
    demoCheckoutResult.value = result
    // Show the confirmation step
    goToStep(3)
  }

  // Clear everything and go back to Step 1 (used after the confirmation screen is left)
  function resetEnrollment() {
    // Back to the first step
    currentStep.value = 1
    // Empty form values
    personalDetails.value = createEmptyPersonalDetails()
    // Details are no longer saved
    isPersonalDetailsSaved.value = false
    // Default payment method again
    paymentMethod.value = DEFAULT_PAYMENT_METHOD_ID
    // No demo result
    demoCheckoutResult.value = null
  }

  // Share these values and functions with the rest of the app
  return {
    currentStep,
    personalDetails,
    isPersonalDetailsSaved,
    paymentMethod,
    demoCheckoutResult,
    isDemoCheckoutComplete,
    studentData,
    savePersonalDetails,
    setPaymentMethod,
    goToStep,
    completeDemoCheckout,
    resetEnrollment,
  }
})
