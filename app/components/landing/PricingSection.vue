<script setup>
// Price and price note (from app/utils/siteConfig.js, so they are easy to change)
const membership = MEMBERSHIP

// What the membership includes. The first item is shown in a stronger style.
const features = [
  'Daily 45-minute live speaking sessions',
  'Small friendly groups (maximum 4–6 students)',
  'Topic briefs & daily vocabulary cheat sheets',
  'Level placement check with certified mentor',
  'Personal WhatsApp/Telegram support from teachers',
  'Zero homework & stress-free spoken environment',
]
</script>

<template>
  <!-- PRICING: one membership card. No payment happens here. The button goes to /join. -->
  <LandingSectionContainer id="pricing" aria-labelledby="pricing-heading" background="offWhite">
    <LandingSectionHeader
      heading-id="pricing-heading"
      eyebrow="Transparent Membership"
      title="Invest in Your Fluency"
      description="One straightforward, transparent plan. No recurring subscriptions or surprise renewals."
    />

    <div class="mx-auto max-w-lg">
      <div class="relative flex flex-col justify-between rounded-3xl border-2 border-oxford-blue bg-white p-8 shadow-xl sm:p-10">
        <!-- Tag on the top edge of the card -->
        <div class="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-oxford-blue px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
          <AppIcon name="verified" class="text-[15px] text-soft-amber" />
          Complete 30-Day Immersion
        </div>

        <div>
          <div class="mb-6 mt-2 text-center">
            <span class="text-xs font-bold uppercase tracking-widest text-deep-teal">Speaking Club Pass</span>
            <h3 class="mt-1 text-3xl font-extrabold text-oxford-blue">30 Days Membership</h3>
            <p class="mt-2 text-sm text-slate-body/85">Full daily access to live small groups and personal teacher guidance.</p>
          </div>

          <!-- Price -->
          <div class="mb-6 flex items-baseline justify-center gap-2 border-y border-border-subtle py-4">
            <span class="text-5xl font-extrabold tracking-tight text-oxford-blue sm:text-6xl">{{ membership.priceLabel }}</span>
            <span class="text-sm font-semibold text-slate-body/80">{{ membership.priceNote }}</span>
          </div>

          <p class="mb-6 rounded-full bg-deep-teal/10 px-3 py-1.5 text-center text-xs font-semibold text-deep-teal">
            No recurring subscriptions or surprise renewals
          </p>

          <!-- List of what is included -->
          <ul class="mb-8 space-y-3.5 text-sm text-slate-body">
            <li v-for="(feature, index) in features" :key="feature" class="flex items-center gap-3">
              <AppIcon name="check_circle" class="shrink-0 text-[20px] text-deep-teal" />
              <!-- index === 0 means the first item, which is shown stronger -->
              <span :class="{ 'font-medium text-oxford-blue': index === 0 }">{{ feature }}</span>
            </li>
          </ul>
        </div>

        <BaseButton size="lg" class="w-full">
          <span>Join 30-Day Club</span>
          <AppIcon name="arrow_forward" class="text-[20px]" />
        </BaseButton>
      </div>
    </div>
  </LandingSectionContainer>
</template>
