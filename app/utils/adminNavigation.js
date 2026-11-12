// The links of the admin sidebar, from top to bottom.
// NOTE: only /admin (Overview) exists so far. The other pages are not built yet, so those links show Nuxt's 404 page for now.
// Each item has: label (text), to (page address), icon (icon name), and an optional badgeCount (small number badge).
export const ADMIN_NAV_ITEMS = [
  { label: 'Overview', to: '/admin', icon: 'dashboard' },
  { label: 'Students', to: '/admin/students', icon: 'group' },
  { label: 'Live Sessions', to: '/admin/live-sessions', icon: 'video_camera_front' },
  { label: 'Payments', to: '/admin/payments', icon: 'credit_card' },
  // PLACEHOLDER count. It should come from the backend later.
  { label: 'Notifications', to: '/admin/notifications', icon: 'notifications', badgeCount: 3 },
  { label: 'Communications', to: '/admin/communications', icon: 'forum' },
  { label: 'Reports & Analytics', to: '/admin/reports', icon: 'bar_chart' },
  { label: 'Settings', to: '/admin/settings', icon: 'settings' },
]
