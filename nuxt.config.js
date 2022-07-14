export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Weerstation @ Lovenjoel',
    htmlAttrs: {
      lang: 'nl'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/mixins.js',
    '~/plugins/sensors.js',
    '~/plugins/charts.js',
    { src: '~/plugins/SockJS.js', mode: 'client', }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/nuxt-i18n
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'nl',
            iso6392b: 'NLD',
            iso: 'nl-BE',
            file: 'nl.js',
            name: 'Nederlands',
            isCatchallLocale: true
          },
          {
            code: 'en',
            iso6392b: 'ENG',
            iso: 'en-GB',
            file: 'en.js',
            name: 'English'
          }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'nl',
        seo: false
      }
    ],
  ],

  // https://github.com/nuxt-community/proxy-module
  proxy: {
    '/api': process.env.API_ROOT_URL,
    '/ws/measurements': { target: process.env.API_ROOT_URL, ws: true },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    host: '0.0.0.0'
  }
}
