// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      APEX_TRACKER_API_KEY: process.env.APEX_TRACKER_API_KEY
    }
  },  


  compatibilityDate: '2024-07-15',
})