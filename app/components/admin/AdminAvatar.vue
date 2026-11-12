<script setup>
// A round avatar with the initials of a person (no photo needed)
const props = defineProps({
  // The full name, for example "Camila Duarte"
  name: { type: String, required: true },
  // Tailwind classes for the size. The default is a small avatar.
  sizeClasses: { type: String, default: 'h-8 w-8 text-[11px]' },
})

// The initials, for example "CD"
const initials = computed(() => getInitials(props.name))

// The colors, chosen from the name (the same name always gets the same colors)
const colorClasses = computed(() => getAvatarColorClasses(props.name))
</script>

<template>
  <!-- aria-hidden: the name is always written next to the avatar, so screen readers do not need the initials -->
  <span
    class="flex shrink-0 items-center justify-center rounded-full font-bold"
    :class="[sizeClasses, colorClasses]"
    aria-hidden="true"
  >
    {{ initials }}
  </span>
</template>
