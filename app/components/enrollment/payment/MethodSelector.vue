<script setup>
// The id of the chosen method. The parent connects it with v-model.
const selectedMethodId = defineModel({ type: String, required: true })

// The three methods (from app/utils/paymentMethods.js)
const methods = PAYMENT_METHODS
</script>

<template>
  <!-- A group of radio buttons. Each card is a <label>, so a click anywhere on it chooses the method. -->
  <fieldset class="mb-6">
    <legend class="mb-3 flex items-center gap-2 text-lg font-bold text-oxford-blue">
      <AppIcon name="account_balance_wallet" class="text-[20px] text-deep-teal" />
      Choose Your Payment Method
    </legend>

    <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
      <label
        v-for="method in methods"
        :key="method.id"
        class="relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-4 shadow-xs transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-deep-teal has-[:focus-visible]:ring-offset-2"
        :class="selectedMethodId === method.id ? 'border-oxford-blue bg-surface-high/40' : 'border-surface-mid bg-white hover:bg-surface-low'"
      >
        <!-- The real radio button is hidden, but keyboard and screen readers still use it -->
        <input v-model="selectedMethodId" type="radio" name="payment-method" :value="method.id" class="sr-only" />

        <div class="flex items-start justify-between">
          <span
            class="mb-2 flex h-10 w-10 items-center justify-center rounded-lg"
            :class="selectedMethodId === method.id ? 'bg-oxford-blue text-white' : 'bg-surface-mid text-oxford-blue'"
          >
            <AppIcon :name="method.icon" class="text-[20px]" />
          </span>
          <!-- Round radio mark: a dot appears when this method is chosen -->
          <span
            class="flex h-5 w-5 items-center justify-center rounded-full border-2"
            :class="selectedMethodId === method.id ? 'border-oxford-blue' : 'border-slate-300'"
            aria-hidden="true"
          >
            <span v-if="selectedMethodId === method.id" class="h-2.5 w-2.5 rounded-full bg-oxford-blue"></span>
          </span>
        </div>

        <span>
          <span class="block text-sm font-bold text-oxford-blue">{{ method.title }}</span>
          <span class="mt-1 block text-sm text-slate-body/85">{{ method.description }}</span>
        </span>
      </label>
    </div>
  </fieldset>
</template>
