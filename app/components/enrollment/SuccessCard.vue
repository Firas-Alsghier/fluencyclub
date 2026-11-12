<script setup>
// The first name of the student (optional). It is used only if the backend sent it.
defineProps({
  firstName: { type: String, default: '' },
})

// Texts of this card (editable in app/utils/successPageContent.js)
const content = SUCCESS_PAGE_CONTENT
</script>

<template>
  <!-- The main card. The receipt is placed inside it through the slot. -->
  <section
    aria-labelledby="success-heading"
    class="relative overflow-hidden rounded-2xl border border-border-subtle bg-white p-4 text-center shadow-card sm:p-8 print:overflow-visible print:border-0 print:p-0 print:shadow-none"
  >
    <!-- Soft colored glows in the corners (decoration only) -->
    <div class="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-deep-teal/10 blur-2xl print:hidden" aria-hidden="true"></div>
    <div class="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-surface-high/40 blur-2xl print:hidden" aria-hidden="true"></div>

    <!-- Everything except the receipt is hidden when printing -->
    <div class="relative print:hidden">
      <!-- Success icon with a soft pulse (the pulse stops for people who prefer less motion) -->
      <div class="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
        <span class="absolute inset-0 animate-ping rounded-full bg-deep-teal/20 motion-reduce:animate-none" aria-hidden="true"></span>
        <span class="relative flex h-20 w-20 items-center justify-center rounded-full bg-deep-teal text-white shadow-lg shadow-deep-teal/20">
          <AppIcon name="check_circle" class="text-[44px]" />
        </span>
      </div>

      <h2
        id="success-heading"
        data-step-heading
        tabindex="-1"
        class="text-[28px] font-bold leading-9 tracking-tight text-oxford-blue focus:outline-none sm:text-4xl sm:leading-[44px]"
      >
        Payment Successful!
      </h2>
      <p class="mt-1 text-lg text-slate-body/85">
        <!-- Greeting with the first name only when we have it -->
        <template v-if="firstName">Thank you, {{ firstName }}! </template>
        <template v-else>Thank you! </template>
        We have confirmed your payment.
      </p>

      <!-- Welcome message -->
      <div class="mx-auto mt-6 flex max-w-xl items-center justify-center gap-3 rounded-xl bg-surface-low p-4 text-sm font-semibold text-oxford-blue shadow-xs">
        <AppIcon name="stars" filled class="shrink-0 text-[24px] text-deep-teal" />
        <span>{{ content.welcomeMessage }}</span>
      </div>

      <!-- Group placement (the teacher decides it, so we only say that it will be confirmed) -->
      <div class="mx-auto mt-4 flex max-w-md items-center justify-between gap-3 rounded-xl bg-surface-mid/60 px-4 py-3 text-left">
        <div class="flex items-center gap-3">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-oxford-blue shadow-xs">
            <AppIcon name="psychology" />
          </span>
          <div>
            <span class="block text-xs font-medium uppercase tracking-wider text-slate-body">{{ content.placementLabel }}</span>
            <span class="text-sm font-semibold text-oxford-blue">{{ content.placementText }}</span>
          </div>
        </div>
        <span class="shrink-0 rounded bg-surface-high px-2 py-0.5 text-xs font-semibold text-oxford-blue">
          {{ content.placementBadge }}
        </span>
      </div>
    </div>

    <!-- The receipt goes here -->
    <div class="relative mx-auto mt-6 max-w-2xl print:mt-0 print:max-w-none">
      <slot />
    </div>
  </section>
</template>
