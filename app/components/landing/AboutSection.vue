<script setup>
// The four cards in this section.
// Each card has: icon (icon name), title, description (text), tone (icon color: 'blue' or 'teal')
const pillars = [
  {
    icon: 'calendar_today',
    title: 'Live Daily Sessions',
    description: 'Join 45-minute interactive conversations led by experienced native and C2 level facilitators every day of the week.',
    tone: 'blue',
  },
  {
    icon: 'chat_bubble_outline',
    title: 'Real Everyday Topics',
    description: 'Career stories, tech trends, travel debacles, psychology, and relaxed banter. Never rigid textbook scripts.',
    tone: 'teal',
  },
  {
    icon: 'diversity_3',
    title: 'Friendly & Safe Space',
    description: 'Capped at 4 to 6 people matched precisely by conversational level. Everyone gets equal speaking time with zero judgment.',
    tone: 'blue',
  },
  {
    icon: 'tips_and_updates',
    title: 'Instant Vocabulary',
    description: 'Receive gentle real-time phrasing suggestions, idioms, and natural expressions dropped right into your post-call recap.',
    tone: 'teal',
  },
]
</script>

<template>
  <!-- ABOUT: what the club is and how it is different -->
  <LandingSectionContainer id="about" aria-labelledby="about-heading">
    <LandingSectionHeader
      heading-id="about-heading"
      eyebrow="About The Club"
      title="The Easiest, Most Natural Way to Build Real Fluency"
      description="Traditional classes spend 80% of time explaining rules you already know and only 20% speaking. At FluencyClub, we flip the equation: 100% active spoken dialogue in a friendly, zero-pressure atmosphere where your thoughts flow freely."
    />

    <!-- 1 column on phones, 2 on tablets, 4 on desktop -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <!-- One card for each item in the pillars list -->
      <LandingFeatureCard v-for="pillar in pillars" :key="pillar.title" v-bind="pillar" />
    </div>
  </LandingSectionContainer>
</template>
