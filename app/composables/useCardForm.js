// State and helpers for the DEMO card form.
// The card values live ONLY in this component's memory. They are never put in the store,
// never sent anywhere, and disappear when the student leaves this step.

// How each field is formatted while the student types
const FIELD_FORMATTERS = {
  number: formatCardNumber, // adds spaces: 4242 4242 4242 4242
  expiry: formatExpiry, // adds a slash: 08/28
  cvv: (text) => keepDigits(text, 4), // digits only, 4 at most
}

// The function other files call
export function useCardForm() {
  // The values typed by the student
  const cardForm = reactive({ holder: '', number: '', expiry: '', cvv: '' })

  // Error messages. A field name is here only while that field has an error.
  const cardErrors = reactive({})

  // The detected card brand ('visa', 'mastercard', 'amex' or 'unknown')
  const cardBrand = computed(() => detectCardBrand(cardForm.number))

  // true when every card field passes its rule (used to enable the payment button)
  const isCardFormValid = computed(() => CARD_FIELDS.every((fieldName) => cardRules[fieldName](cardForm) === ''))

  // Check one field. Shows or removes its error.
  function validateCardField(fieldName) {
    // Run the rule for this field
    const message = cardRules[fieldName](cardForm)
    // Show the message if there is one
    if (message) cardErrors[fieldName] = message
    // Otherwise remove the old error
    else delete cardErrors[fieldName]
  }

  // Called while the student types in a field
  function handleCardFieldInput(fieldName) {
    // Find the formatter of this field (the name field has none)
    const formatter = FIELD_FORMATTERS[fieldName]
    // Format the text, for example add spaces to the card number
    if (formatter) cardForm[fieldName] = formatter(cardForm[fieldName])
    // Remove the error as soon as the value is fixed
    if (cardErrors[fieldName]) validateCardField(fieldName)
  }

  // Called when the student leaves a field
  function handleCardFieldBlur(fieldName) {
    // Remove extra spaces from the name
    if (fieldName === 'holder') cardForm.holder = cardForm.holder.trim().replace(/\s+/g, ' ')
    // Show an error if the value is wrong
    validateCardField(fieldName)
  }

  // Share these with the components
  return { cardForm, cardErrors, cardBrand, isCardFormValid, handleCardFieldInput, handleCardFieldBlur }
}
