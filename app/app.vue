<script setup>
// Google Fonts address for the main font (Plus Jakarta Sans)
const mainFontUrl =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'

// Names of every icon used on the site. Keep this list in A-Z order.
// If you use a new icon later, add its name here, otherwise you will see the icon name as text.
const iconNames = [
  'arrow_back', 'arrow_forward', 'auto_awesome', 'bolt', 'calendar_today', 'chat',
  'chat_bubble_outline', 'check', 'check_circle', 'close', 'diversity_3', 'error',
  'expand_more', 'favorite', 'forum', 'groups', 'groups_2', 'info', 'lock',
  'lock_clock', 'lock_open', 'menu', 'play_arrow', 'play_circle', 'psychology',
  'public', 'record_voice_over', 'schedule', 'school', 'search', 'send',
  'sentiment_very_satisfied', 'shield_with_heart', 'smart_display', 'south', 'star',
  'tips_and_updates', 'verified', 'verified_user',
]

// Google Fonts address for the icon font. It only downloads the icons listed above (small and fast).
const iconFontUrl =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@24,400,0..1' +
  `&icon_names=${iconNames.join(',')}&display=block`

// Add the language and the font links to the <head> of every page
useHead({
  // Tell browsers the page is in English
  htmlAttrs: { lang: 'en' },
  link: [
    // Open the connection to Google Fonts early (faster loading)
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    // Load the main font
    { rel: 'stylesheet', href: mainFontUrl },
    // Load the icon font
    { rel: 'stylesheet', href: iconFontUrl },
  ],
})
</script>

<template>
  <!-- Show the page that matches the current address (files inside app/pages) -->
  <NuxtPage />
</template>
