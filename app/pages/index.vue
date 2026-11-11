<script setup>
// Set the browser tab title and the description that search engines show
useSeoMeta({
  title: 'FluencyClub – English Speaking Club',
  description:
    'Join daily live English speaking sessions in small friendly groups with certified teachers. No homework, no boring grammar drills.',
})
</script>

<template>
  <div>
    <!-- Top bar (fixed at the top of the screen) -->
    <LandingNavbar />

    <!-- The 7 main sections, in the same order as the design. pt-20 leaves room for the fixed navbar. -->
    <main class="pt-20">
      <LandingHeroSection />
      <LandingAboutSection />
      <LandingBenefitsSection />
      <LandingHowItWorksSection />
      <LandingPricingSection />
      <LandingFaqSection />
      <LandingFinalCtaSection />
    </main>

    <LandingFooter />

    <!-- WhatsApp and Telegram buttons that stay visible while scrolling -->
    <LandingFloatingContactButtons />
  </div>
</template>
