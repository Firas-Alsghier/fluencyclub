<script setup>
// The rows to show. Each row: { id, name, email, phone, country, registeredAtLabel, isToday, status }
const props = defineProps({
  registrations: { type: Array, required: true },
})

// Tell the parent when the "more" button of a row is pressed (nothing listens yet)
const emit = defineEmits(['row-action'])

// How many of the registrations happened today (shown in the badge next to the title)
const newTodayCount = computed(() => props.registrations.filter((row) => row.isToday).length)

// The text of the badge. Empty text hides the badge (when nobody registered today).
const newTodayBadge = computed(() => (newTodayCount.value > 0 ? `${newTodayCount.value} New Today` : ''))

// The badge (label and tone) of a registration status
const getBadge = (status) => getStatusBadge(REGISTRATION_STATUS_BADGES, status)
</script>

<template>
  <AdminTableCard title="Recent Registrations" :badge="newTodayBadge" view-all-to="/admin/students">
    <!-- min-w keeps the columns readable. Below that width the card scrolls sideways. -->
    <table class="w-full min-w-[760px] border-collapse text-left">
      <caption class="sr-only">Most recent student registrations</caption>
      <thead>
        <tr class="bg-off-white text-[11px] font-semibold uppercase leading-[14px] tracking-[0.04em] text-slate-500">
          <th scope="col" class="px-4 py-2.5 font-semibold">Student</th>
          <th scope="col" class="px-4 py-2.5 font-semibold">Phone / Country</th>
          <th scope="col" class="px-4 py-2.5 font-semibold">Date &amp; Time</th>
          <th scope="col" class="px-4 py-2.5 font-semibold">Membership</th>
          <th scope="col" class="px-4 py-2.5"><span class="sr-only">Actions</span></th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border-subtle text-[13px] leading-[18px]">
        <tr v-for="row in registrations" :key="row.id" class="transition-colors hover:bg-slate-50">
          <td class="px-4 py-4">
            <div class="flex items-center gap-2">
              <AdminAvatar :name="row.name" />
              <div class="min-w-0">
                <div class="font-sans text-[13px] font-semibold text-oxford-blue">{{ row.name }}</div>
                <div class="truncate text-[11px] font-semibold tracking-[0.04em] text-slate-body/80">{{ row.email }}</div>
              </div>
            </div>
          </td>
          <td class="px-4 py-4 text-slate-body">
            <div class="whitespace-nowrap">{{ row.phone }}</div>
            <span class="text-[11px] font-medium text-slate-body/80">{{ row.country }}</span>
          </td>
          <td class="whitespace-nowrap px-4 py-4 text-slate-body/80">{{ row.registeredAtLabel }}</td>
          <td class="px-4 py-4">
            <AdminStatusBadge :tone="getBadge(row.status).tone">{{ getBadge(row.status).label }}</AdminStatusBadge>
          </td>
          <td class="px-4 py-4 text-right">
            <button
              type="button"
              :aria-label="`More actions for ${row.name}`"
              class="rounded p-1 text-slate-body/70 transition-colors hover:bg-surface-mid hover:text-oxford-blue"
              @click="emit('row-action', row)"
            >
              <AppIcon name="more_vert" class="text-[18px]" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </AdminTableCard>
</template>
