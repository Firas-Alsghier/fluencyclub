// ALL the data of the admin Overview page comes from this one function.
// Right now it returns SAMPLE data (see app/utils/adminSampleData.js).
// TO CONNECT THE BACKEND LATER: fetch the data here (for example with useFetch('/api/admin/overview'))
// and return the same shape. The page and its components will not need to change.
export function useAdminOverview() {
  return {
    // Optional text for the banner (empty = hidden)
    nextSessionText: ADMIN_SAMPLE_NEXT_SESSION,
    // The four summary cards
    summary: ADMIN_SAMPLE_SUMMARY,
    // The rows of the Recent Registrations table
    registrations: ADMIN_SAMPLE_REGISTRATIONS,
    // The rows of the Recent Transactions table
    transactions: ADMIN_SAMPLE_TRANSACTIONS,
  }
}
