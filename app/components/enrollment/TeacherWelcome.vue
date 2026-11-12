<script setup>
// The first name of the student (optional, only if the backend sent it)
const props = defineProps({
  firstName: { type: String, default: '' },
})

// The teacher information (editable in app/utils/successPageContent.js). Empty values are hidden.
const teacher = TEACHER_PROFILE

// The title of the welcome message
const welcomeTitle = computed(() => (props.firstName ? `Welcome, ${props.firstName}!` : 'Welcome to the club!'))
</script>

<template>
  <section aria-labelledby="teacher-welcome-heading" class="flex flex-col items-center gap-6 rounded-2xl border border-surface-mid bg-surface-low p-6 shadow-xs md:flex-row md:p-8">
    <!-- The teacher's photo, or a plain icon when there is no real photo -->
    <div class="h-24 w-24 shrink-0 overflow-hidden rounded-2xl shadow-md md:h-28 md:w-28">
      <img
        v-if="teacher.photoUrl"
        :src="teacher.photoUrl"
        :alt="teacher.name ? `Photo of ${teacher.name}` : 'Photo of your teacher'"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-white text-oxford-blue" aria-hidden="true">
        <AppIcon name="person" class="text-[48px]" />
      </div>
    </div>

    <div class="flex-1 text-center md:text-left">
      <!-- The role badge appears only when a role is set -->
      <p v-if="teacher.role" class="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-deep-teal shadow-xs">
        <AppIcon name="school" class="text-[14px]" /> {{ teacher.role }}
      </p>
      <h3 id="teacher-welcome-heading" class="text-lg font-semibold text-oxford-blue">{{ welcomeTitle }}</h3>
      <p class="mt-1 text-sm text-slate-body/85">{{ teacher.message }}</p>
      <!-- The signature appears only when a name is set -->
      <p v-if="teacher.name" class="mt-2 text-[13px] font-medium text-oxford-blue">— {{ teacher.name }}</p>
    </div>
  </section>
</template>
