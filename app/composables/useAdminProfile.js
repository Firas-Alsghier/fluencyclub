// The signed-in admin (name and role) for the sidebar and the top bar.
// Right now it returns SAMPLE data. When real login exists, return the real admin here.
export function useAdminProfile() {
  // The profile object ({ fullName, firstName, role })
  return ADMIN_SAMPLE_PROFILE
}
