<script setup>
// Settings for one card with an icon, a title, and a short text
defineProps({
  // Icon name
  icon: { type: String, required: true },
  // Card title
  title: { type: String, required: true },
  // Card text
  description: { type: String, required: true },
  // Icon color: 'blue' or 'teal'
  tone: { type: String, default: 'blue' },
  // true = bigger padding and a small lift on hover (used in the Benefits section)
  roomy: { type: Boolean, default: false },
})

// Tailwind classes for the icon box, based on the tone
const toneClasses = {
  blue: 'bg-oxford-blue/10 text-oxford-blue',
  teal: 'bg-deep-teal/10 text-deep-teal',
}
</script>

<template>
  <article
    class="flex flex-col rounded-2xl border border-border-subtle bg-white shadow-card transition-all hover:shadow-card-hover"
    :class="roomy ? 'gap-3.5 p-8 motion-safe:hover:-translate-y-1' : 'gap-3 p-6'"
  >
    <!-- Square box that holds the icon -->
    <div class="flex h-12 w-12 items-center justify-center rounded-xl" :class="toneClasses[tone]">
      <AppIcon :name="icon" class="text-[26px]" />
    </div>
    <h3 class="text-lg font-bold text-oxford-blue">{{ title }}</h3>
    <p class="text-sm leading-relaxed text-slate-body/85">{{ description }}</p>
  </article>
</template>
