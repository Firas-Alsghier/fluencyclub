<script setup>
// Settings for one form field: label, optional hint, and error message
const props = defineProps({
  // Text of the label
  label: { type: String, required: true },
  // The id of the control inside (so the label points to it)
  inputId: { type: String, required: true },
  // true = show the red * and tell screen readers the field is required
  required: { type: Boolean, default: false },
  // Error message. Empty text = no error.
  error: { type: String, default: '' },
  // Small help text shown under the control when there is no error
  hint: { type: String, default: '' },
})

// The ids of the two message lines
const errorId = computed(() => `${props.inputId}-error`)
const hintId = computed(() => `${props.inputId}-hint`)

// Tells screen readers which message describes the control (the error first, then the hint)
const describedBy = computed(() => {
  // An error is the most important message
  if (props.error) return errorId.value
  // Otherwise use the hint, if there is one
  if (props.hint) return hintId.value
  // No message at all
  return undefined
})
</script>

<template>
  <div class="flex flex-col">
    <!-- Label. The "aside" slot puts extra content on the right side of the label line. -->
    <label :for="inputId" class="mb-1 flex items-center justify-between gap-2 text-sm font-semibold text-oxford-blue">
      <span>
        {{ label }}
        <span v-if="required" class="font-bold text-error" aria-hidden="true">*</span>
        <span v-if="required" class="sr-only">(required)</span>
      </span>
      <slot name="aside" />
    </label>

    <!-- The control (input or select). It receives describedBy and invalid from here. -->
    <slot :describedBy="describedBy" :invalid="Boolean(error)" />

    <!-- Error message (or the hint if there is no error) -->
    <p v-if="error" :id="errorId" class="mt-1 flex items-start gap-1 text-xs font-medium text-error">
      <AppIcon name="error" filled class="mt-px text-[14px]" />
      <span>{{ error }}</span>
    </p>
    <p v-else-if="hint" :id="hintId" class="mt-1 text-xs text-slate-body/80">{{ hint }}</p>
  </div>
</template>
