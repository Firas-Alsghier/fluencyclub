// All the TEXT and SETTINGS of the confirmation page that your client may want to change.
// Nothing here is a verified fact unless your client confirms it. Edit these values when the real details are ready.
// (The teacher's name, photo and qualifications are EMPTY on purpose: fill them in only with real information.)

// The welcome line in the success card
export const SUCCESS_PAGE_CONTENT = {
  welcomeMessage: "Welcome to FluencyClub! We're excited to help you build your speaking confidence.",
  // The "placement" row. The real group is decided by the teacher, so we do not claim a level or a seat.
  placementLabel: 'Group Placement',
  placementText: 'Your teacher will confirm your speaking group.',
  placementBadge: 'To be confirmed',
}

// The teacher welcome section. All values are PLACEHOLDERS until you provide real ones.
export const TEACHER_PROFILE = {
  // The teacher's real name. Leave empty to show no name.
  name: '',
  // The teacher's job title or role (for example 'Head of Speaking Cohorts'). Leave empty to hide the badge.
  role: '',
  // The teacher's real photo, for example '/images/teacher.jpg' (file saved in public/images/). Leave empty to show an icon.
  photoUrl: '',
  // The welcome message. It must not say that a message was already sent.
  message:
    'Your teacher will contact you personally on the phone number you registered. There is nothing else you need to do for now.',
}

// The three "What's Next" cards
export const NEXT_STEPS = [
  {
    number: '01', // big step number
    icon: 'chat', // icon in the colored box
    iconClasses: 'bg-deep-teal/15 text-deep-teal', // colors of the icon box
    chip: 'Phone contact', // small label in the top-right corner
    title: 'Wait for Our Teacher', // card title
    description: 'Your teacher will contact you using the phone number you provided during enrollment.', // card text
    noteIcon: 'chat', // icon of the small note at the bottom
    note: 'Uses your registered phone number', // small note at the bottom
  },
  {
    number: '02',
    icon: 'tune',
    iconClasses: 'bg-surface-high text-oxford-blue',
    chip: 'Session details',
    title: 'Receive Session Information',
    description: 'Your teacher will give you information about the upcoming speaking sessions and the schedule.',
    noteIcon: 'schedule',
    note: 'Details come from your teacher',
  },
  {
    number: '03',
    icon: 'groups',
    iconClasses: 'bg-soft-amber/20 text-[#7C4B00]',
    chip: 'Live sessions',
    title: 'Start Speaking!',
    description: 'After you receive the session information, you can begin joining the live speaking sessions.',
    noteIcon: 'record_voice_over',
    note: 'Live conversation practice',
  },
]

// The default text of the support section (WhatsApp and Telegram links are in app/utils/siteConfig.js)
export const SUPPORT_CONTENT = {
  heading: 'Have Questions?',
  text: 'If you need help with your enrollment or have a question about the sessions, feel free to contact us:',
}

// The small trust cards under the page. Replace them with real guarantees once your client confirms them.
export const SUCCESS_TRUST_ITEMS = [
  { icon: 'lock_clock', title: '30 Days Full Access', text: 'One-time fee, no recurring billing' },
  { icon: 'groups_2', title: 'Live Speaking Practice', text: 'Conversation sessions with your teacher' },
  { icon: 'lock_open', title: 'No Passwords', text: 'No account needed to join' },
  { icon: 'chat', title: 'Personal Contact', text: 'Your teacher uses your registered number' },
]

// The footer text of the confirmation page
export const SUCCESS_FOOTER = {
  notice: {
    icon: 'info',
    title: 'FluencyClub Speaking Club',
    text: 'Questions about your enrollment? Contact us on WhatsApp or Telegram.',
  },
  badges: [
    { icon: 'chat', label: 'WhatsApp & Telegram support' },
    { icon: 'lock_open', label: 'No passwords needed' },
  ],
}

// What to show for each state that is NOT a successful payment.
// tone: 'info' (teal), 'warning' (amber) or 'error' (red). canRetry: show "Check again". canGoBack: show "Back to payment".
export const STATUS_MESSAGES = {
  loading: {
    icon: 'progress_activity',
    tone: 'info',
    title: 'Verifying your payment…',
    text: 'Please wait while we confirm your payment. Do not close this page.',
    supportText: '',
    canRetry: false,
    canGoBack: false,
  },
  pending: {
    icon: 'hourglass_top',
    tone: 'warning',
    title: 'Payment pending',
    text: 'Your payment has not been confirmed yet. This can take a few minutes. Your membership starts only after the payment is confirmed.',
    supportText: 'If this takes a long time, contact us and include your payment reference.',
    canRetry: true,
    canGoBack: false,
  },
  failed: {
    icon: 'error',
    tone: 'error',
    title: 'Payment not completed',
    text: 'We could not confirm a successful payment, so your membership has not been activated. You can go back and try again.',
    supportText: 'Need help? Contact us and include your payment reference.',
    canRetry: false,
    canGoBack: true,
  },
  not_found: {
    icon: 'search_off',
    tone: 'error',
    title: "We couldn't find this payment",
    text: 'We have no payment that matches this reference. Please check the link you used.',
    supportText: 'If you completed a payment, contact us and we will help you.',
    canRetry: false,
    canGoBack: true,
  },
  invalid_reference: {
    icon: 'search_off',
    tone: 'error',
    title: 'Payment reference missing',
    text: 'This page needs a valid payment reference to confirm a payment. Nothing has been confirmed.',
    supportText: 'If you just paid, contact us and we will help you.',
    canRetry: false,
    canGoBack: true,
  },
  error: {
    icon: 'cloud_off',
    tone: 'error',
    title: "We couldn't verify your payment",
    text: 'Something went wrong while checking your payment. Please try again in a moment. Please do not pay again before checking with us.',
    supportText: 'If you were charged, contact us and include your payment reference.',
    canRetry: true,
    canGoBack: false,
  },
}
