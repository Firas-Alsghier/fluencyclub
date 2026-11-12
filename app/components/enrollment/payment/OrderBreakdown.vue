<script setup>
// true when the student ticked the Terms checkbox. The parent connects it with v-model.
const hasAcceptedTerms = defineModel({ type: Boolean, default: false })

// Price texts (from app/utils/siteConfig.js)
const passPriceText = formatPrice(MEMBERSHIP.priceAmount)
const processingFeeText = formatPrice(MEMBERSHIP.processingFee)
const totalDueText = formatPrice(MEMBERSHIP.totalDue)
</script>

<template>
  <div class="rounded-xl border border-surface-mid bg-surface-high/60 p-4 sm:p-6">
    <h4 class="mb-3 text-sm font-bold uppercase tracking-wider text-slate-body">Order Breakdown</h4>

    <dl class="space-y-2 border-b border-surface-mid pb-3 text-sm">
      <div class="flex items-center justify-between text-slate-body">
        <dt>FluencyClub 30-Day Pass</dt>
        <dd class="font-medium text-oxford-blue">{{ passPriceText }}</dd>
      </div>
      <div class="flex items-center justify-between text-slate-body">
        <dt>Payment Processing Fee</dt>
        <dd class="font-medium text-deep-teal">{{ processingFeeText }} (Waived)</dd>
      </div>
    </dl>

    <div class="flex items-center justify-between pt-3">
      <span class="text-lg font-bold text-oxford-blue">Total Due Today</span>
      <span class="text-2xl font-bold text-oxford-blue">{{ totalDueText }}</span>
    </div>

    <!-- Agreement checkbox. It starts unticked, and the payment button stays disabled until it is ticked. -->
    <div class="mt-4 border-t border-surface-mid pt-3">
      <label class="flex cursor-pointer items-start gap-2.5 text-sm text-oxford-blue">
        <input
          v-model="hasAcceptedTerms"
          type="checkbox"
          class="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-oxford-blue"
        />
        <span>
          I agree to the <span class="font-semibold underline">Terms of Enrollment</span> and Student Code of Conduct
          (30-day fixed access, no recurring fees).
        </span>
      </label>
    </div>
  </div>
</template>
