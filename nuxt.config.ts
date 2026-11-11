import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  // Enable server-side rendering during static generation
  ssr: true,

  // Pinia state management
  modules: ['@pinia/nuxt'],

  // Nuxt compatibility date
  compatibilityDate: '2025-07-15',

  // Disable development tools in production
  devtools: { enabled: false },

  // Main CSS file
  css: ['~/assets/css/main.css'],

  // Tailwind CSS configuration
  vite: {
    plugins: [tailwindcss()],
  },
});
