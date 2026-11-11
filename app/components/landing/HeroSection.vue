<script setup>
// Placeholder rating and member count (from app/utils/siteConfig.js)
const socialProof = SOCIAL_PROOF

// Hero photo address (from app/utils/siteConfig.js)
const sessionImageUrl = HERO_IMAGE_URL

// Small circles with initials. PLACEHOLDER content, not real students.
const avatars = [
  // initials = text inside the circle, colorClasses = Tailwind colors of the circle
  { initials: 'MK', colorClasses: 'bg-oxford-blue text-white' },
  { initials: 'AR', colorClasses: 'bg-deep-teal text-white' },
  { initials: 'SL', colorClasses: 'bg-soft-amber text-oxford-blue' },
  { initials: '+1k', colorClasses: 'bg-slate-200 text-oxford-blue' },
]

// PLACEHOLDER texts for the demo "live session" card. They are not real session data.
const liveSession = {
  // Text in the top-left badge
  statusLabel: 'Live Group in Progress',
  // Text in the top-right badge
  membersLabel: '5/6 Members',
  // Topic line above the room name
  topic: 'Topic: Global Careers & Remote Work',
  // Big room name
  roomName: 'Room #4 — Intermediate B2',
  // Title in the bottom bar
  nextTitle: 'Next Session Starts',
  // Details in the bottom bar
  nextDetails: 'In 14 minutes · B2/C1 Practice',
}
</script>

<template>
  <!-- HERO: headline, two buttons, social proof, and a live session preview card -->
  <section
    id="hero"
    aria-labelledby="hero-heading"
    class="relative w-full overflow-hidden bg-linear-to-b from-white via-off-white to-off-white py-16 lg:py-24"
  >
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <!-- Left side: text and buttons -->
        <div class="flex flex-col items-start gap-6 lg:col-span-7">
          <!-- Small badge above the headline -->
          <p class="inline-flex items-center gap-2 rounded-full border border-deep-teal/20 bg-deep-teal/10 px-4 py-1.5 text-deep-teal">
            <AppIcon name="auto_awesome" class="text-[18px]" />
            <span class="text-xs font-bold uppercase tracking-wider">Live Daily Groups · Max 6 Students · Native &amp; C2 Mentors</span>
          </p>

          <h1 id="hero-heading" class="text-4xl font-extrabold leading-[1.15] tracking-tight text-oxford-blue sm:text-5xl lg:text-6xl">
            Speak English with
            <span class="bg-linear-to-r from-oxford-blue via-deep-teal to-deep-teal-light bg-clip-text text-transparent">Confidence.</span>
          </h1>

          <p class="max-w-2xl text-lg leading-relaxed text-slate-body/85">
            Overcome the fear of speaking. Join daily live conversational sessions with supportive peers and certified teachers. No homework, no boring grammar drills — just real talk.
          </p>

          <!-- Buttons: full width on phones, normal width on bigger screens -->
          <div class="flex w-full flex-wrap items-center gap-4 pt-2 sm:w-auto">
            <BaseButton size="lg" class="w-full sm:w-auto">
              <span>Join the Speaking Club</span>
              <AppIcon name="arrow_forward" class="text-[20px]" />
            </BaseButton>
            <BaseButton to="/#how-it-works" variant="outline" size="lg" class="w-full sm:w-auto">
              <span>Explore How It Works</span>
              <AppIcon name="south" class="text-[18px] text-deep-teal" />
            </BaseButton>
          </div>

          <!-- Social proof (PLACEHOLDER numbers) -->
          <div class="flex items-center gap-4 pt-4">
            <div class="flex -space-x-3">
              <span
                v-for="avatar in avatars"
                :key="avatar.initials"
                class="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ring-2 ring-white"
                :class="avatar.colorClasses"
              >
                {{ avatar.initials }}
              </span>
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-1 text-soft-amber">
                <!-- 5 filled stars -->
                <AppIcon v-for="star in 5" :key="star" name="star" filled class="text-[20px]" />
                <span class="ml-1.5 text-sm font-extrabold text-oxford-blue">{{ socialProof.rating }}/5</span>
              </div>
              <span class="text-sm text-slate-body/80">Trusted by {{ socialProof.memberCount }} active club members</span>
            </div>
          </div>
        </div>

        <!-- Right side: live session preview card -->
        <div class="relative flex justify-center lg:col-span-5">
          <!-- Soft colored glows behind the card (decoration only) -->
          <div class="pointer-events-none absolute -right-6 -top-6 h-64 w-64 rounded-full bg-deep-teal/10 blur-3xl" aria-hidden="true"></div>
          <div class="pointer-events-none absolute -bottom-6 -left-6 h-60 w-60 rounded-full bg-oxford-blue/10 blur-3xl" aria-hidden="true"></div>

          <div class="relative w-full rounded-2xl border border-border-subtle bg-white p-3 shadow-xl">
            <!-- Photo area with texts on top -->
            <div class="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-xl bg-slate-900 p-5">
              <img
                :src="sessionImageUrl"
                alt="People talking together in a live video session"
                class="absolute inset-0 h-full w-full object-cover"
                width="800"
                height="600"
                fetchpriority="high"
              />
              <!-- Dark blue layer so the white text is easy to read -->
              <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-oxford-blue/90 via-oxford-blue/20 to-oxford-blue/50"></div>

              <!-- Top badges -->
              <div class="relative z-10 flex w-full items-center justify-between">
                <div class="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 shadow-xs backdrop-blur-md">
                  <!-- Pulsing green dot (the pulse stops for people who prefer less motion) -->
                  <span class="relative flex h-2.5 w-2.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-deep-teal opacity-75 motion-reduce:animate-none"></span>
                    <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-deep-teal"></span>
                  </span>
                  <span class="text-xs font-bold text-oxford-blue">{{ liveSession.statusLabel }}</span>
                </div>
                <div class="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-oxford-blue backdrop-blur-md">
                  {{ liveSession.membersLabel }}
                </div>
              </div>

              <!-- Bottom text -->
              <div class="relative z-10 flex flex-col gap-1 text-white">
                <div class="inline-flex items-center gap-1.5 text-xs text-white/90">
                  <AppIcon name="record_voice_over" class="text-[16px] text-soft-amber" />
                  <span>{{ liveSession.topic }}</span>
                </div>
                <p class="text-lg font-bold tracking-tight">{{ liveSession.roomName }}</p>
              </div>
            </div>

            <!-- Bar under the photo -->
            <div class="mt-3 flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-off-white p-3.5">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-deep-teal/15 text-deep-teal">
                  <AppIcon name="schedule" class="text-[20px]" />
                </div>
                <div>
                  <p class="text-xs font-bold text-oxford-blue">{{ liveSession.nextTitle }}</p>
                  <p class="text-xs text-slate-body/80">{{ liveSession.nextDetails }}</p>
                </div>
              </div>
              <BaseButton variant="teal" size="sm" class="shrink-0">Join Slot</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
