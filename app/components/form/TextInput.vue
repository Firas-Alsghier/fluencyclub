<script setup>
// invalid = true shows the red error style
defineProps({
  invalid: { type: Boolean, default: false },
})

// The text in the input. The parent connects it with v-model.
const model = defineModel({ type: [String, Number], default: '' })
</script>

<template>
  <!-- Other attributes (id, type, placeholder, events...) go straight to this input -->
  <input v-model="model" class="form-control" :aria-invalid="invalid ? 'true' : undefined" />
</template>
