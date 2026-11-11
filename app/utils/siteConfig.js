// This file keeps small facts that are used in many places.
// Change a value here and the whole website updates.
// Nuxt imports everything exported from app/utils automatically, so no import line is needed.

// The page where students sign up. Every "Join" button goes here.
export const JOIN_PAGE_PATH = '/join'

// Membership details shown in the pricing section
export const MEMBERSHIP = {
  // The price text. $49 is a TEMPORARY display value. Change it here later.
  priceLabel: '$49',
  // The small text shown next to the price
  priceNote: '/ one-time payment',
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
