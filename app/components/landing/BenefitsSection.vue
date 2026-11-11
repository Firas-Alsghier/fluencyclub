<script setup>
// The six benefit cards. Same fields as in the About section.
const benefits = [
  {
    icon: 'psychology',
    title: 'Improve Speaking Confidence',
    description: 'Speak more in one single week than in six months of standard app tapping or grammar exercise books. Feel the nervousness melt away.',
    tone: 'blue',
  },
  {
    icon: 'forum',
    title: 'Practice Real Conversations',
    description: 'Engage in spontaneous dialogue that mirrors real international work scrums, job interviews, networking parties, and travels.',
    tone: 'teal',
  },
  {
    icon: 'school',
    title: 'Experienced Teachers',
    description: 'Our friendly moderators are certified language coaches skilled at pulling quieter members into effortless, relaxed discussions.',
    tone: 'blue',
  },
  {
    icon: 'public',
    title: 'Meet Global Learners',
    description: 'Make authentic friendships with ambitious tech professionals, designers, engineers, and creators from over 40 countries worldwide.',
    tone: 'teal',
  },
  {
    icon: 'schedule',
    title: 'Flexible Learning Times',
    description: 'Morning, afternoon, and evening slots running around the clock. Book your session 30 minutes before it starts or drop in whenever free.',
    tone: 'blue',
  },
  {
    icon: 'favorite',
    title: 'Supportive Environment',
    description: 'Mistakes are cheered as proof of progress. Our zero-pressure culture ensures you never feel embarrassed trying new phrases.',
    tone: 'teal',
  },
]
</script>

<template>
  <!-- BENEFITS: why join the club -->
  <LandingSectionContainer id="benefits" aria-labelledby="benefits-heading" background="offWhite">
    <LandingSectionHeader
      heading-id="benefits-heading"
      eyebrow="Why FluencyClub"
      title="Everything You Need to Break the Language Barrier"
      description="Speaking anxiety disappears when speaking becomes a habitual daily routine instead of an occasional stress test."
    />

    <!-- 1 column on phones, 2 on tablets, 3 on desktop. "roomy" gives the bigger card style. -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <LandingFeatureCard v-for="benefit in benefits" :key="benefit.title" v-bind="benefit" roomy />
    </div>
  </LandingSectionContainer>
</template>
