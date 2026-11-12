<script setup>
// Google Fonts address for the main font (Plus Jakarta Sans)
const mainFontUrl =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'

// Names of every icon used on the site. Keep this list in A-Z order.
// If you use a new icon later, add its name here, otherwise you will see the icon name as text.
const iconNames = [
  'account_balance', 'account_balance_wallet', 'add', 'arrow_back', 'arrow_forward',
  'auto_awesome', 'bar_chart', 'bolt', 'calendar_today', 'chat', 'chat_bubble_outline',
  'check', 'check_circle', 'close', 'cloud_off', 'contactless', 'credit_card',
  'dashboard', 'diversity_3', 'edit', 'error', 'expand_more', 'favorite', 'forum',
  'group', 'groups', 'groups_2', 'help', 'home', 'hourglass_top', 'info', 'lock',
  'lock_clock', 'lock_open', 'logout', 'menu', 'more_vert', 'notifications', 'person',
  'person_add', 'person_off', 'play_arrow', 'play_circle', 'print',
  'progress_activity', 'psychology', 'public', 'receipt_long', 'record_voice_over',
  'refresh', 'schedule', 'school', 'search', 'search_off', 'send',
  'sentiment_very_satisfied', 'settings', 'shield_with_heart', 'smart_display',
  'south', 'star', 'stars', 'tips_and_updates', 'trending_up', 'tune', 'verified',
  'verified_user', 'video_call', 'video_camera_front',
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
  <!-- Show the page that matches the current address (files inside app/pages).
       NuxtLayout wraps it in the layout the page asks for (for example "admin"). Pages without a layout are shown as they are. -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
