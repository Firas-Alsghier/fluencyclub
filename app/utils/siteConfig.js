// This file keeps small facts that are used in many places.
// Change a value here and the whole website updates.
// Nuxt imports everything exported from app/utils automatically, so no import line is needed.

// The page where students sign up. Every "Join" button goes here.
export const JOIN_PAGE_PATH = '/join'

// Membership details shown in the pricing section
// The price as a number. $49 is a TEMPORARY display value: change THIS number and everything updates.
const PRICE_AMOUNT = 49

// Processing fee in dollars (the design shows it as waived)
const PROCESSING_FEE = 0

export const MEMBERSHIP = {
  // The price as a number (used for math)
  priceAmount: PRICE_AMOUNT,
  // The price as short text, for example "$49" (used on the landing page and the heading)
  priceLabel: `$${PRICE_AMOUNT}`,
  // The small text shown next to the price
  priceNote: '/ one-time payment',
  // The processing fee as a number
  processingFee: PROCESSING_FEE,
  // The total the student pays today (price + fee)
  totalDue: PRICE_AMOUNT + PROCESSING_FEE,
}

// Turn a number into price text with cents, for example 49 becomes "$49.00"
export function formatPrice(amount) {
  // toFixed(2) always shows two decimals
  return `$${amount.toFixed(2)}`
}

// WhatsApp and Telegram links. These are PLACEHOLDERS for now.
export const CONTACT_LINKS = {
  // Later use something like 'https://wa.me/1234567890'
  whatsapp: 'https://wa.me/',
  // Later use something like 'https://t.me/yourname'
  telegram: 'https://t.me/',
}

// PLACEHOLDER numbers from the design. They are NOT real data. Replace them with real numbers later.
export const SOCIAL_PROOF = {
  // Average star rating
  rating: '4.9',
  // Number of club members
  memberCount: '1,200+',
}

// TEMPORARY hero photo that came from the Google Stitch design.
// Later: download your own photo, save it in public/images/, and use a path like '/images/hero-session.jpg'.
export const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB14fuM3ECV-IZXVmwhx9Pz5RHZk9Y2uZRSunU4mzsQWbPnB4Ij7cpg1h4JPzFuidi8SYrofuOSl0t3Ou-lLfFc2LnsZh3F0R1jlMZcwyWchRGoZY2-hLOljEPF1Qdv6DMtYnwBGVaQmIG4RQd9t8YPtFj8G0S2YrezGaxe2_iLLov2eUysPN8NGr-Q6jJdVQUJvf5WQn9UtoLek_WPbbSpcLJ2Vw4f6dTT5DO8VeE'

// Links in the top navigation bar. "/#about" means: go to the home page, then scroll to the section with id="about".
export const NAV_LINKS = [
  // isCurrent: true makes the link bold (the design shows "Home" as bold)
  { label: 'Home', href: '/#hero', isCurrent: true },
  { label: 'About', href: '/#about' },
  { label: 'Benefits', href: '/#benefits' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
]

// ---- Enrollment page settings ----

// The youngest age allowed to join
export const MIN_STUDENT_AGE = 16

// The oldest age accepted (this only catches typing mistakes like 250)
export const MAX_STUDENT_AGE = 99

// The "How to join" walkthrough video. There is NO real video yet.
export const WALKTHROUGH_VIDEO = {
  // PLACEHOLDER: leave empty until you have a real video file.
  // Later put its address here, for example '/videos/walkthrough.mp4' (file saved in public/videos/).
  videoUrl: '',
  // TEMPORARY thumbnail from the Google Stitch design. Replace it with your own image later.
  posterUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAAYng1u3SWEkhNkOUja95RlJMARjDeeWKimvW0nnYLBBTQozp78RgxkHSbetQ13koLvmVDN69yiuROb99yqViCFN5ymMTOSl1MVarWBT-DAwKOUkoE9CPA7ZxjvXuYPAVKvKaFSfC5f_78TJX4SKIcIA0PWdbTVMI8iQ9HXqectFRTohHgMAUn5Rh4KhHAzM42JLzMHvfUC7OrO97JWd2huApF4qJOUJ5d0I5le9o',
  // Length shown on the thumbnail, for example '1:14 min'. Leave empty until the video exists.
  durationLabel: '',
}

// ---- Confirmation page settings ----

// The page that confirms a payment. A payment result with a reference sends the student here.
export const SUCCESS_PAGE_PATH = '/join/success'
