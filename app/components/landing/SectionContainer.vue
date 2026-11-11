<script setup>
// Settings for the section wrapper
defineProps({
  // Background color: 'white' or 'offWhite'
  background: { type: String, default: 'white' },
  // Show a thin line on top of the section
  bordered: { type: Boolean, default: true },
  // Use a narrower content width (used by the FAQ)
  narrow: { type: Boolean, default: false },
})

// Tailwind classes for each background color
const backgroundClasses = {
  white: 'bg-white',
  offWhite: 'bg-off-white',
}
</script>

<template>
  <!-- Attributes like id and aria-labelledby from the parent land on this <section> automatically -->
  <section
    class="w-full py-20 lg:py-24"
    :class="[backgroundClasses[background], { 'border-t border-border-subtle': bordered }]"
  >
    <!-- Centers the content and keeps it from getting too wide -->
    <div class="mx-auto px-6 lg:px-8" :class="narrow ? 'max-w-4xl' : 'max-w-7xl'">
      <slot />
    </div>
  </section>
</template>
