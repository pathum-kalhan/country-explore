import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/main.css"],
  runtimeConfig: {
    public: {
      countryAPI: process.env.API_KEY_COUNTRY_API,
    },
  },
  modules: ["@nuxt/test-utils/module","@nuxt/image"],
  image: {
    format: ['webp'],
     domains: ['fastly.picsum.photos'],
     provider:"ipx",
  },
   
});
