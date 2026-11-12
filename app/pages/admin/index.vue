<script setup>
// Use the admin layout (sidebar + top bar) for this page. See app/layouts/admin.vue.
definePageMeta({ layout: 'admin' })

// An admin page must not appear in search engines
useSeoMeta({
  title: 'Admin Overview – FluencyClub',
  robots: 'noindex, nofollow',
})

// All the data of this page comes from one place. Today it is sample data. Later it will come from the backend.
const { nextSessionText, summary, registrations, transactions } = useAdminOverview()
</script>

<template>
  <!-- One column. gap-8 (2rem) gives the same space between all four blocks. -->
  <div class="flex flex-col gap-8">
    <!-- 1. Top banner -->
    <AdminOverviewBanner :next-session-text="nextSessionText" />

    <!-- 2. Summary cards: 1 per row on phones, 2 on tablets, 4 on wide screens -->
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <h2 class="sr-only">Summary statistics</h2>
      <AdminStatCard v-for="stat in summary" :key="stat.id" :stat="stat" />
    </section>

    <!-- 3. Recent Registrations (full width) -->
    <AdminRecentRegistrations :registrations="registrations" />

    <!-- 4. Recent Transactions (full width) -->
    <AdminRecentTransactions :transactions="transactions" />
  </div>
</template>
