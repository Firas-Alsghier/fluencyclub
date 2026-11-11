<script setup>
// Get the form values, the errors, and the functions from the composable
const {
  form,
  errors,
  fieldIds,
  handleFieldInput,
  handleFieldBlur,
  submitForm,
} = usePersonalDetailsForm();

// Dropdown choices (built once in app/utils)
const countryOptions = COUNTRY_OPTIONS;
const dialCodeOptions = DIAL_CODE_OPTIONS;
const genderOptions = GENDER_OPTIONS;

// Age limits (from app/utils/siteConfig.js)
const minAge = MIN_STUDENT_AGE;
const maxAge = MAX_STUDENT_AGE;

// true after the details passed validation (used to show the "ready" message)
const isReadyForNextStep = ref(false);

// Called when the student presses "Continue to Payment"
function handleSubmit() {
  // submitForm() checks everything and returns true when the details are valid
  isReadyForNextStep.value = submitForm();
}

// The three small facts in the blue box
const inclusions = [
  { icon: 'groups', text: 'Max 6 Students Per Club' },
  { icon: 'schedule', text: 'Daily Flexible Timeslots' },
  { icon: 'psychology', text: 'Native Oxford / Cambridge Hosts' },
];
</script>

<template>
  <!-- novalidate = we show our own messages. @submit.prevent = the page does not reload. -->
  <form
    class="space-y-4"
    novalidate
    aria-labelledby="personal-details-heading"
    @submit.prevent="handleSubmit"
  >
    <!-- Form heading -->
    <div
      class="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center"
    >
      <div>
        <p class="text-xs font-medium uppercase tracking-wider text-deep-teal">
          Step 1 of 2
        </p>
        <h2
          id="personal-details-heading"
          class="text-2xl font-semibold tracking-tight text-oxford-blue"
        >
          Tell Us About Yourself
        </h2>
        <p class="mt-0.5 text-sm text-slate-body/85">
          Please provide your information to complete your enrollment. No
          accounts or passwords needed.
        </p>
      </div>
      <div
        class="hidden items-center gap-1.5 rounded-lg bg-surface-low px-3 py-1.5 text-xs font-medium text-oxford-blue sm:flex"
      >
        <AppIcon name="verified" class="text-[16px] text-deep-teal" />
        <span>Fast 1-Min Checkout</span>
      </div>
    </div>

    <!-- First name and last name -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <FormField
        label="First Name"
        :input-id="fieldIds.firstName"
        required
        :error="errors.firstName"
      >
        <template #default="{ describedBy, invalid }">
          <FormTextInput
            v-model="form.firstName"
            :id="fieldIds.firstName"
            :invalid="invalid"
            :aria-describedby="describedBy"
            autocomplete="given-name"
            placeholder="e.g., Alistair"
            @input="handleFieldInput('firstName')"
            @blur="handleFieldBlur('firstName')"
          />
        </template>
      </FormField>

      <FormField
        label="Last Name"
        :input-id="fieldIds.lastName"
        required
        :error="errors.lastName"
      >
        <template #default="{ describedBy, invalid }">
          <FormTextInput
            v-model="form.lastName"
            :id="fieldIds.lastName"
            :invalid="invalid"
            :aria-describedby="describedBy"
            autocomplete="family-name"
            placeholder="e.g., Vance"
            @input="handleFieldInput('lastName')"
            @blur="handleFieldBlur('lastName')"
          />
        </template>
      </FormField>
    </div>

    <!-- Phone number: country code selector + number input. One error message is shown for both. -->
    <div>
      <FormField
        label="Phone Number (for WhatsApp Club Group)"
        :input-id="fieldIds.phoneNumber"
        required
        :error="errors.dialCountry || errors.phoneNumber"
      >
        <template #aside>
          <span
            class="flex items-center gap-0.5 text-xs font-medium text-deep-teal"
          >
            <AppIcon name="chat" class="text-[14px]" /> WhatsApp Enabled
          </span>
        </template>
        <template #default="{ describedBy }">
          <div class="flex gap-2">
            <!-- Country code selector (searchable) -->
            <div class="w-36 shrink-0 sm:w-44">
              <FormSearchableSelect
                v-model="form.dialCountry"
                :options="dialCodeOptions"
                :input-id="fieldIds.dialCountry"
                :invalid="Boolean(errors.dialCountry)"
                :described-by="describedBy"
                placeholder="Code"
                search-label="Search country or code"
                panel-class="w-[min(18rem,calc(100vw-4rem))]"
                @change="handleFieldInput('dialCountry')"
              />
            </div>
            <!-- Phone number without the country code -->
            <FormTextInput
              v-model="form.phoneNumber"
              :id="fieldIds.phoneNumber"
              :invalid="Boolean(errors.phoneNumber)"
              :aria-describedby="describedBy"
              type="tel"
              inputmode="tel"
              autocomplete="tel-national"
              placeholder="7911 123456"
              class="min-w-0 flex-1"
              @input="handleFieldInput('phoneNumber')"
              @blur="handleFieldBlur('phoneNumber')"
            />
          </div>
        </template>
      </FormField>

      <!-- Important note about the phone number -->
      <div
        class="mt-2 flex items-start gap-2 rounded-lg bg-surface-low p-2.5 text-slate-body"
      >
        <AppIcon
          name="info"
          class="mt-0.5 shrink-0 text-[18px] text-deep-teal"
        />
        <p class="text-sm">
          <strong class="font-semibold text-oxford-blue">Important:</strong>
          Your speaking coach will contact you on this phone number via WhatsApp
          / SMS to share your live session links and orientation time.
        </p>
      </div>
    </div>

    <!-- Age, gender and country -->
    <div class="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-3">
      <FormField
        label="Age"
        :input-id="fieldIds.age"
        required
        :error="errors.age"
        :hint="`Min. ${minAge} years`"
      >
        <template #default="{ describedBy, invalid }">
          <FormTextInput
            v-model="form.age"
            :id="fieldIds.age"
            :invalid="invalid"
            :aria-describedby="describedBy"
            type="number"
            inputmode="numeric"
            :min="minAge"
            :max="maxAge"
            placeholder="24"
            @input="handleFieldInput('age')"
            @blur="handleFieldBlur('age')"
          />
        </template>
      </FormField>

      <FormField
        label="Gender"
        :input-id="fieldIds.gender"
        required
        :error="errors.gender"
      >
        <template #default="{ describedBy, invalid }">
          <!-- A normal select box is enough for only two choices -->
          <div class="relative">
            <select
              v-model="form.gender"
              :id="fieldIds.gender"
              class="form-control cursor-pointer appearance-none pr-9"
              :class="form.gender ? 'text-oxford-blue' : 'text-slate-400'"
              :aria-invalid="invalid ? 'true' : undefined"
              :aria-describedby="describedBy"
              @change="handleFieldInput('gender')"
            >
              <option value="" disabled>Select gender</option>
              <option
                v-for="gender in genderOptions"
                :key="gender"
                :value="gender"
                class="text-oxford-blue"
              >
                {{ gender }}
              </option>
            </select>
            <AppIcon
              name="expand_more"
              class="pointer-events-none absolute right-2.5 top-3 text-[20px] text-slate-body"
            />
          </div>
        </template>
      </FormField>

      <FormField
        label="Country of Residence"
        :input-id="fieldIds.country"
        required
        :error="errors.country"
      >
        <template #default="{ describedBy, invalid }">
          <FormSearchableSelect
            v-model="form.country"
            :options="countryOptions"
            :input-id="fieldIds.country"
            :invalid="invalid"
            :described-by="describedBy"
            placeholder="Select country"
            search-label="Search country"
            @change="handleFieldInput('country')"
          />
        </template>
      </FormField>
    </div>

    <!-- Optional email -->
    <FormField
      label="Email Address"
      :input-id="fieldIds.email"
      :error="errors.email"
    >
      <template #aside>
        <span
          class="rounded-full bg-surface-mid px-2 py-0.5 text-xs font-medium text-slate-body"
          >Optional</span
        >
      </template>
      <template #default="{ describedBy, invalid }">
        <FormTextInput
          v-model="form.email"
          :id="fieldIds.email"
          :invalid="invalid"
          :aria-describedby="describedBy"
          type="email"
          inputmode="email"
          autocomplete="email"
          placeholder="alistair.vance@example.com"
          @input="handleFieldInput('email')"
          @blur="handleFieldBlur('email')"
        />
      </template>
    </FormField>

    <!-- What the club includes -->
    <ul
      class="grid grid-cols-1 gap-3 rounded-xl bg-surface-low p-4 text-slate-body sm:grid-cols-3"
    >
      <li
        v-for="item in inclusions"
        :key="item.text"
        class="flex items-center gap-2"
      >
        <AppIcon :name="item.icon" class="text-[20px] text-deep-teal" />
        <span class="text-xs font-medium">{{ item.text }}</span>
      </li>
    </ul>

    <!-- Submit row -->
    <div
      class="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row"
    >
      <div class="flex items-center gap-2 text-xs text-slate-body">
        <AppIcon name="lock" class="text-[18px] text-deep-teal" />
        <span>256-bit Encrypted • Zero Passwords • 1-Time Charge</span>
      </div>
      <button
        type="submit"
        class="group cursor-pointer flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-oxford-blue px-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-oxford-light sm:w-auto"
      >
        <span>Continue to Payment</span>
        <AppIcon
          name="arrow_forward"
          class="text-[18px] transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>

    <!-- Shown after the details pass validation. It does NOT claim that anything was sent or saved on a server. -->
    <div
      v-if="isReadyForNextStep"
      role="status"
      class="flex items-start gap-2 rounded-lg border border-deep-teal/20 bg-deep-teal/10 p-3 text-sm text-oxford-blue"
    >
      <AppIcon
        name="check_circle"
        class="mt-0.5 shrink-0 text-[18px] text-deep-teal"
      />
      <p>
        <strong class="font-semibold">Your details look good.</strong>
        They are ready for the next step. The Payment &amp; Review step has not
        been built yet, so nothing has been sent or saved on a server.
      </p>
    </div>
  </form>
</template>
