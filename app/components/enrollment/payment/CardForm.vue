<script setup>
// The card values. The parent owns them and connects them with v-model.
const card = defineModel({ type: Object, required: true })

// Props: the error messages and the detected card brand (both come from the parent)
defineProps({
  errors: { type: Object, required: true },
  brand: { type: String, default: 'unknown' },
})

// Events: tell the parent when a field changes or loses focus
const emit = defineEmits(['field-input', 'field-blur'])

// Brand labels (VISA, MC, AMEX) from app/utils/cardForm.js
const brands = CARD_BRANDS
</script>

<template>
  <div class="space-y-4 rounded-xl border border-border-subtle bg-white p-4 shadow-card sm:p-6">
    <!-- Demo notice -->
    <div class="flex items-start gap-3 rounded-lg bg-surface-low p-3 text-slate-body" role="note">
      <AppIcon name="info" class="mt-0.5 shrink-0 text-[20px] text-deep-teal" />
      <p class="text-sm">
        <strong class="font-semibold text-oxford-blue">Demo form:</strong>
        nothing you type here is stored, sent or processed. Please do not enter real card details.
      </p>
    </div>

    <!-- Cardholder name -->
    <FormField label="Cardholder Name" input-id="card-holder" required :error="errors.holder">
      <template #default="{ describedBy, invalid }">
        <FormTextInput
          v-model="card.holder"
          id="card-holder"
          :invalid="invalid"
          :aria-describedby="describedBy"
          autocomplete="off"
          placeholder="Name as shown on the card"
          @input="emit('field-input', 'holder')"
          @blur="emit('field-blur', 'holder')"
        />
      </template>
    </FormField>

    <!-- Card number, with the brand labels. The detected brand is highlighted. -->
    <FormField label="Card Number" input-id="card-number" required :error="errors.number">
      <template #aside>
        <span class="flex items-center gap-1" aria-hidden="true">
          <span
            v-for="item in brands"
            :key="item.id"
            class="rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors"
            :class="brand === item.id ? 'bg-oxford-blue text-white' : 'bg-surface-mid text-oxford-blue'"
          >
            {{ item.label }}
          </span>
        </span>
      </template>
      <template #default="{ describedBy, invalid }">
        <div class="relative">
          <FormTextInput
            v-model="card.number"
            id="card-number"
            :invalid="invalid"
            :aria-describedby="describedBy"
            class="pl-11 tracking-wider"
            inputmode="numeric"
            autocomplete="off"
            placeholder="•••• •••• •••• ••••"
            @input="emit('field-input', 'number')"
            @blur="emit('field-blur', 'number')"
          />
          <AppIcon name="credit_card" class="pointer-events-none absolute left-3 top-3 text-[20px] text-slate-body" />
        </div>
      </template>
    </FormField>

    <!-- Expiry date and security code -->
    <div class="grid grid-cols-2 items-start gap-4">
      <FormField label="Expiration Date" input-id="card-expiry" required :error="errors.expiry" hint="Format MM/YY">
        <template #default="{ describedBy, invalid }">
          <FormTextInput
            v-model="card.expiry"
            id="card-expiry"
            :invalid="invalid"
            :aria-describedby="describedBy"
            class="text-center"
            inputmode="numeric"
            autocomplete="off"
            placeholder="MM/YY"
            @input="emit('field-input', 'expiry')"
            @blur="emit('field-blur', 'expiry')"
          />
        </template>
      </FormField>

      <FormField label="CVV / CVC" input-id="card-cvv" required :error="errors.cvv" hint="3 digits on the back (4 for Amex)">
        <template #default="{ describedBy, invalid }">
          <!-- type="password" hides the digits while typing -->
          <FormTextInput
            v-model="card.cvv"
            id="card-cvv"
            :invalid="invalid"
            :aria-describedby="describedBy"
            class="text-center"
            type="password"
            inputmode="numeric"
            autocomplete="off"
            placeholder="•••"
            @input="emit('field-input', 'cvv')"
            @blur="emit('field-blur', 'cvv')"
          />
        </template>
      </FormField>
    </div>
  </div>
</template>
