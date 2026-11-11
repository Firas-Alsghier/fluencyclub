<script setup>
// Settings for the dropdown
const props = defineProps({
  // The choices. Each one is { value, label, selectedLabel (optional), searchText (optional) }
  options: { type: Array, required: true },
  // Text shown when nothing is chosen yet
  placeholder: { type: String, default: 'Select' },
  // id of the button (so a <label> can point to it)
  inputId: { type: String, required: true },
  // true = show the red error style
  invalid: { type: Boolean, default: false },
  // id of the message that describes this field (for screen readers)
  describedBy: { type: String, default: undefined },
  // Accessible name of the search box
  searchLabel: { type: String, default: 'Search' },
  // Tailwind classes for the size of the dropdown panel
  panelClass: { type: String, default: 'w-full min-w-64' },
})

// Tell the parent when the student picks a choice
const emit = defineEmits(['change'])

// The chosen value. The parent connects it with v-model.
const selectedValue = defineModel({ type: String, default: '' })

// A unique id so several dropdowns on one page do not clash
const uid = useId()
// The id of the list of choices
const listboxId = `${uid}-listbox`

// Is the dropdown panel open?
const isOpen = ref(false)
// What the student typed in the search box
const searchQuery = ref('')
// The position of the highlighted choice in the filtered list
const highlightedIndex = ref(0)

// Links to HTML elements (filled in by Vue after the page is drawn)
const rootRef = ref(null)
const triggerRef = ref(null)
const searchInputRef = ref(null)

// Make text easy to compare: lower case and without accents (so "cote" finds "Côte")
function normalizeForSearch(text) {
  // Lower case, split accents from letters, then remove the accents
  return String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// The choice that is selected now (or undefined)
const selectedOption = computed(() => props.options.find((option) => option.value === selectedValue.value))

// The text shown inside the closed field
const triggerText = computed(() => {
  // Nothing chosen: show nothing (the placeholder is shown instead)
  if (!selectedOption.value) return ''
  // Use the short label if the choice has one
  return selectedOption.value.selectedLabel || selectedOption.value.label
})

// The choices that match the search text
const filteredOptions = computed(() => {
  // The search text in simple form
  const query = normalizeForSearch(searchQuery.value.trim())
  // No search text: show everything
  if (!query) return props.options
  // Keep only choices whose search text contains the query
  return props.options.filter((option) => normalizeForSearch(option.searchText ?? option.label).includes(query))
})

// The id of one choice in the list
function getOptionId(index) {
  // Example: "v-0-option-3"
  return `${uid}-option-${index}`
}

// Scroll the list so the highlighted choice is visible
function scrollHighlightedIntoView() {
  // Wait for the page to update, then scroll just enough to show the choice
  nextTick(() => document.getElementById(getOptionId(highlightedIndex.value))?.scrollIntoView({ block: 'nearest' }))
}

// Open the panel
function openPanel() {
  // Show the panel
  isOpen.value = true
  // Start with an empty search box
  searchQuery.value = ''
  // Highlight the chosen option, or the first one
  const selectedIndex = props.options.findIndex((option) => option.value === selectedValue.value)
  highlightedIndex.value = selectedIndex >= 0 ? selectedIndex : 0
  // After the panel appears, put the cursor in the search box and show the highlighted choice
  nextTick(() => {
    searchInputRef.value?.focus()
    scrollHighlightedIntoView()
  })
}

// Close the panel. If shouldFocusTrigger is true, move focus back to the button.
function closePanel(shouldFocusTrigger = false) {
  // Hide the panel
  isOpen.value = false
  // Give focus back to the button when asked
  if (shouldFocusTrigger) triggerRef.value?.focus()
}

// Pick a choice
function selectOption(option) {
  // Save the value (the parent receives it through v-model)
  selectedValue.value = option.value
  // Tell the parent that the student chose something
  emit('change')
  // Close the panel and return to the button
  closePanel(true)
}

// Called when the search text changes
function handleSearchInput() {
  // Start from the first match each time
  highlightedIndex.value = 0
}

// Keyboard controls inside the search box
function handleSearchKeydown(event) {
  // The last position in the list
  const lastIndex = filteredOptions.value.length - 1
  if (event.key === 'ArrowDown') {
    // Move the highlight down (but not past the end)
    event.preventDefault()
    highlightedIndex.value = Math.min(highlightedIndex.value + 1, lastIndex)
    scrollHighlightedIntoView()
  } else if (event.key === 'ArrowUp') {
    // Move the highlight up (but not above the start)
    event.preventDefault()
    highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
    scrollHighlightedIntoView()
  } else if (event.key === 'Enter') {
    // Enter picks the highlighted choice. preventDefault stops the form from being submitted.
    event.preventDefault()
    const option = filteredOptions.value[highlightedIndex.value]
    if (option) selectOption(option)
  } else if (event.key === 'Escape') {
    // Escape closes the panel
    event.preventDefault()
    closePanel(true)
  }
}

// Called when focus leaves a part of this component
function handleFocusOut(event) {
  // If focus moved to something still inside this component, keep the panel open
  if (rootRef.value?.contains(event.relatedTarget)) return
  // Focus went somewhere else: close the panel
  isOpen.value = false
}
</script>

<template>
  <div ref="rootRef" class="relative" @focusout="handleFocusOut">
    <!-- The button that looks like a select box -->
    <button
      :id="inputId"
      ref="triggerRef"
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-controls="listboxId"
      :aria-describedby="describedBy"
      :aria-invalid="invalid ? 'true' : undefined"
      class="form-control flex cursor-pointer items-center justify-between gap-2 text-left"
      @click="isOpen ? closePanel() : openPanel()"
      @keydown.down.prevent="openPanel"
    >
      <span class="truncate" :class="triggerText ? 'text-oxford-blue' : 'text-slate-400'">
        {{ triggerText || placeholder }}
      </span>
      <AppIcon name="expand_more" class="shrink-0 text-[20px] text-slate-body" />
    </button>

    <!-- The panel with the search box and the list -->
    <div
      v-if="isOpen"
      class="absolute left-0 z-30 mt-1 overflow-hidden rounded-xl border border-border-subtle bg-white shadow-xl"
      :class="panelClass"
    >
      <!-- Search box -->
      <div class="relative border-b border-border-subtle p-2">
        <AppIcon name="search" class="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[18px] text-slate-400" />
        <input
          ref="searchInputRef"
          v-model="searchQuery"
          type="search"
          autocomplete="off"
          :placeholder="searchLabel"
          :aria-label="searchLabel"
          :aria-controls="listboxId"
          :aria-activedescendant="filteredOptions.length ? getOptionId(highlightedIndex) : undefined"
          class="form-control h-10 pl-9 text-sm"
          @input="handleSearchInput"
          @keydown="handleSearchKeydown"
        />
      </div>

      <!-- List of choices. mousedown.prevent keeps the cursor in the search box while clicking. -->
      <ul :id="listboxId" role="listbox" class="max-h-60 overflow-y-auto p-1" @mousedown.prevent>
        <li
          v-for="(option, index) in filteredOptions"
          :id="getOptionId(index)"
          :key="option.value"
          role="option"
          :aria-selected="option.value === selectedValue"
          class="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-oxford-blue"
          :class="{ 'bg-surface-mid': index === highlightedIndex }"
          @click="selectOption(option)"
          @mousemove="highlightedIndex = index"
        >
          <span class="truncate">{{ option.label }}</span>
          <AppIcon v-if="option.value === selectedValue" name="check" class="shrink-0 text-[18px] text-deep-teal" />
        </li>
        <!-- Shown when the search finds nothing -->
        <li v-if="!filteredOptions.length" role="presentation" class="px-3 py-3 text-sm text-slate-body">
          No results found.
        </li>
      </ul>
    </div>
  </div>
</template>
