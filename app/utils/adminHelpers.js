// Small helpers shared by the admin components.

// Make the initials of a name: "Camila Duarte" becomes "CD". A single word uses its first two letters.
export function getInitials(fullName) {
  // Split the name into words (and ignore extra spaces)
  const words = String(fullName ?? '').trim().split(/\s+/).filter(Boolean)
  // No name at all: show a question mark
  if (words.length === 0) return '?'
  // One word: use its first two letters
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  // Two or more words: first letter of the first word + first letter of the last word
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

// The color combinations an avatar can have (all from the FluencyClub palette)
const AVATAR_COLOR_CLASSES = [
  'bg-oxford-blue text-white',
  'bg-surface-high text-oxford-blue',
  'bg-deep-teal/15 text-deep-teal',
  'bg-soft-amber/30 text-amber-ink',
]

// Pick an avatar color from the name. The same name always gets the same color.
export function getAvatarColorClasses(fullName) {
  // Add up the character codes of the name
  let total = 0
  for (const character of String(fullName ?? '')) total += character.codePointAt(0)
  // Use the remainder to choose one of the colors
  return AVATAR_COLOR_CLASSES[total % AVATAR_COLOR_CLASSES.length]
}

// Label and color tone of each membership status in the Recent Registrations table
export const REGISTRATION_STATUS_BADGES = {
  active: { label: 'Active Member', tone: 'success' },
  pending: { label: 'Pending Verification', tone: 'warning' },
  expired: { label: 'Expired', tone: 'neutral' },
}

// Label and color tone of each payment status in the Recent Transactions table
export const TRANSACTION_STATUS_BADGES = {
  completed: { label: 'Completed', tone: 'success' },
  pending: { label: 'Pending', tone: 'warning' },
  failed: { label: 'Failed', tone: 'danger' },
}

// Get the badge for a status. An unknown status is shown in neutral grey. It is never shown as a success.
export function getStatusBadge(badgeMap, status) {
  // Use the known badge, or a safe grey one
  return badgeMap[status] ?? { label: String(status || 'Unknown'), tone: 'neutral' }
}
