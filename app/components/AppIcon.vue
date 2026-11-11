<script setup>
// The icon name (for example "forum") and an option to draw the icon filled
defineProps({
  // Name of the Material Symbols icon. Remember to add new names to the list in app/app.vue.
  name: { type: String, required: true },
  // true = filled icon (used for stars), false = outline icon
  filled: { type: Boolean, default: false },
})
</script>

<template>
  <!-- The font turns the icon name text into a picture. aria-hidden hides it from screen readers because it is decoration. -->
  <span class="material-symbols-outlined" :class="{ 'icon-filled': filled }" aria-hidden="true">{{ name }}</span>
</template>
