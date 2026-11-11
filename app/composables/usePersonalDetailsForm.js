// This composable holds everything the Personal Details form needs:
// the values, the error messages, and the functions that check and save them.

// The text fields whose extra spaces are removed
const FIELDS_TO_TRIM = ['firstName', 'lastName', 'phoneNumber', 'email']

// The id of each field's control. The form uses them, and so do the labels and error focus.
const FIELD_IDS = {
  firstName: 'first-name',
  lastName: 'last-name',
  dialCountry: 'dial-code',
  phoneNumber: 'phone-number',
  age: 'student-age',
  gender: 'student-gender',
  country: 'student-country',
  email: 'student-email',
}

// Remove spaces at both ends and turn repeated spaces into one space
function tidyText(text) {
  // Make sure it is text, trim the ends, then shrink repeated spaces
  return String(text ?? '').trim().replace(/\s+/g, ' ')
}

// The function other files call
export function usePersonalDetailsForm() {
  // Get the store that remembers the details between steps
  const enrollmentStore = useEnrollmentStore()

  // Form values. We start from the stored values, so the form is filled again if the student comes back.
  const form = reactive({ ...enrollmentStore.personalDetails })

  // Error messages. A field name is here only while that field has an error.
  const errors = reactive({})

  // Check one field. Shows or removes its error. Returns true when the field is valid.
  function validateField(fieldName) {
    // Run the rule for this field
    const message = personalDetailsRules[fieldName](form)
    // If the rule returned a message, show it
    if (message) errors[fieldName] = message
    // If not, remove the old error (if any)
    else delete errors[fieldName]
    // Tell the caller if the field is valid
    return message === ''
  }

  // Check every field. Returns true only when all fields are valid.
  function validateAllFields() {
    // Start by assuming the form is valid
    let isFormValid = true
    // Go through every field name, in page order
    for (const fieldName of PERSONAL_DETAILS_FIELDS) {
      // Check the field, and remember if any field fails
      if (!validateField(fieldName)) isFormValid = false
    }
    // Tell the caller the result
    return isFormValid
  }

  // Remove extra spaces from one text field
  function trimField(fieldName) {
    // Only clean the fields in the trim list
    if (FIELDS_TO_TRIM.includes(fieldName)) form[fieldName] = tidyText(form[fieldName])
  }

  // Called while the student types or chooses a value: remove the error as soon as the value is fixed
  function handleFieldInput(fieldName) {
    // Only re-check fields that currently show an error
    if (errors[fieldName]) validateField(fieldName)
  }

  // Called when the student leaves a text field: clean the spaces, then check it
  function handleFieldBlur(fieldName) {
    // Remove extra spaces
    trimField(fieldName)
    // Show an error if the value is wrong
    validateField(fieldName)
  }

  // Move the keyboard focus to the first field that has an error
  function focusFirstInvalidField() {
    // Find the first field (in page order) that has an error
    const firstInvalidField = PERSONAL_DETAILS_FIELDS.find((fieldName) => errors[fieldName])
    // Wait until the page is updated, then focus that control
    nextTick(() => document.getElementById(FIELD_IDS[firstInvalidField])?.focus())
  }

  // Called when the form is submitted. Returns true when the details were valid and stored.
  function submitForm() {
    // Clean the spaces in every text field
    FIELDS_TO_TRIM.forEach(trimField)
    // Check all fields
    const isFormValid = validateAllFields()
    // If something is wrong, help the student find it and stop here
    if (!isFormValid) {
      focusFirstInvalidField()
      return false
    }
    // Everything is fine: store a copy of the details for the next step
    enrollmentStore.savePersonalDetails({ ...form })
    // Tell the caller that it worked
    return true
  }

  // Share these with the form component
  return { form, errors, fieldIds: FIELD_IDS, handleFieldInput, handleFieldBlur, submitForm }
}
