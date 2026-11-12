<script setup>
// The rows to show. Each row: { id, studentName, plan, amount, methodId, timestampLabel, status }
defineProps({
  transactions: { type: Array, required: true },
})

// The badge (label and tone) of a payment status
const getBadge = (status) => getStatusBadge(TRANSACTION_STATUS_BADGES, status)
</script>

<template>
  <AdminTableCard
    title="Recent Transactions"
    subtitle="Latest 30-Day Club Membership payments"
    view-all-to="/admin/payments"
  >
    <table class="w-full min-w-[720px] border-collapse text-left">
      <caption class="sr-only">Most recent payments</caption>
      <thead>
        <tr class="bg-off-white text-[11px] font-semibold uppercase leading-[14px] tracking-[0.04em] text-slate-500">
          <th scope="col" class="px-4 py-2.5 font-semibold">Student / Plan</th>
          <th scope="col" class="px-4 py-2.5 font-semibold">Amount</th>
          <th scope="col" class="px-4 py-2.5 font-semibold">Method</th>
          <th scope="col" class="px-4 py-2.5 font-semibold">Date &amp; Time</th>
          <th scope="col" class="px-4 py-2.5 font-semibold">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border-subtle text-[13px] leading-[18px]">
        <tr v-for="row in transactions" :key="row.id" class="transition-colors hover:bg-slate-50">
          <td class="px-4 py-4">
            <div class="font-sans text-[13px] font-semibold text-oxford-blue">{{ row.studentName }}</div>
            <div class="text-[11px] font-semibold tracking-[0.04em] text-slate-body/80">{{ row.plan }}</div>
          </td>
          <!-- formatPrice turns 49 into "$49.00" -->
          <td class="whitespace-nowrap px-4 py-4 font-semibold text-oxford-blue">{{ formatPrice(row.amount) }}</td>
          <!-- formatPaymentMethod turns "card" into "Credit / Debit Card" -->
          <td class="px-4 py-4 text-slate-body/80">{{ formatPaymentMethod(row.methodId) }}</td>
          <td class="whitespace-nowrap px-4 py-4 text-slate-body/80">{{ row.timestampLabel }}</td>
          <td class="px-4 py-4">
            <AdminStatusBadge :tone="getBadge(row.status).tone">{{ getBadge(row.status).label }}</AdminStatusBadge>
          </td>
        </tr>
      </tbody>
    </table>
  </AdminTableCard>
</template>
