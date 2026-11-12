// SAMPLE DATA for the admin Overview page. NONE of this is real.
// It exists so the page can be designed and tested before the backend is ready.
// When the backend is ready, replace the data in app/composables/useAdminOverview.js. The components do not change.
// (Names use example.com emails and fictional phone numbers. Texts like "Today, 10:15 AM" are already formatted for display.)

// The signed-in admin. PLACEHOLDER until real login exists.
export const ADMIN_SAMPLE_PROFILE = {
  fullName: 'Sarah Jenkins',
  firstName: 'Sarah',
  role: 'Platform Director',
}

// Optional text for the banner, for example '42 mins'. Empty = the "Next session" part is hidden.
export const ADMIN_SAMPLE_NEXT_SESSION = ''

// The four summary cards. "footer" tells the card which bottom row to draw:
// 'trend' (a green change badge + caption), 'progress' (a label + progress bar), or 'action' (a badge + a button).
export const ADMIN_SAMPLE_SUMMARY = [
  {
    id: 'total-students',
    label: 'Total Students',
    value: '1,480',
    valueClass: 'text-oxford-blue',
    icon: 'groups',
    iconClasses: 'bg-oxford-blue/10 text-oxford-blue',
    footer: { type: 'trend', trend: '+12.4%', caption: 'Registered learners' },
  },
  {
    id: 'active-students',
    label: 'Active Students',
    value: '1,120',
    valueClass: 'text-deep-teal',
    icon: 'verified_user',
    iconClasses: 'bg-deep-teal/15 text-deep-teal',
    // percent = how full the progress bar is (0 to 100)
    footer: { type: 'progress', label: 'Active 30-Day Pass', rateText: '84.8% Rate', percent: 84.8 },
  },
  {
    id: 'expired-students',
    label: 'Expired Students',
    value: '360',
    valueClass: 'text-slate-900',
    icon: 'person_off',
    iconClasses: 'bg-soft-amber/25 text-amber-ink',
    footer: { type: 'action', chip: '28 due for renewal', actionLabel: 'Remind' },
  },
  {
    id: 'total-revenue',
    label: 'Total Revenue (30d)',
    value: '$54,880',
    valueClass: 'text-oxford-blue',
    icon: 'account_balance_wallet',
    iconClasses: 'bg-[#99efe5]/50 text-deep-teal',
    footer: { type: 'trend', trend: '+18.2% MoM', caption: 'Memberships & extensions' },
  },
]

// Recent registrations. status: 'active', 'pending' or 'expired'. isToday: true counts for the "New Today" badge.
export const ADMIN_SAMPLE_REGISTRATIONS = [
  { id: 'r1', name: 'Camila Duarte', email: 'camila.d@example.com', phone: '+55 11 99999-0001', country: 'Brazil (BR)', registeredAtLabel: 'Today, 10:15 AM', isToday: true, status: 'active' },
  { id: 'r2', name: 'Kenji Takahashi', email: 'k.takahashi@example.com', phone: '+81 90 0000 0002', country: 'Japan (JP)', registeredAtLabel: 'Today, 09:40 AM', isToday: true, status: 'active' },
  { id: 'r3', name: 'Elena Rostova', email: 'e.rostova@example.com', phone: '+49 152 0000 0003', country: 'Germany (DE)', registeredAtLabel: 'Today, 08:12 AM', isToday: true, status: 'active' },
  { id: 'r4', name: 'Mateo Hernandez', email: 'm.hernandez@example.com', phone: '+34 600 000 004', country: 'Spain (ES)', registeredAtLabel: 'Oct 23, 11:30 PM', isToday: false, status: 'pending' },
  { id: 'r5', name: 'Amira Al-Mansoor', email: 'amira.m@example.com', phone: '+971 50 000 0005', country: 'UAE (AE)', registeredAtLabel: 'Oct 23, 07:15 PM', isToday: false, status: 'active' },
]

// Recent transactions. methodId uses the same ids as the checkout ('card', 'bank', 'wallet').
// status: 'completed', 'pending' or 'failed'. amount is a number in US dollars.
export const ADMIN_SAMPLE_TRANSACTIONS = [
  { id: 't1', studentName: 'Camila Duarte', plan: '30-Day Speaking Pass', amount: 49, methodId: 'card', timestampLabel: 'Today, 10:15 AM', status: 'completed' },
  { id: 't2', studentName: 'Kenji Takahashi', plan: '30-Day Speaking Pass', amount: 49, methodId: 'wallet', timestampLabel: 'Today, 09:40 AM', status: 'completed' },
  { id: 't3', studentName: 'Elena Rostova', plan: 'Month 2 Renewal', amount: 49, methodId: 'wallet', timestampLabel: 'Today, 08:12 AM', status: 'completed' },
  { id: 't4', studentName: 'Arthur Pendelton', plan: '30-Day Speaking Pass', amount: 49, methodId: 'card', timestampLabel: 'Yesterday, 04:22 PM', status: 'failed' },
  { id: 't5', studentName: 'Amira Al-Mansoor', plan: '30-Day Speaking Pass', amount: 49, methodId: 'card', timestampLabel: 'Yesterday, 07:15 PM', status: 'completed' },
  { id: 't6', studentName: 'Sofia Martinez', plan: '30-Day Speaking Pass', amount: 49, methodId: 'bank', timestampLabel: 'Yesterday, 02:10 PM', status: 'pending' },
]
