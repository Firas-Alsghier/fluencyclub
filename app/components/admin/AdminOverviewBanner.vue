<script setup>
// Optional text for the next session, for example "42 mins". Empty = that part is hidden.
defineProps({
  nextSessionText: { type: String, default: '' },
})

// The membership text. It is built from app/utils/siteConfig.js, so it always matches the real price.
// The membership is a ONE-TIME payment for 30 days (not a monthly subscription).
const membershipText = `${MEMBERSHIP.priceLabel} one-time payment`
</script>

<template>
  <!-- Top banner: who we are, membership info, and two quick actions -->
  <section
    aria-label="Club overview"
    class="flex flex-col justify-between gap-4 rounded-xl border border-border-subtle bg-white p-6 shadow-admin lg:flex-row lg:items-center"
  >
    <div class="flex items-center gap-4">
      <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-oxford-blue text-[#99efe5]">
        <AppIcon name="record_voice_over" class="text-[26px]" />
      </span>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h2 class="font-sans text-base font-semibold leading-6 tracking-[-0.01em] text-oxford-blue">Executive Club Overview</h2>
          <!-- Pulsing dot (the pulse stops for people who prefer less motion) -->
          <span class="inline-flex items-center gap-1.5 rounded-full bg-deep-teal/10 px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.04em] text-deep-teal">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-deep-teal motion-reduce:animate-none"></span>
            Live Operations Active
          </span>
        </div>
        <p class="mt-0.5 text-[13px] leading-[18px] text-slate-body">
          Current 30-Day Club Membership: <span class="font-semibold text-oxford-blue">{{ membershipText }}</span>
          <!-- Shown only when a next session text is given -->
          <template v-if="nextSessionText">
            • Next session starts in <span class="font-semibold text-deep-teal">{{ nextSessionText }}</span>
          </template>
        </p>
      </div>
    </div>

    <!-- Quick actions (buttons only for now: they do nothing until their pages exist) -->
    <div class="flex shrink-0 flex-wrap items-center gap-2 self-start lg:self-center">
      <button
        type="button"
        class="flex items-center gap-1.5 rounded-lg bg-surface-low px-4 py-2 text-xs font-semibold tracking-[0.03em] text-oxford-blue transition-colors hover:bg-surface-mid"
      >
        <AppIcon name="person_add" class="text-[18px]" />
        <span>Invite Student</span>
      </button>
      <button
        type="button"
        class="flex items-center gap-1.5 rounded-lg bg-deep-teal px-4 py-2 text-xs font-semibold tracking-[0.03em] text-white transition-colors hover:bg-deep-teal/90"
      >
        <AppIcon name="video_call" class="text-[18px]" />
        <span>Schedule Session</span>
      </button>
    </div>
  </section>
</template>
