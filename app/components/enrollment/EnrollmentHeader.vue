<template>
  <!-- Fixed top bar: Back to Home on the left, branding in the middle, page label on the right -->
  <header class="fixed top-0 z-50 w-full bg-off-white/80 shadow-[0_1px_8px_rgba(0,32,70,0.04)] backdrop-blur-xl">
    <div class="mx-auto flex h-20 max-w-7xl items-center px-4 lg:px-10">
      <!-- Left: link back to the landing page. flex-1 keeps the branding centered. -->
      <div class="flex flex-1">
        <NuxtLink to="/" class="flex items-center gap-1 text-slate-body transition-colors hover:text-oxford-blue">
          <AppIcon name="arrow_back" class="text-[20px]" />
          <span class="text-sm font-semibold">Back to Home</span>
        </NuxtLink>
      </div>

      <!-- Middle: branding -->
      <div class="flex items-center gap-2">
        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-oxford-blue text-white">
          <AppIcon name="record_voice_over" class="text-[20px]" />
        </span>
        <span class="flex flex-col">
          <span class="text-xl font-semibold leading-tight tracking-tight text-oxford-blue">FluencyClub</span>
          <span class="text-xs font-medium uppercase tracking-wider text-slate-body">Speaking Club</span>
        </span>
      </div>

      <!-- Right: label of the current page (hidden on small phones) -->
      <div class="flex flex-1 justify-end">
        <span class="hidden rounded-lg bg-oxford-blue px-4 py-1 text-sm font-semibold text-white sm:inline-flex" aria-current="page">
          Enrollment
        </span>
      </div>
    </div>
  </header>
</template>
