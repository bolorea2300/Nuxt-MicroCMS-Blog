import colors from "vuetify/es5/util/colors";
import axios from "axios";

const url = "https://f7yzrr328v.microcms.io/api/v1/article";
const base = "https://pincers-blog.com";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Pincer's Blog",
    title: "Pincer's Blog",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "google-site-verification",
        content: "kWYa6n5c3aqEpMGUG_0gvL_tah9QiuSA9OwRNYCFv94",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "Pincer's Blog",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://pincers-blog.herokuapp.com/",
      },
      { hid: "og:title", property: "og:title", content: "Pincer's Blog" },
      {
        hid: "og:description",
        property: "og:description",
        content: "Pincerのプログラミング関係のブログです",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:creator", content: "@logo8505" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "nuxt-microcms-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/sitemap", "@nuxtjs/axios"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === "all",
  },

  sitemap: {
    path: "/sitemap.xml",
    hostname: base,
    exclude: ["/404", "/search"],
    routes(callback) {
      axios
        .get(url, {
          headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
        })
        .then((res) => {
          const routes = res.data.contents.map((list) => {
            return "/article/" + list.id;
          });
          callback(null, routes);
        })
        .catch(callback);
    },
  },
};
