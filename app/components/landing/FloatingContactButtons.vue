<script setup>
// WhatsApp and Telegram links (from app/utils/siteConfig.js)
const contactLinks = CONTACT_LINKS

// The two round buttons, from top to bottom.
// name = used for the label, tooltip = hover text, icon = icon name, colorClass = button color
const contactButtons = [
  { name: 'Telegram', tooltip: 'Chat with teacher on Telegram', href: contactLinks.telegram, icon: 'send', colorClass: 'bg-[#229ED9]' },
  { name: 'WhatsApp', tooltip: 'Chat with teacher on WhatsApp', href: contactLinks.whatsapp, icon: 'chat', colorClass: 'bg-[#25D366]' },
]
</script>

<template>
  <!-- Stays in the bottom-right corner of the screen while scrolling -->
  <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
    <div v-for="button in contactButtons" :key="button.name" class="group relative flex items-center">
      <!-- Tooltip: appears on hover or keyboard focus. Hidden on small phones. -->
      <span class="pointer-events-none mr-3 hidden whitespace-nowrap rounded-lg bg-oxford-blue px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 sm:block">
        {{ button.tooltip }}
      </span>
      <a
        :href="button.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${button.name} direct chat`"
        class="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform motion-safe:hover:scale-110 motion-safe:active:scale-95"
        :class="button.colorClass"
      >
        <AppIcon :name="button.icon" class="text-[24px]" />
      </a>
    </div>
  </div>
</template>
