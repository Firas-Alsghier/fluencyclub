<script setup>
// The student's details from Step 1 (the parent gives them to us)
defineProps({
  student: { type: Object, required: true },
})

// Tell the parent when the student clicks "Edit Details"
const emit = defineEmits(['edit'])
</script>

<template>
  <!-- Right card: the details the student typed in Step 1 -->
  <div class="flex flex-col justify-between rounded-xl border border-surface-mid bg-surface-low p-4 shadow-xs sm:p-6">
    <div>
      <div class="mb-2 flex items-center justify-between gap-2">
        <div class="min-w-0">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-body">Student Information</p>
          <h3 class="mt-0.5 truncate text-lg font-bold text-oxford-blue">{{ student.fullName }}</h3>
        </div>
        <button
          type="button"
          class="flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-oxford-blue shadow-xs transition-colors hover:bg-surface-mid"
          @click="emit('edit')"
        >
          <AppIcon name="edit" class="text-[16px]" />
          <span>Edit Details</span>
        </button>
      </div>

      <dl class="grid grid-cols-1 gap-2 border-t border-surface-mid py-3 text-sm sm:grid-cols-2">
        <div>
          <dt class="text-xs text-slate-body">WhatsApp Phone</dt>
          <dd class="mt-0.5 flex items-center gap-1 font-medium text-oxford-blue">
            <AppIcon name="chat" class="text-[16px] text-deep-teal" />
            <span>{{ student.displayPhoneNumber }}</span>
          </dd>
        </div>
        <div>
          <dt class="text-xs text-slate-body">Country of Residence</dt>
          <dd class="mt-0.5 flex items-center gap-1 font-medium text-oxford-blue">
            <AppIcon name="public" class="text-[16px] text-deep-teal" />
            <span>{{ student.country }}</span>
          </dd>
        </div>
        <!-- The email is optional, so this row appears only when the student typed one -->
        <div v-if="student.email" class="sm:col-span-2">
          <dt class="text-xs text-slate-body">Email Address</dt>
          <dd class="mt-0.5 truncate font-medium text-oxford-blue">{{ student.email }}</dd>
        </div>
      </dl>
    </div>

    <p class="mt-2 flex items-center gap-1.5 text-xs text-slate-body">
      <AppIcon name="info" class="text-[15px] text-deep-teal" />
      <span>Your details are kept in this browser only. Nothing is sent to a server yet.</span>
    </p>
  </div>
</template>
