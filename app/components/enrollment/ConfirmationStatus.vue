<script setup>
// The state to show and the payment reference (if we have a valid one)
const props = defineProps({
  state: { type: String, required: true },
  reference: { type: String, default: '' },
})

// Tell the parent when the student presses "Check again"
const emit = defineEmits(['retry'])

// The address of the enrollment page (from app/utils/siteConfig.js)
const joinPagePath = JOIN_PAGE_PATH

// The texts for each state (editable in app/utils/successPageContent.js)
const messages = STATUS_MESSAGES

// The message of the current state. An unknown state falls back to the 'error' message.
const message = computed(() => messages[props.state] ?? messages.error)

// Colors of the icon circle, by tone
const toneClasses = {
  info: 'bg-deep-teal/15 text-deep-teal',
  warning: 'bg-soft-amber/20 text-[#7C4B00]',
  error: 'bg-error/10 text-error',
}

// true while the payment is being checked (the icon spins)
const isLoading = computed(() => props.state === 'loading')
</script>

<template>
  <div class="space-y-6">
    <!-- role="status" is polite (loading, pending). role="alert" is urgent (problems). -->
    <section
      :role="message.tone === 'error' ? 'alert' : 'status'"
      aria-labelledby="status-heading"
      class="rounded-2xl border border-border-subtle bg-white p-6 text-center shadow-card sm:p-10"
    >
      <span class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" :class="toneClasses[message.tone]">
        <AppIcon :name="message.icon" class="text-[34px]" :class="{ 'animate-spin motion-reduce:animate-none': isLoading }" />
      </span>
      <h2 id="status-heading" data-step-heading tabindex="-1" class="text-2xl font-bold tracking-tight text-oxford-blue focus:outline-none sm:text-3xl">
        {{ message.title }}
      </h2>
      <p class="mx-auto mt-2 max-w-xl text-base text-slate-body/85">{{ message.text }}</p>

      <!-- The reference, so the student can give it to support -->
      <p v-if="reference" class="mt-3 text-sm text-slate-body">
        Payment reference: <span class="font-mono font-semibold text-oxford-blue break-all">{{ reference }}</span>
      </p>

      <!-- Buttons -->
      <div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          v-if="message.canRetry"
          type="button"
          class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-oxford-blue px-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-oxford-light sm:w-auto"
          @click="emit('retry')"
        >
          <AppIcon name="refresh" class="text-[18px]" /> Check again
        </button>
        <NuxtLink
          v-if="message.canGoBack"
          :to="joinPagePath"
          class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-oxford-blue px-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-oxford-light sm:w-auto"
        >
          <AppIcon name="arrow_back" class="text-[18px]" /> Back to Enrollment
        </NuxtLink>
        <NuxtLink
          v-if="!isLoading"
          to="/"
          class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-surface-mid px-5 text-sm font-semibold text-oxford-blue transition-colors hover:bg-surface-high sm:w-auto"
        >
          <AppIcon name="home" class="text-[18px]" /> Back to Homepage
        </NuxtLink>
      </div>
    </section>

    <!-- Contact help (not shown while loading) -->
    <EnrollmentSupportSection v-if="!isLoading" heading="Need help?" :text="message.supportText" />
  </div>
</template>
