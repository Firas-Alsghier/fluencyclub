<script setup>
// Placeholder rating and member count (from app/utils/siteConfig.js)
const socialProof = SOCIAL_PROOF

// WhatsApp and Telegram links (from app/utils/siteConfig.js)
const contactLinks = CONTACT_LINKS

// The current year, shown in the copyright line
const currentYear = new Date().getFullYear()

// Links in the "Quick Navigation" column
const quickLinks = [
  { label: 'About Speaking Club', href: '/#about' },
  { label: 'Community Benefits', href: '/#benefits' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: '30-Day Pass', href: '/#pricing' },
  { label: 'Member Questions', href: '/#faq' },
]

// Legal links. These pages do not exist yet, so for now they scroll to the top.
const legalLinks = [
  { label: 'Privacy Policy', href: '/#hero' },
  { label: 'Terms of Service', href: '/#hero' },
  { label: 'Club Guidelines', href: '/#hero' },
]
</script>

<template>
  <footer class="w-full border-t border-border-subtle bg-white pb-12 pt-16 text-slate-body">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- 4 columns on desktop, 2 on tablets, 1 on phones -->
      <div class="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <!-- Column 1: logo and short text -->
        <div>
          <div class="mb-4 flex items-center gap-2.5">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-oxford-blue text-white">
              <AppIcon name="forum" class="text-[20px]" />
            </span>
            <span class="text-xl font-extrabold tracking-tight text-oxford-blue">FluencyClub</span>
          </div>
          <p class="mb-5 text-sm leading-relaxed text-slate-body/80">
            Break speaking anxiety through daily conversational momentum and guided small sessions with certified mentors.
          </p>
          <div class="flex items-center gap-2 text-xs font-semibold text-deep-teal">
            <AppIcon name="verified_user" class="text-[18px]" />
            <span>SSL 256-Bit Encrypted &amp; Safe Checkout</span>
          </div>
        </div>

        <!-- Column 2: page links -->
        <nav aria-label="Footer">
          <h2 class="mb-4 text-sm font-bold uppercase tracking-wider text-oxford-blue">Quick Navigation</h2>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in quickLinks" :key="link.href">
              <NuxtLink :to="link.href" class="transition-colors hover:text-oxford-blue">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Column 3: WhatsApp and Telegram -->
        <div>
          <h2 class="mb-4 text-sm font-bold uppercase tracking-wider text-oxford-blue">Direct Support</h2>
          <p class="mb-4 text-sm text-slate-body/80">
            Need help choosing your club level or session time? Chat directly with an onboarding teacher.
          </p>
          <div class="flex flex-col gap-2.5 text-sm font-medium">
            <a :href="contactLinks.whatsapp" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-oxford-blue transition-colors hover:text-deep-teal">
              <AppIcon name="chat" class="text-[18px] text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
            <a :href="contactLinks.telegram" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-oxford-blue transition-colors hover:text-deep-teal">
              <AppIcon name="send" class="text-[18px] text-[#229ED9]" />
              <span>Telegram Community</span>
            </a>
          </div>
        </div>

        <!-- Column 4: rating box (PLACEHOLDER numbers) -->
        <div>
          <h2 class="mb-4 text-sm font-bold uppercase tracking-wider text-oxford-blue">Trust &amp; Quality</h2>
          <div class="rounded-2xl border border-border-subtle bg-off-white p-5 shadow-card">
            <div class="mb-2 flex items-center gap-1 text-soft-amber">
              <AppIcon v-for="star in 5" :key="star" name="star" filled class="text-[18px]" />
            </div>
            <div class="mb-1 text-sm font-bold text-oxford-blue">{{ socialProof.rating }}/5 from {{ socialProof.memberCount }} Members</div>
            <p class="text-xs text-slate-body/80">Zero boring grammar lectures. 100% active spoken dialogue.</p>
          </div>
        </div>
      </div>

      <!-- Bottom line: copyright and legal links -->
      <div class="flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 text-xs text-slate-body/70 md:flex-row">
        <p>© {{ currentYear }} FluencyClub International. All rights reserved.</p>
        <ul class="flex items-center gap-6">
          <li v-for="link in legalLinks" :key="link.label">
            <NuxtLink :to="link.href" class="transition-colors hover:text-oxford-blue">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
