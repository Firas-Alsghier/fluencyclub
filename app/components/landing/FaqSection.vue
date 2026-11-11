<script setup>
// All questions and answers
const faqs = [
  {
    question: 'How do the live speaking sessions work?',
    answer: 'Each day we offer multiple speaking slots in the morning, afternoon, and evening. You choose your slot and join a small live video room of 4–6 learners matched to your level. A certified teacher moderates the discussion with conversation starters, vocabulary insights, and friendly feedback.',
  },
  {
    question: 'How can I join the speaking club?',
    answer: 'Simply click "Join Now" or select the 30-Day Pass. Complete your student profile and secure checkout. Immediately after enrollment, our dedicated teacher will contact you directly on your phone number via WhatsApp or Telegram to welcome you and share upcoming sessions.',
  },
  {
    question: 'Do I need to create an account or remember passwords?',
    answer: 'No! There are zero passwords to remember. Your membership is connected to your verified phone number. All schedules, updates, materials, and Zoom links are shared directly through your personal teacher contact.',
  },
  {
    question: 'How does the teacher personally contact me?',
    answer: 'Right after your enrollment is confirmed, an assigned academic coach reviews your details and sends you a personal message on WhatsApp or Telegram. They help assess your current comfort level and provide direct calendar invitations.',
  },
  {
    question: 'How long does my membership last and does it auto-renew?',
    answer: "Your membership lasts for 30 calendar days from the day you attend your very first live session. There are strictly NO auto-renewals or unexpected recurring charges. When the 30 days conclude, you can choose if you'd like to extend.",
  },
]

// Number (position) of the question that is open now. null means all are closed.
const openIndex = ref(null)

// Called when a question is clicked. "index" is the position of that question in the list.
function toggleFaq(index) {
  // If it is already open, close it (null). If not, open it and close the others.
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <!-- FAQ: questions that open and close when clicked -->
  <LandingSectionContainer id="faq" aria-labelledby="faq-heading" narrow>
    <LandingSectionHeader
      heading-id="faq-heading"
      eyebrow="Got Questions?"
      title="Frequently Asked Questions"
      description="Everything you need to know about our speaking club, sessions, and teacher onboarding."
    />

    <ul class="flex flex-col gap-3">
      <li
        v-for="(faq, index) in faqs"
        :key="faq.question"
        class="overflow-hidden rounded-xl border border-border-subtle bg-white"
      >
        <h3>
          <!-- Question button. aria-expanded tells screen readers if the answer is open. -->
          <button
            type="button"
            :id="`faq-button-${index}`"
            class="flex w-full items-center justify-between gap-4 p-6 text-left"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-panel-${index}`"
            @click="toggleFaq(index)"
          >
            <span class="text-base font-bold text-oxford-blue sm:text-lg">{{ faq.question }}</span>
            <!-- Arrow icon: turns upside down when the answer is open -->
            <AppIcon
              name="expand_more"
              class="shrink-0 text-[24px] text-deep-teal transition-transform duration-200"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>
        </h3>

        <!-- Answer: only visible when this question is the open one -->
        <div
          v-show="openIndex === index"
          :id="`faq-panel-${index}`"
          role="region"
          :aria-labelledby="`faq-button-${index}`"
          class="border-t border-slate-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-body/85"
        >
          {{ faq.answer }}
        </div>
      </li>
    </ul>
  </LandingSectionContainer>
</template>
