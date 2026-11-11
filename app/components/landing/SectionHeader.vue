<script setup>
// The three texts every section heading needs
defineProps({
  // Small label above the title
  eyebrow: { type: String, required: true },
  // Main title (an h2)
  title: { type: String, required: true },
  // Short text under the title
  description: { type: String, required: true },
  // id of the h2, so the section can point to it for screen readers
  headingId: { type: String, required: true },
})
</script>

<template>
  <div class="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
    <span class="mb-2.5 rounded-full bg-deep-teal/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-deep-teal">
      {{ eyebrow }}
    </span>
    <h2 :id="headingId" class="mb-4 text-3xl font-extrabold text-oxford-blue sm:text-4xl">{{ title }}</h2>
    <p class="text-base leading-relaxed text-slate-body/85">{{ description }}</p>
  </div>
</template>
