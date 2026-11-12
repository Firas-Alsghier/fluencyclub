<script setup>
// The heading and text can be changed by the parent. If they are empty, the default text is used.
const props = defineProps({
  heading: { type: String, default: '' },
  text: { type: String, default: '' },
})

// The heading to show: the one from the parent, or the default one
const headingText = computed(() => props.heading || SUPPORT_CONTENT.heading)

// The text to show: the one from the parent, or the default one
const supportText = computed(() => props.text || SUPPORT_CONTENT.text)

// WhatsApp and Telegram links (placeholders from app/utils/siteConfig.js)
const contactLinks = CONTACT_LINKS
</script>

<template>
  <section aria-labelledby="support-heading" class="rounded-2xl border border-border-subtle bg-white p-6 text-center shadow-card sm:p-8">
    <span class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface-mid text-oxford-blue">
      <AppIcon name="help" />
    </span>
    <h2 id="support-heading" class="text-xl font-semibold text-oxford-blue">{{ headingText }}</h2>
    <p class="mx-auto mt-1 max-w-xl text-sm text-slate-body/85">{{ supportText }}</p>

    <!-- The links are placeholders until the real contact details are added in siteConfig.js -->
    <div class="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <a
        :href="contactLinks.whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0C7A47] px-5 text-sm font-semibold text-white shadow-xs transition-opacity hover:opacity-90 sm:w-auto"
      >
        <AppIcon name="chat" class="text-[18px]" /> Chat with Teacher on WhatsApp
      </a>
      <a
        :href="contactLinks.telegram"
        target="_blank"
        rel="noopener noreferrer"
        class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#1673A6] px-5 text-sm font-semibold text-white shadow-xs transition-opacity hover:opacity-90 sm:w-auto"
      >
        <AppIcon name="send" class="text-[18px]" /> Join Telegram Support Channel
      </a>
    </div>
  </section>
</template>
