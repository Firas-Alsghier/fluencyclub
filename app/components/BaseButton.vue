<script setup>
// Props = settings the parent component can give to this button
const props = defineProps({
  // Where the button goes. If empty, it goes to the Join page.
  to: { type: String, default: '' },
  // Color style: 'primary' (dark blue), 'teal', 'light' (white), or 'outline'
  variant: { type: String, default: 'primary' },
  // Size: 'sm', 'md', or 'lg'
  size: { type: String, default: 'md' },
})

// The real address to open: the given one, or the Join page when none is given
const linkTarget = computed(() => props.to || JOIN_PAGE_PATH)

// Tailwind classes for each color style
const variantClasses = {
  primary: 'bg-oxford-blue text-white shadow-md shadow-oxford-blue/20 hover:bg-oxford-light',
  teal: 'bg-deep-teal text-white hover:bg-deep-teal/90',
  light: 'bg-white text-oxford-blue shadow-lg hover:bg-slate-100',
  outline: 'border border-border-subtle bg-white text-oxford-blue hover:bg-slate-50',
}

// Tailwind classes for each size
const sizeClasses = {
  sm: 'px-4 py-1.5 text-xs font-bold',
  md: 'px-6 py-2.5 text-sm font-semibold',
  lg: 'px-8 py-4 text-base font-semibold',
}

// Join the shared classes with the chosen color and size classes
const buttonClasses = computed(() => [
  'inline-flex items-center justify-center gap-2.5 rounded-full transition-all motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]',
  variantClasses[props.variant],
  sizeClasses[props.size],
])
</script>

<template>
  <!-- A link that looks like a button. The text and icons come from the parent (slot). -->
  <NuxtLink :to="linkTarget" :class="buttonClasses">
    <slot />
  </NuxtLink>
</template>
