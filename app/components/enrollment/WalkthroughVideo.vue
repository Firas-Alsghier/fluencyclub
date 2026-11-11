<script setup>
// Video settings (from app/utils/siteConfig.js)
const video = WALKTHROUGH_VIDEO

// true only when a real video address was added in siteConfig.js
const hasVideo = Boolean(video.videoUrl)

// Links to HTML elements (filled in by Vue after the page is drawn)
const dialogRef = ref(null)
const videoElementRef = ref(null)

// Open the video window. showModal() also traps the keyboard focus and closes with the Escape key.
function openVideoDialog() {
  // The ?. means: only do it if the dialog element exists
  dialogRef.value?.showModal()
}

// Close the video window
function closeVideoDialog() {
  dialogRef.value?.close()
}

// Close the window when the student clicks the dark area outside the white box
function handleDialogClick(event) {
  // Clicks on the dark backdrop have the dialog itself as their target
  if (event.target === dialogRef.value) closeVideoDialog()
}

// Stop the video when the window closes (so the sound does not keep playing)
function pauseVideo() {
  videoElementRef.value?.pause()
}
</script>

<template>
  <!-- Walkthrough card: text on the left, video thumbnail on the right -->
  <section aria-labelledby="walkthrough-heading" class="mb-6 rounded-xl border border-border-subtle bg-white p-4 shadow-card sm:p-6">
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div class="max-w-md">
        <div class="mb-1 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-deep-teal">
          <AppIcon name="play_circle" class="text-[16px]" />
          <span>Quick Walkthrough</span>
        </div>
        <h2 id="walkthrough-heading" class="text-lg font-semibold text-oxford-blue">How to Join the Speaking Club</h2>
        <p class="mt-1 text-sm text-slate-body/85">
          Watch this 60-second walkthrough to see how phone-based WhatsApp pairing works before your first seminar.
        </p>
      </div>

      <!-- Thumbnail. It is a real button so keyboard users can open the video too. -->
      <button
        type="button"
        aria-label="Play the walkthrough video"
        class="group relative h-36 w-full shrink-0 overflow-hidden rounded-lg bg-oxford-blue shadow-xs md:w-72"
        @click="openVideoDialog"
      >
        <img
          v-if="video.posterUrl"
          :src="video.posterUrl"
          alt=""
          class="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <!-- Dark layer on top of the image -->
        <span class="absolute inset-0 bg-oxford-blue/30 transition-colors group-hover:bg-oxford-blue/20"></span>
        <!-- Play button -->
        <span class="absolute inset-0 flex items-center justify-center">
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-oxford-blue shadow-md transition-transform group-hover:scale-110">
            <AppIcon name="play_arrow" class="translate-x-0.5 text-[28px]" />
          </span>
        </span>
        <!-- Length of the video (shown only when it is set in siteConfig.js) -->
        <span v-if="video.durationLabel" class="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {{ video.durationLabel }}
        </span>
      </button>
    </div>

    <!-- Video window (a native <dialog>). It is hidden until showModal() is called. -->
    <dialog
      ref="dialogRef"
      aria-labelledby="walkthrough-dialog-title"
      class="m-auto w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-xl bg-white p-0 text-oxford-blue shadow-xl backdrop:bg-oxford-blue/70 backdrop:backdrop-blur-sm"
      @click="handleDialogClick"
      @close="pauseVideo"
    >
      <div>
        <!-- Window title bar -->
        <div class="flex items-center justify-between bg-surface-low p-4">
          <div class="flex items-center gap-2">
            <AppIcon name="smart_display" class="text-deep-teal" />
            <h3 id="walkthrough-dialog-title" class="text-lg font-semibold">Club Onboarding Walkthrough</h3>
          </div>
          <button
            type="button"
            aria-label="Close video"
            class="flex h-8 w-8 items-center justify-center rounded-full text-slate-body transition-colors hover:bg-surface-mid"
            @click="closeVideoDialog"
          >
            <AppIcon name="close" />
          </button>
        </div>

        <!-- Video area: the real video, or a clear placeholder while there is no video -->
        <div class="aspect-video bg-oxford-blue">
          <video v-if="hasVideo" ref="videoElementRef" :src="video.videoUrl" controls preload="none" class="h-full w-full"></video>
          <div v-else class="flex h-full flex-col items-center justify-center gap-2 p-6 text-center text-white">
            <AppIcon name="smart_display" class="text-[48px] text-soft-amber" />
            <p class="text-lg font-semibold">Walkthrough video coming soon</p>
            <p class="max-w-sm text-sm text-white/80">The video has not been added yet. You can continue with your enrollment below.</p>
          </div>
        </div>

        <!-- Bottom bar with a button to close the window -->
        <div class="flex justify-end bg-surface-low p-4">
          <button
            type="button"
            class="h-11 rounded-lg bg-oxford-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-oxford-light"
            @click="closeVideoDialog"
          >
            Got it, Start Registration
          </button>
        </div>
      </div>
    </dialog>
  </section>
</template>
